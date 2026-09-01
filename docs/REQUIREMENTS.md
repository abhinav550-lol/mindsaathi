# MindSaathi

## AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients

DementiaCare is a platform designed to support elderly dementia patients through cognitive games, personal memory assistance, reminiscence-based conversations, medication reminders, and caregiver monitoring.

---

## Feature Priority Legend

* `+` → MVP Feature
* `?` → Later-Stage Feature

---

# MVP Features

## 1. Multiple Cognitive Games

* The platform will include multiple cognitive and memory-based games designed to be simple and suitable for elderly users.
* Games will have increasing levels of difficulty.
* Around **5–6 games** will be included in the MVP.
* Each game will track completion time and performance.
* Patients can manually choose and play any available game.

---

## 2. Personal Memory Bank

The Personal Memory Bank will act as a basic RAG-based memory assistance system.

### Family Input

Family members can add personal information related to the patient, such as:

* Home address
* School name
* Phone numbers
* Important personal information
* Other useful memories or facts

### Patient Interaction

* The patient can ask questions using speech.
* The speech input will be processed and used to search the patient's stored memory information.
* The chatbot will generate a response based only on the available stored information.
* The response will be provided to the patient in text form.

### Handling Missing Information

If the system does not have enough relevant information to answer the patient's question, it should respond with something similar to:

> "I don't have enough information about that."

The system should avoid fabricating or inventing personal information.

---

## 3. AI Reminiscence Companion

The AI Reminiscence Companion will allow patients to interact with memories associated with photographs uploaded by their family members.

### Family Side

Family members can upload:

* A photograph
* Context or description related to the photograph
* Hints related to the photograph

For example, the context may explain who is present in the image or when the image was taken.

### Patient Side

* The patient opens the **AI Reminiscence Companion** section.
* The system selects a photograph that has not been selected within the previous **15 days**.
* The AI starts a speech-based conversation with the patient about the photograph.
* The AI may ask questions such as:

> "Can you identify the person in this picture?"

### Hint System

If the patient struggles to answer:

* The AI can provide hints.
* Hints will be taken from the information provided by the family.
* Hints can be provided one by one during the conversation.

---

## 4. Medication Routine and Reminders

Healthcare providers can create and manage medication routines for patients.

The system will:

* Store medication routines for the patient.
* Remind the patient about their medicines.
* Send relevant medication reminders to family members as well.

Patients will also receive hydration reminders.

---

## 5. Game Performance Alerts

The platform will monitor whether a patient is able to complete a game within the defined time.

If the patient is unable to complete the game within the required time:

* A game failure can be recorded.
* An alert can be generated.
* Relevant family members and healthcare providers can receive the alert.

---

## 6. Manual and Auto Game Modes

Patients will be able to play games using two approaches.

### Manual Mode

* Patients can view all available games.
* They can choose whichever game they want to play.
* They can continue playing games based on their preference.

### Auto Mode

Auto Mode will automatically manage the sequence and difficulty of games.

Each game can have:

* A difficulty or rating level
* A score requirement
* Performance evaluation based on completion time

After a patient finishes a game:

1. Their performance is evaluated.
2. The game receives or uses a predefined rating/difficulty level.
3. Games with a higher suitable rating than the current game are considered.
4. One of the eligible games is randomly selected as the next game.

The system will therefore adjust the difficulty of games based on the patient's performance while using Auto Mode.

---

## 7. Adaptive Game Difficulty

When Auto Mode is enabled:

* The platform tracks the patient's game performance.
* Performance can depend on factors such as completion time and score.
* The difficulty of upcoming games is adjusted according to the patient's performance.

The patient can still use Manual Mode whenever they want to select games themselves.

---

## 8. Multilingual Support

The platform will support multiple languages using the AI model.

This will apply particularly to AI-based interactions such as:

* Personal Memory Bank conversations
* AI Reminiscence Companion conversations
* Patient interaction with AI responses

---

# Later-Stage Features

## 1. Game and Application Screen-Time Limits

The platform may introduce limits on continuous game usage.

For example:

* If a patient plays **5 games continuously**, the system may prevent additional game sessions temporarily.
* The patient may have to wait approximately **6 hours or more** before starting another set of games.

The exact limits can be configured later.

---

## 2. Offline PWA Capability

The application may later be converted into a Progressive Web App (PWA).

The goal would be to allow:

* Installation of the application as a PWA.
* Cognitive games to work without an active internet connection.
* Basic game-related functionality to remain available offline.

---

# User Roles

## 1. Patient

The Patient role is the primary user-facing role.

Patients can:

* Play cognitive games.
* Have their game completion time tracked.
* Have their performance recorded.
* Use Manual Mode to choose games.
* Use Auto Mode for automatically selected games and adaptive difficulty.
* Access the Personal Memory Bank.
* Ask memory-related questions using speech.
* Access the AI Reminiscence Companion.
* Participate in speech-based conversations about family-uploaded photographs.
* Receive hints during reminiscence conversations.
* Receive medication reminders.
* Receive hydration reminders.

---

## 2. Healthcare Provider

Healthcare providers are responsible for managing patients assigned to them.

Healthcare providers can:

* Manage patients under their care.
* Access a dashboard containing their assigned patients.
* View information related to different patients.
* Receive alerts related to patient game failures.
* Set and manage medication routines for patients.

---

## 3. Family Member

Family members help provide personal information and context that supports the patient's memory assistance features.

Family members can:

* Receive relevant alerts.
* Add personal information to the patient's Personal Memory Bank.
* Upload photographs for the AI Reminiscence Companion.
* Add descriptions or context for uploaded photographs.
* Add hints related to uploaded photographs.
* Help provide personal information that the AI can use during memory and reminiscence interactions.

---

# Role and Feature Summary

| Feature                     | Patient    | Family                        | Healthcare                  |
| --------------------------- | ---------- | ----------------------------- | --------------------------- |
| Play Cognitive Games        | Yes        | No                            | No                          |
| Manual Game Selection       | Yes        | No                            | No                          |
| Auto Game Mode              | Yes        | No                            | No                          |
| Adaptive Game Difficulty    | Yes        | No                            | No                          |
| Track Game Completion Time  | Yes        | No                            | View/Receive Related Alerts |
| Personal Memory Bank        | Use/Search | Add Information               | No                          |
| Speech-Based Memory Queries | Yes        | No                            | No                          |
| AI Reminiscence Companion   | Use        | Add Photos, Context and Hints | No                          |
| Medication Reminders        | Receive    | Receive                       | Configure                   |
| Hydration Reminders         | Receive    | No                            | No                          |
| Game Failure Alerts         | No         | Receive                       | Receive                     |
| Patient Management          | No         | No                            | Yes                         |
| Multilingual AI Interaction | Yes        | Related Input May Be Used     | No                          |

---

# Core Platform Modules

DementiaCare can therefore be divided into the following main modules:

1. **Cognitive Gaming Module**
2. **Personal Memory Bank**
3. **AI Reminiscence Companion**
4. **Medication and Reminder System**
5. **Game Performance and Alert System**
6. **Adaptive Game Selection System**
7. **Multilingual AI Interaction**
8. **Patient Management Dashboard**
9. **Family Memory and Photo Management**
10. **Future PWA and Screen-Time Management**
