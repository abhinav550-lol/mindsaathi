# MindSaathi Tech Stack

## Frontend

* **React.js** — Main frontend framework for the web application.
* **Tailwind CSS** — Utility-first styling.
* **shadcn/ui** — Reusable and accessible UI components.

## Backend

* **Node.js + Express.js** — REST API and backend business logic.
* Handles authentication, games, memory bank, reminiscence companion, reminders, alerts, and role-based APIs.

## Database

* **MongoDB Atlas** — Primary database for:

  * Users
  * Roles
  * Patient data
  * Game sessions
  * Memories
  * Reminders
  * Notifications
  * Reminiscence photo metadata

## Authentication & Authorization

* **bcrypt** — Password hashing.
* **JWT** — Authentication and protected API access.
* Role information will be used to differentiate:

  * Patient
  * Family
  * Healthcare Provider

## AI & RAG

* **MiniLM** — Generates embeddings for personal memories.
* **MongoDB Atlas Vector Search** — Performs semantic similarity search for the Personal Memory Bank.
* **LLM API** — Generates grounded responses using retrieved personal memory context.

## Voice

* **Sarvam AI** — Used for multilingual voice interaction.
* Handles:

  * Speech-to-Text for patient queries
  * Text-to-Speech for AI responses
  * Voice interaction for the Personal Memory Bank
  * Voice interaction for the AI Reminiscence Companion

## Caching & Temporary Data

* **Redis** — Used for temporary application data and caching.
* Can store short-lived state, counters, and session-related information.
* Important persistent information such as the last time a reminiscence photo was shown should remain stored in MongoDB.

## Scheduling

* **Cron Jobs** — Used for scheduled backend tasks such as:

  * Medication reminders
  * Hydration reminders
  * Periodic reminder checks

## Notifications

* **MongoDB + REST APIs** — Notifications will be stored in MongoDB.
* Patient, Family, and Healthcare dashboards will fetch notifications through REST APIs.
* Real-time WebSocket notifications are not part of the MVP.

## Image Uploads

* **Multer** — Handles image uploads for the AI Reminiscence Companion.
* Images will initially be stored on the server's local disk for the MVP.
* Image metadata and context will be stored in MongoDB.

## Application Management

* **Docker** — Used to containerize and manage the application and its services.

## MVP Stack Summary

```text
Frontend        : React + Tailwind CSS + shadcn/ui
Backend         : Node.js + Express.js
Database        : MongoDB Atlas
Authentication  : JWT + bcrypt
RAG             : MiniLM + MongoDB Atlas Vector Search
Voice           : Sarvam AI
Caching         : Redis
Scheduling      : Cron
Notifications   : MongoDB + REST
Image Uploads   : Multer
Containerization: Docker
```
