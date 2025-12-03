
ticket
# 006

**side-project**
-Backend- 

**subject**
DB connection, routes and controller setup 

**branch**
backend-initial_setup

**part**
backend setup

**Date:** Dec/03/2025

**Desccription:**
- started the backend foundation of the project. DB connection, initial model, and first steps building routes and controllers  


**Tecnical decisions/learnings:**
- I created a MongoDB database in my Atlas cluster (not versioned in the repository)
- added a new environment variable containing the MongoDB connection URI
- Implemented a db.ts module that initializes the Mongoose connection
- Created the first data model, Movement, using Mongoose schemas
- set up routes/controllers with a basic sample router/controller

**Difficulties:**
- I face some difficulties understandig how TypeScript tuples work, since i needed them for defining certain parts of the Movement model. I needed to review examples and documentation to clarify how tuples constraints and literal types behave, and after a few tests i was able to implement the correct type definitions
**Next Steps:**
- Next step will be continue building the REST API