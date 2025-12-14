
ticket
# 008

**side-project**
-Backend- 

**subject**
REST API routes and controllers for Account 

**branch**
backend-initial_setup

**part**
backend api

**Date:** Dec/14/2025

**Desccription:**
- In this iteration, i focused on completing the Account module by separating it responsabilities from the Movement feature and organizing it as an independient module, this envolve creating dedicated routes and controllers, refactoring existing logic.


**Tecnical decisions/learnings:**
- Decided to implement Account as its own router and controller module instead of keepeing its logic inside the Movement routes
- This separation follows the single responsability principle, making each module easier to reason about, test, and extend
- refactored account creation logic to use a more idiomatic controller structure, including: proper try/catch blocks, clear error handling, validation to prevent duplicate accounts.
- defined a limited and intentional scope for the account module at this stage including: account creation, fetching all accounts, fetching an account by id 

**Next Steps:**
- close backend-initial_setup
- work with the next feature "tags for movement"