# **MindSaathi – Complete Tech Stack**

## **1. Frontend**

| Technology     | Usage                                      |
| -------------- | ------------------------------------------ |
| React.js       | Patient, family and healthcare interfaces  |
| TypeScript     | Type safety and maintainable frontend code |
| Tailwind CSS   | Responsive, elderly-friendly UI            |
| Web Speech API | Voice input and basic speech interaction   |
| PWA (later)    | Offline application support                |

## **2. Backend**

| Technology  | Usage                                   |
| ----------- | --------------------------------------- |
| Python      | AI, ML and backend development          |
| FastAPI     | REST APIs and AI/ML service integration |
| Pydantic    | Request validation and data schemas     |
| JWT / OAuth | Authentication and role-based access    |
| Celery      | Background tasks and scheduled jobs     |

## **3. Agentic AI**

| Technology            | Usage                                              |
| --------------------- | -------------------------------------------------- |
| LangChain             | LLM integration, prompts, retrievers and tools     |
| LangGraph             | Stateful AI agents and conversational workflows    |
| LLM (Gemini / Groq)   | Memory conversations and reminiscence interactions |
| Sentence Transformers | Semantic embeddings for memory retrieval           |
| ChromaDB / FAISS      | Vector storage and similarity search               |
| Whisper / Sarvam      | Speech-to-text                                     |
| Sarvam / Indic TTS    | Multilingual text-to-speech                        |

**Two primary agents:**

- Personal Memory Agent – Retrieves and answers questions using family-provided information.
- Reminiscence Agent – Conducts photograph-based conversations and provides contextual hints.

## **4. Machine Learning**

| Technology               | Usage                                             |
| ------------------------ | ------------------------------------------------- |
| Python                   | ML implementation                                 |
| Scikit-learn             | Model training and evaluation                     |
| Decision Tree Classifier | Predict increase, decrease or maintain difficulty |
| Pandas                   | Interaction data processing                       |
| NumPy                    | Numerical operations                              |
| Joblib                   | Saving and loading trained models                 |

**ML input:** Accuracy, completion time, hints used, current difficulty and historical performance.

**ML output:** Recommended next difficulty level.

## **5. Database and Storage**

| Technology | Usage                                                   |
| ---------- | ------------------------------------------------------- |
| PostgreSQL | Patients, medications, game history, family information |
| Redis      | Caching, session state and background task coordination |
| ChromaDB   | Semantic search over personal memories                  |
| AWS S3     | Family photographs and uploaded media                   |

## **6. Notifications and Background Processing**

| Technology               | Usage                                        |
| ------------------------ | -------------------------------------------- |
| Celery                   | Background processing                        |
| Redis                    | Celery message broker                        |
| Firebase Cloud Messaging | Push notifications                           |
| Email service            | Family and healthcare alerts                 |
| Celery Beat              | Scheduled medication and hydration reminders |

## **7. Deployment and DevOps**

| Technology     | Usage                             |
| -------------- | --------------------------------- |
| Docker         | Containerization                  |
| AWS EC2        | Backend deployment                |
| AWS RDS        | Managed PostgreSQL                |
| AWS S3         | Media storage                     |
| Nginx          | Reverse proxy                     |
| Git / GitHub   | Version control and collaboration |
| GitHub Actions | CI/CD automation                  |

## **8. Overall Architecture**

**React + TypeScript + Tailwind**

Patient · Family · Healthcare

**FastAPI Backend**

Authentication · APIs · Business Logic

**Agentic AI**

LangGraph + LangChain + LLM

**ML Engine**

Scikit-learn + Decision Tree

PostgreSQL

Redis

ChromaDB

## **9. Recommended MVP Stack**

To avoid unnecessary complexity, I'd actually start with:

| Layer           | Selected technology           |
| --------------- | ----------------------------- |
| Frontend        | React + TypeScript + Tailwind |
| Backend         | Python + FastAPI              |
| Agentic AI      | LangChain + LangGraph         |
| LLM             | Gemini or Groq                |
| ML              | Scikit-learn Decision Tree    |
| Database        | PostgreSQL                    |
| Vector Database | ChromaDB                      |
| Cache / Queue   | Redis                         |
| Speech          | Sarvam AI                     |
| Storage         | AWS S3                        |
| Deployment      | Docker + AWS EC2              |

**My advice:** Start with PostgreSQL, Redis and ChromaDB rather than introducing MongoDB as well. Keep the architecture modular, with separate AI and ML services logically separated from your main backend. You can add the remaining infrastructure as the MVP grows.