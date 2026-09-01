
Sarvam’s current APIs support STT and TTS, including streaming options for TTS, so your planned speech layer is technically compatible with the Memory Bank and Reminiscence workflows. ([Sarvam AI Developer Documentation][1])

# DementiaCare — Complete MVP Implementation Plan

## Phase 0 — Project Setup

Start with the repository structure already defined:

```text
DementiaCare/
├── frontend/
├── backend/
├── docs/
├── docker-compose.yml
├── README.md
├── TECHSTACK.md
└── FILE_STRUCTURE.md
```

Initialize:

```bash
# frontend
npm create vite@latest frontend

# backend
mkdir backend
cd backend
npm init -y
```

Backend core packages:

```bash
npm install express mongoose cors dotenv bcrypt jsonwebtoken
npm install multer redis node-cron axios
```

Development packages:

```bash
npm install -D nodemon
```

Frontend core:

```bash
npm install axios react-router-dom
```

Then configure Tailwind and shadcn/ui.

Create `.env.example` files immediately and never commit actual API keys.

---

# Phase 1 — Docker + Infrastructure

Get infrastructure working **before building features**.

Your Compose stack:

```text
Docker Compose
├── frontend
├── backend
└── Redis

External
├── MongoDB Atlas
├── Sarvam AI
└── LLM Provider
```

Verify individually:

```text
Frontend → starts
Backend → starts
Backend → MongoDB Atlas connection
Backend → Redis connection
Frontend → Backend REST request
```

Create a basic backend endpoint:

```http
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "DementiaCare API running"
}
```

Once this works through Docker, continue.

---

# Phase 2 — Database Foundation

Design your MongoDB collections before implementing APIs.

Core collections:

```text
users
patients
games
gameSessions
memories
reminiscencePhotos
reminiscenceSessions
medications
notifications
```

### User

```javascript
{
  name,
  email,
  password,
  role: "PATIENT" | "FAMILY" | "HEALTHCARE",
  language,
  createdAt
}
```

### Patient

Keep patient-specific relationships separately.

```javascript
{
  userId,

  familyMembers: [
    userId
  ],

  healthcareProviders: [
    userId
  ],

  preferences: {
    language,
    gameMode
  }
}
```

This becomes extremely important for authorization.

A family member should only access memories where:

```text
familyMember
     ↓
linked Patient
     ↓
Patient's Memory
```

Not simply:

```text
JWT says FAMILY
     ↓
access every patient
```

---

# Phase 3 — Authentication

Implement this before any patient feature.

Flow:

```text
Register
   ↓
bcrypt.hash(password)
   ↓
MongoDB

Login
   ↓
bcrypt.compare()
   ↓
JWT issued
```

JWT payload can contain:

```json
{
  "userId": "...",
  "role": "PATIENT"
}
```

Create:

```text
auth.controller.js
auth.service.js
auth.routes.js
auth.middleware.js
role.middleware.js
```

Core routes:

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

Then implement protected routes.

Example:

```text
/auth/login

/patient/*
/family/*
/healthcare/*
```

Frontend:

```text
ProtectedRoute
       ↓
Is logged in?
       ↓
Yes
       ↓
RoleRoute
       ↓
PATIENT / FAMILY / HEALTHCARE
```

Do not depend only on frontend role checks.

Every sensitive backend request must verify authorization again.

---

# Phase 4 — Role Dashboards

Before implementing complex functionality, create the three basic portals.

### Patient dashboard

Initially show:

```text
Hello, <Patient>

[ Play Games ]

[ Memory Bank ]

[ Reminiscence Companion ]

[ Medication ]

[ Notifications ]
```

### Family dashboard

```text
My Patient

[ Personal Memories ]

[ Reminiscence Photos ]

[ Alerts ]

[ Notifications ]
```

### Healthcare dashboard

```text
Assigned Patients

Patient A
Patient B
Patient C
```

Selecting a patient:

```text
Patient Profile
├── Game performance
├── Medication schedule
└── Alerts
```

At this stage, dummy data is acceptable.

Get navigation and authorization correct first.

---

# Phase 5 — Patient / Family / Healthcare Relationships

Now implement real relationships.

Healthcare providers need assigned patients.

Family users need linked patients.

Routes might look like:

```http
GET /api/patients/:patientId

GET /api/family/patients

GET /api/healthcare/patients
```

Create one centralized permission function such as:

```javascript
canAccessPatient(user, patientId)
```

Use it throughout the backend.

This is preferable to reproducing authorization logic in twenty controllers.

---

# Phase 6 — Cognitive Games

I would build the games before the AI components.

Each game should expose approximately the same interface:

```text
startGame()
completeGame()
calculateScore()
submitResult()
```

Frontend:

```text
games/
├── CardMatching/
├── SequenceMemory/
├── PatternRecall/
├── ObjectRecall/
├── NumberMemory/
└── WordMatching/
```

You don't have to lock those exact six yet; the important part is creating a common game interface.

Every game completion should produce something like:

```javascript
{
  gameId,
  patientId,

  difficulty: 2,

  score: 84,

  correctAnswers: 8,
  totalQuestions: 10,

  completionTime: 72,

  status: "COMPLETED",

  playedAt
}
```

Send it to:

```http
POST /api/games/:gameId/sessions
```

---

# Phase 7 — Game Performance System

Keep difficulty adaptation deterministic for MVP.

Do **not** involve an LLM here.

For example, derive:

```text
performanceScore =
    accuracy component
    +
    completion-time component
```

Then categorize performance:

```text
LOW
MEDIUM
HIGH
```

Your exact thresholds should be tuned after testing rather than arbitrarily fixed now.

Store:

```javascript
{
  patientId,
  gameId,
  difficulty,
  score,
  performanceRating,
  completionTime
}
```

---

# Phase 8 — Auto Game Mode

Now create the selection engine.

Manual mode:

```text
Patient
   ↓
Games Page
   ↓
Select any game
```

Auto mode:

```text
Previous performance
        ↓
Determine appropriate difficulty
        ↓
Find eligible games
        ↓
Random selection
        ↓
Start game
```

Example service:

```text
game.service.js

getEligibleGames()
calculatePerformance()
determineDifficulty()
selectNextGame()
```

Keep this entire feature in regular JavaScript logic.

---

# Phase 9 — Game Failure / Performance Alerts

Define when an attempt constitutes difficulty according to your eventual game rules.

For example:

```text
Game attempt
     ↓
Performance rule triggered?
     ↓
YES
     ↓
Create Notification
```

Create a notification document:

```javascript
{
  patientId,

  recipients: [
    familyUserId,
    healthcareUserId
  ],

  type: "GAME_PERFORMANCE_ALERT",

  title: "...",
  message: "...",

  read: false,

  createdAt
}
```

Avoid medical conclusions such as:

```text
"Cognitive decline detected"
```

Prefer descriptions such as:

```text
"Repeated difficulty was observed during the recent game session."
```

The application is reporting performance, not making a diagnosis.

---

# Phase 10 — Notification System

Your MVP does not require WebSockets.

Use:

```text
Backend
   ↓
MongoDB notifications
   ↓
REST API
   ↓
Dashboard
```

Routes:

```http
GET   /api/notifications
PATCH /api/notifications/:id/read
```

Frontend can fetch notifications when:

```text
Dashboard loads
Notification page opens
User refreshes
```

You could optionally poll every few minutes later.

---

# Phase 11 — Medication System

Healthcare provider creates:

```javascript
{
  patientId,

  medicationName,

  dosage,

  times: [
    "09:00",
    "21:00"
  ],

  instructions,

  active: true,

  createdBy,

  createdAt
}
```

Routes:

```http
POST   /api/medications
GET    /api/medications/:patientId
PATCH  /api/medications/:id
DELETE /api/medications/:id
```

Only authorized healthcare accounts should create/change medication routines.

Patient and family can view them according to your access rules.

---

# Phase 12 — Cron Reminder System

Then implement:

```text
node-cron
   ↓
Periodic check
   ↓
MongoDB medication schedules
   ↓
Find due reminders
   ↓
Create notifications
```

For example:

```text
cron
 ↓
medicationReminder.job.js
 ↓
medication.service
 ↓
notification.service
```

Do not put all reminder logic directly inside the cron callback.

Cron should trigger services; services should contain business logic.

---

# Phase 13 — Personal Memory Bank: Storage

Now start RAG.

Family adds memory:

```text
Family dashboard
       ↓
Add Memory
       ↓
"This patient's school was XYZ School."
```

Backend receives:

```javascript
{
  patientId,
  title,
  content,
  category
}
```

Before saving:

```text
content
  ↓
MiniLM
  ↓
embedding vector
  ↓
MongoDB
```

Memory document:

```javascript
{
  patientId,

  title,

  content,

  category,

  embedding: [
    ...
  ],

  addedBy,

  createdAt
}
```

---

# Phase 14 — MiniLM Embedding Service

Don't scatter model calls throughout controllers.

Create:

```text
ai/
└── embedding.service.js
```

Expose something equivalent to:

```javascript
generateEmbedding(text)
```

Then:

```text
memory.service.js
       ↓
embedding.service.js
```

Later, swapping MiniLM for a different embedding model should require modifying only this service.

---

# Phase 15 — MongoDB Atlas Vector Search

Create an Atlas Vector Search index over:

```text
memories.embedding
```

Your retrieval must also filter by:

```text
patientId
```

This is critical.

Otherwise:

```text
Patient A asks question

Vector Search

Patient B's memory appears
```

which would be a serious privacy problem.

MongoDB supports search/index-based querying through Atlas and its Node.js tooling; create the appropriate vector index before implementing retrieval. ([MongoDB][2])

Retrieval becomes:

```text
Question
   ↓
MiniLM embedding
   ↓
Atlas Vector Search
   ↓
Filter patientId
   ↓
Top matching memories
```

---

# Phase 16 — Memory Bank RAG

Create:

```text
memory.rag.js
```

Pipeline:

```text
Patient question

      ↓

Generate query embedding

      ↓

MongoDB Atlas Vector Search

      ↓

Relevant memories

      ↓

Enough relevant information?
        │
       / \
     YES  NO
      │    │
      ↓    ↓
     LLM   Safe response
      │
      ↓
Grounded answer
```

Prompt structure should essentially enforce:

```text
You are assisting the patient using their
family-provided Personal Memory Bank.

Use ONLY the supplied personal-memory context
for personal factual claims.

If the answer cannot be determined from the
context, say that you do not have enough
information.

Do not invent missing memories.
```

This is one of the most important safety behaviors in the application.

---

# Phase 17 — Memory Bank Text Chat

Before introducing voice, make the Memory Bank work completely using **text**.

Route:

```http
POST /api/memory/query
```

Request:

```json
{
  "question": "What was the name of my school?"
}
```

Backend:

```text
question
 ↓
RAG
 ↓
answer
```

Response:

```json
{
  "answer": "Your Memory Bank says that..."
}
```

Test extensively:

```text
Known question
Unknown question
Similar wording
Different language
Incorrect assumption in question
Empty memory bank
```

Only once this works reliably should you add voice.

---

# Phase 18 — Sarvam STT Integration

Create:

```text
ai/
└── sarvam.service.js
```

Keep API keys backend-only.

For an initial MVP, you can record a short patient utterance and send the audio for transcription.

Sarvam's current STT API supports multiple Indian languages and English, and its REST API is designed for short interactive audio requests. ([Sarvam AI Developer Documentation][1])

Flow:

```text
Patient presses microphone

       ↓

Browser records audio

       ↓

Backend

       ↓

Sarvam STT

       ↓

Transcript
```

Then pass the transcript into the exact same RAG pipeline built previously.

---

# Phase 19 — Sarvam TTS Integration

After the LLM creates a safe answer:

```text
Answer text
    ↓
Sarvam TTS
    ↓
Audio
    ↓
Frontend
    ↓
Play response
```

Sarvam currently exposes TTS through its API, including Bulbul V3 and streaming options. ([Sarvam AI Developer Documentation][3])

So Memory Bank becomes:

```text
             Patient
                │
                ▼
          🎤 Speak question
                │
                ▼
           Sarvam STT
                │
                ▼
             Text
                │
                ▼
        Memory Bank RAG
                │
                ▼
              LLM
                │
                ▼
            Safe text
                │
                ▼
           Sarvam TTS
                │
                ▼
          🔊 Patient hears
```

---

# Phase 20 — Family Reminiscence Photo Upload

Now implement the family photo workflow.

Frontend:

```text
Upload Photo

Description:
"Family gathering at..."

People:
optional structured information

Context:
"..."

Hints:
1. ...
2. ...
3. ...
```

Multer receives the image.

MongoDB stores:

```javascript
{
  patientId,

  imagePath,

  context,

  hints: [
    "...",
    "...",
    "..."
  ],

  uploadedBy,

  lastShownAt: null,

  createdAt
}
```

For your current MVP:

```text
Multer
 ↓
/uploads/reminiscence
```

is okay.

Move to object storage when deploying across machines/ephemeral containers.

---

# Phase 21 — Reminiscence Photo Selection

Implement this without Redis first.

Query:

```text
Find photo where:

lastShownAt == null

OR

lastShownAt < currentDate - 15 days
```

Then randomly choose an eligible photo.

After selection:

```text
photo.lastShownAt = now
```

MongoDB remains the source of truth.

Redis can later cache eligibility results.

---

# Phase 22 — Redis

Use Redis for things that are genuinely temporary.

Good examples:

```text
temporary conversation state

short-lived session state

cached eligible photo IDs

rate limits

temporary game state

temporary reminiscence state
```

Example key:

```text
reminiscence:session:<patientId>
```

Potential value:

```json
{
  "photoId": "...",
  "hintIndex": 1,
  "conversationStage": "IDENTIFICATION"
}
```

with TTL.

Don't store important permanent information exclusively in Redis.

---

# Phase 23 — Text-Based Reminiscence Companion

Again: **text first, voice later.**

Start session:

```http
POST /api/reminiscence/session
```

Backend:

```text
Find eligible photo

        ↓

Load context + hints

        ↓

Create temporary session

        ↓

Generate opening prompt
```

Example conversation behavior:

```text
AI:
"Do you recognize anyone in this photograph?"

Patient:
"I can't remember."

AI:
Use Hint #1

Patient responds

AI:
Continue conversation
```

The model receives:

```text
Photo context
Family hints
Conversation history
Current hint index
```

The family context remains the ground truth.

---

# Phase 24 — Reminiscence Conversation State

Keep short conversation history.

You do **not** need long-term conversational memory.

Redis:

```text
reminiscence:session:patient123
```

can contain:

```javascript
{
  photoId,

  messages: [
    ...recent messages
  ],

  hintIndex: 1,

  startedAt
}
```

Set a reasonable TTL so abandoned sessions disappear automatically.

Permanent session summary, if needed:

```text
MongoDB
```

Temporary active conversation:

```text
Redis
```

---

# Phase 25 — Voice Reminiscence Companion

Now connect Sarvam.

```text
Patient speaks
     ↓
Sarvam STT
     ↓
Transcript
     ↓
Reminiscence service
     ↓
Context + hints + recent conversation
     ↓
LLM
     ↓
Response
     ↓
Sarvam TTS
     ↓
Patient hears response
```

The same `sarvam.service.js` should be shared between:

```text
Memory Bank
Reminiscence Companion
```

Do not create separate STT/TTS implementations.

---

# Phase 26 — Multilingual Layer

Separate two concepts.

### UI translation

Buttons such as:

```text
Home
Games
Memory Bank
Medication
Logout
```

should use static translation files.

Example:

```text
locales/
├── en.json
├── hi.json
└── ...
```

### AI conversation language

The patient selects/preconfigures:

```javascript
preferredLanguage: "hi-IN"
```

Then use that preference for:

```text
STT
LLM response
TTS
```

Sarvam specifically targets Indian-language speech and supports multilingual/codemixed workflows in its current APIs. ([Sarvam AI Developer Documentation][4])

Do not send every static UI label through an LLM.

---

# Phase 27 — Hydration Reminders

Use the same architecture as medication reminders.

Don't build another standalone scheduling engine.

```text
Reminder Engine
├── Medication
└── Hydration
```

A cron job can trigger:

```text
reminder.service.js
```

which determines what notifications need creation.

---

# Phase 28 — Error Handling

Introduce consistent API responses.

Example:

```json
{
  "success": false,
  "message": "Memory not found"
}
```

Centralize:

```text
ApiError.js
ApiResponse.js
asyncHandler.js
error.middleware.js
```

AI calls especially require graceful handling.

Example:

```text
Sarvam unavailable
       ↓
"Voice service is temporarily unavailable."

LLM unavailable
       ↓
"Unable to answer right now."

Vector search unavailable
       ↓
Do NOT ask LLM to guess
```

Fail closed for personal memories.

---

# Phase 29 — Validation

Validate requests before controller execution.

Especially:

```text
registration

memory creation

photo upload

medication schedule

game result

role relationships
```

Reject unexpected input early.

---

# Phase 30 — Logging

At minimum log:

```text
Request errors

MongoDB failures

Redis failures

Sarvam failures

LLM failures

Cron failures
```

But don't casually log:

```text
JWT tokens
passwords
API keys
full sensitive patient conversations
```

---

# Phase 31 — Testing

You should test each module independently.

Important backend tests:

```text
Authentication
Authorization
Family → correct patient
Healthcare → assigned patients
Memory retrieval isolation
Game scoring
Auto-mode selection
15-day photo rule
Medication reminder creation
Notification permissions
```

Particularly test this:

```text
Patient A's RAG request
        ↓
NEVER returns
        ↓
Patient B's memory
```

That test is more important than whether your chatbot gives a beautifully worded response.

---

# Phase 32 — Integration Testing

Run complete workflows.

### Workflow A

```text
Family logs in
 ↓
Adds patient memory
 ↓
Embedding generated
 ↓
Patient logs in
 ↓
Asks using microphone
 ↓
STT
 ↓
Vector retrieval
 ↓
LLM
 ↓
TTS
```

### Workflow B

```text
Family uploads photograph
 ↓
Adds context + hints
 ↓
Patient starts reminiscence
 ↓
Eligible photo selected
 ↓
Voice conversation
 ↓
Hint progression
 ↓
Session ends
```

### Workflow C

```text
Healthcare logs in
 ↓
Selects assigned patient
 ↓
Creates medication routine
 ↓
Cron reaches scheduled time
 ↓
Notification created
 ↓
Patient/family see notification
```

### Workflow D

```text
Patient starts Auto Mode
 ↓
Game selected
 ↓
Patient plays
 ↓
Result calculated
 ↓
Performance stored
 ↓
Difficulty engine evaluates
 ↓
Next eligible game selected
```

---

# Phase 33 — Docker Integration

Once everything works outside containers, make the complete development environment work through:

```bash
docker compose up --build
```

Expected:

```text
localhost:5173
     ↓
Frontend

localhost:5000
     ↓
Express

Express
├── MongoDB Atlas
├── Redis container
├── Sarvam AI
└── LLM API
```

Remember:

```env
REDIS_URL=redis://redis:6379
```

inside Docker.

---

# Phase 34 — MVP Deployment Preparation

Before deployment:

```text
Remove secrets from Git

Configure production environment variables

Enable HTTPS

Configure CORS correctly

Restrict MongoDB network access

Add request limits

Set upload limits

Validate uploaded file MIME types

Configure persistent photo storage
```

This is where I would replace:

```text
Multer → local hard disk
```

with:

```text
Multer
  ↓
Cloud object storage
```

Multer can still handle receiving the upload; the final file doesn't have to remain on local disk.

---

# Recommended Development Order

If you have multiple developers, don't assign everyone one completely isolated subsystem immediately. Build the shared foundation first.

```text
1. Repository + Docker
        ↓
2. Express + React setup
        ↓
3. MongoDB + Redis
        ↓
4. Authentication
        ↓
5. Roles
        ↓
6. Patient relationships
        ↓
7. Dashboards
        ↓
8. Games
        ↓
9. Game scoring
        ↓
10. Auto Mode
        ↓
11. Notifications
        ↓
12. Medication
        ↓
13. Cron reminders
        ↓
14. Memory storage
        ↓
15. MiniLM embeddings
        ↓
16. Atlas Vector Search
        ↓
17. Text RAG
        ↓
18. Sarvam STT
        ↓
19. Sarvam TTS
        ↓
20. Photo upload
        ↓
21. 15-day selection
        ↓
22. Redis session state
        ↓
23. Text Reminiscence
        ↓
24. Voice Reminiscence
        ↓
25. Multilingual UI
        ↓
26. Testing
        ↓
27. Deployment
```

## Final MVP Architecture

```text
                         ┌─────────────────────┐
                         │    React Frontend   │
                         │ Tailwind + shadcn   │
                         └──────────┬──────────┘
                                    │ REST
                                    ▼
                         ┌─────────────────────┐
                         │ Node.js + Express   │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼──────────────────────┐
              │                     │                      │
              ▼                     ▼                      ▼
       ┌────────────┐        ┌────────────┐          ┌──────────┐
       │ MongoDB    │        │   Redis    │          │ Sarvam   │
       │   Atlas    │        │            │          │ STT/TTS  │
       └─────┬──────┘        └────────────┘          └──────────┘
             │
             │ Vector Search
             ▼
       ┌────────────┐
       │  MiniLM    │
       │ Embeddings │
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │    RAG     │
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │    LLM     │
       └────────────┘


              Express Background Jobs
                       │
                       ▼
                     Cron
                       │
                ┌──────┴──────┐
                ▼             ▼
           Medication      Hydration
           Reminders       Reminders
                │             │
                └──────┬──────┘
                       ▼
                    MongoDB
                 Notifications
```

The **most important development rule** for this project is to build each AI feature as a normal text feature first. Get `Memory Bank text → RAG → answer` working before adding STT/TTS, and get `Reminiscence text → photo context → hints → conversation` working before adding voice. That dramatically simplifies debugging and gives you usable fallbacks when speech services fail.

[1]: https://docs.sarvam.ai/api/api-guides-tutorials/speech-to-text/overview?utm_source=chatgpt.com "Speech-to-Text APIs | Sarvam API Docs"
[2]: https://www.mongodb.com/docs/drivers/node/current/atlas-search/?utm_source=chatgpt.com "Run a MongoDB Search Query - Node.js Driver - MongoDB Docs"
[3]: https://docs.sarvam.ai/api-reference/text-to-speech/convert?utm_source=chatgpt.com "REST | Sarvam API Docs"
[4]: https://docs.sarvam.ai/api/getting-started/quickstart?utm_source=chatgpt.com "Developer Quickstart | Sarvam API Docs"
