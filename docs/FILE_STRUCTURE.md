# DementiaCare — File Structure

## Root Structure

```text
DementiaCare/
│
├── frontend/
├── backend/
│
├── docs/
│   ├── FEATURES.md
│   ├── API.md
│   └── ARCHITECTURE.md
│
├── docker-compose.yml
├── .gitignore
├── README.md
└── TECHSTACK.md
```

---

# Backend Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── redis.js
│   │   └── env.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── users/
│   │   │   ├── user.model.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── patients/
│   │   │   ├── patient.model.js
│   │   │   ├── patient.controller.js
│   │   │   ├── patient.service.js
│   │   │   └── patient.routes.js
│   │   │
│   │   ├── games/
│   │   │   ├── game.model.js
│   │   │   ├── gameSession.model.js
│   │   │   ├── game.controller.js
│   │   │   ├── game.service.js
│   │   │   └── game.routes.js
│   │   │
│   │   ├── memory/
│   │   │   ├── memory.model.js
│   │   │   ├── memory.controller.js
│   │   │   ├── memory.service.js
│   │   │   ├── memory.routes.js
│   │   │   └── memory.rag.js
│   │   │
│   │   ├── reminiscence/
│   │   │   ├── reminiscence.model.js
│   │   │   ├── reminiscenceSession.model.js
│   │   │   ├── reminiscence.controller.js
│   │   │   ├── reminiscence.service.js
│   │   │   └── reminiscence.routes.js
│   │   │
│   │   ├── medications/
│   │   │   ├── medication.model.js
│   │   │   ├── medication.controller.js
│   │   │   ├── medication.service.js
│   │   │   └── medication.routes.js
│   │   │
│   │   └── notifications/
│   │       ├── notification.model.js
│   │       ├── notification.controller.js
│   │       ├── notification.service.js
│   │       └── notification.routes.js
│   │
│   ├── ai/
│   │   ├── llm.service.js
│   │   ├── embedding.service.js
│   │   ├── sarvam.service.js
│   │   │
│   │   └── prompts/
│   │       ├── memory.prompt.js
│   │       └── reminiscence.prompt.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── upload.middleware.js
│   │   ├── error.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── jobs/
│   │   ├── medicationReminder.job.js
│   │   └── hydrationReminder.job.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   └── asyncHandler.js
│   │
│   ├── app.js
│   └── server.js
│
├── uploads/
│   └── reminiscence/
│
├── tests/
│
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── package.json
└── README.md
```

## Backend Folder Responsibilities

| Folder        | Responsibility                                                        |
| ------------- | --------------------------------------------------------------------- |
| `config/`     | MongoDB, Redis and environment configuration                          |
| `modules/`    | Main application features and business logic                          |
| `ai/`         | LLM, MiniLM embeddings, Sarvam AI and AI prompts                      |
| `middleware/` | Authentication, authorization, validation, uploads and error handling |
| `jobs/`       | Cron jobs for scheduled tasks                                         |
| `utils/`      | Shared backend utility functions                                      |
| `uploads/`    | Locally stored reminiscence images for the MVP                        |
| `tests/`      | Backend tests                                                         |

---

# Frontend Structure

```text
frontend/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── sounds/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   └── ...
│   │   │
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── NotificationCard.jsx
│   │   │
│   │   ├── games/
│   │   │   ├── GameCard.jsx
│   │   │   ├── GameTimer.jsx
│   │   │   └── GameResult.jsx
│   │   │
│   │   ├── memory/
│   │   │   ├── MemoryChat.jsx
│   │   │   ├── VoiceInput.jsx
│   │   │   └── MemoryCard.jsx
│   │   │
│   │   └── reminiscence/
│   │       ├── PhotoViewer.jsx
│   │       ├── VoiceConversation.jsx
│   │       └── HintCard.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── patient/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Games.jsx
│   │   │   ├── GamePlay.jsx
│   │   │   ├── MemoryBank.jsx
│   │   │   ├── Reminiscence.jsx
│   │   │   ├── Medications.jsx
│   │   │   └── Notifications.jsx
│   │   │
│   │   ├── family/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Memories.jsx
│   │   │   ├── AddMemory.jsx
│   │   │   ├── Photos.jsx
│   │   │   ├── AddPhoto.jsx
│   │   │   └── Notifications.jsx
│   │   │
│   │   └── healthcare/
│   │       ├── Dashboard.jsx
│   │       ├── Patients.jsx
│   │       ├── PatientDetails.jsx
│   │       ├── Medications.jsx
│   │       └── Notifications.jsx
│   │
│   ├── games/
│   │   ├── CardMatching/
│   │   │   ├── CardMatching.jsx
│   │   │   ├── Card.jsx
│   │   │   └── gameLogic.js
│   │   │
│   │   ├── SequenceMemory/
│   │   │   ├── SequenceMemory.jsx
│   │   │   └── gameLogic.js
│   │   │
│   │   └── ...
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   ├── game.service.js
│   │   ├── memory.service.js
│   │   ├── reminiscence.service.js
│   │   ├── medication.service.js
│   │   └── notification.service.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── LanguageContext.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useVoice.js
│   │   └── useNotifications.js
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── RoleRoute.jsx
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatDate.js
│   │   └── gameScore.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── .env
├── .env.example
├── Dockerfile
├── package.json
└── vite.config.js
```

## Frontend Folder Responsibilities

| Folder                     | Responsibility                            |
| -------------------------- | ----------------------------------------- |
| `assets/`                  | Images, icons and sounds                  |
| `components/ui/`           | shadcn/ui components                      |
| `components/common/`       | Shared application components             |
| `components/games/`        | Shared game-related components            |
| `components/memory/`       | Personal Memory Bank UI                   |
| `components/reminiscence/` | AI Reminiscence Companion UI              |
| `pages/auth/`              | Authentication pages                      |
| `pages/patient/`           | Patient dashboard and features            |
| `pages/family/`            | Family dashboard and features             |
| `pages/healthcare/`        | Healthcare dashboard and features         |
| `games/`                   | Individual cognitive game implementations |
| `services/`                | Communication with backend REST APIs      |
| `context/`                 | Global authentication and language state  |
| `hooks/`                   | Reusable React hooks                      |
| `routes/`                  | Routing and role-based route protection   |
| `utils/`                   | Shared frontend utilities                 |

---

# Application Organization

The overall application follows a feature-based structure:

```text
DementiaCare
│
├── Frontend
│   ├── Patient Portal
│   ├── Family Portal
│   ├── Healthcare Portal
│   ├── Cognitive Games
│   └── Shared Components
│
└── Backend
    ├── Authentication
    ├── Users & Patients
    ├── Cognitive Games
    ├── Personal Memory Bank
    ├── AI Reminiscence Companion
    ├── Medications
    ├── Notifications
    ├── AI Services
    └── Scheduled Jobs
```
