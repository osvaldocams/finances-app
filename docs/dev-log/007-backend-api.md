
ticket
# 007

**side-project**
-Backend- 

**subject**
REST API routes and controllers for Movement 

**branch**
backend-initial_setup

**part**
backend api

**Date:** Dec/10/2025

**Desccription:**
- Today i made a significant progress on the backend, specially on the logic for creating and deleting financial movements and keeping all related balances fully consistent. this ended up being the most challenging part of the update. 


**Tecnical decisions/learnings:**
- Fully implemented createMovement including updates to the global balance, and deleteMovement with the oposite effect. 

**Difficulties:**
- The hardest part of this update was ensuring that all balances remain atomic and consistent, especially when multiple collections must be updated based on a single action. This forced me to learn and properly use Mongoose Transactions, which required: Manually creating a session, Wrapping all logic inside session, ensuring each database operation uses {session}, carefully thinking through the execution order to avoid inconsistent states, making sure create/delete operations mirror each other perfectly

**Next Steps:**
- Next step will be finishing endpoints for Account