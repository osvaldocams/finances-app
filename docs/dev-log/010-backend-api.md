
ticket
# 010

**side-project**
-Backend- 

**subject**
REST API Tag/Movement endpoints 

**branch**
feat/tags-crud

**part**
backend api

**Date:** Dec/19/2025

**Desccription:**
- In this iteration, I completed the integration between Tags and Movements, enabling a full relational flow between both domains. With this step, the Tags feature becomes fully usable and the backend reaches a stable point suitable for frontend development.
- This update marks the end of the Tags feature and the transition from backend-focused work to frontend integration.


**Tecnical decisions/learnings:**
- Implemented dedicated endpoints to attach and detach tags from movements, instead of embedding tag logic directly inside movement CRUD operations.
- Chose explicit POST and DELETE endpoints for tag relationships to keep controller logic predictable and easy to reason about.
- Performed a general backend cleanup and refactor to improve readability, consistency, and maintainability before frontend consumption.


**Next Steps:**
- Continue frontend development using the existing API.