
ticket
# 012

**side-project**
-Frontend- 

**subject**
Frontend API integration (draft)

**branch**
frontend/api

**part**
frontend api integration

**Date:** Jan/03/2026

**Desccription:**
- In this iteration, I focused on setting up the frontend API layer and establishing the first real data flow between the frontend and the backend. This included centralizing HTTP requests, creating services for core entities, and integrating real backend data into the UI.

- I implemented the initial API infrastructure using a shared Axios instance and created services for creating movements and retrieving accounts. These services were then connected to the UI using TanStack React Query, allowing the form to consume real data instead of mocked or hardcoded values.


**Tecnical decisions/learnings:**
- Introduced a centralized Axios instance to standardize API requests and manage the base URL through environment variables.

- Created dedicated service files for createMovement and getAllAccounts, keeping the API layer isolated from the UI.

- Used Zod schemas and shared TypeScript types to validate and type DTOs and API responses, ensuring consistency between form data and backend expectations.

- Integrated TanStack React Query to handle server state, mutations, caching, and error handling in a declarative way.

- Connected the getAllAccounts query to the movement form in order to dynamically populate the accounts select input.

- A key decision during this phase was to intentionally leave this branch incomplete. While integrating accounts into the UI, it became evident that the current backend implementation relies on a rigid TypeScript enum, which limits flexibility and future scalability. To avoid accumulating technical debt on the frontend, I decided to pause further work on this branch and plan a backend refactor for the Accounts module before continuing.

**Challenges:**
- Designing clean boundaries between services, schemas, and UI logic while introducing React Query for the first time in this project.

- Ensuring that Zod schemas, DTO transformations, and React Hook Form data aligned correctly with the backend contract.

- Realizing mid-implementation that frontend progress was being constrained by backend design decisions, which required stepping back and reassessing the overall architecture.

**Next Steps:**
- Refactor the Accounts module on the backend to remove the enum-based design and replace it with a more flexible and scalable model.

- Update the API contracts accordingly.

- Resume frontend development once the backend structure better supports dynamic account management.