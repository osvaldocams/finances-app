
ticket
# 014

**side-project**
-Frontend- 

**subject**
adaptation to backend account refactor

**branch**
chore/frontend-backend-sync

**part**
all 

**Date:** Jan/07/2026

**Desccription:**
- This ticket was relatively straightforward from a technical standpoint, the main objective was to synchronize the frontend with the recent backend refactor, specifically the introduction of the new kind domain rule in the Account model.

- The work mainly consisted of: adapting the accountSchema to accept the new kind property, propagating this change to the types and schemas related to Movement, adjusting the contract (incomeAccountId / expenseAccountId) to align it with the current API, ensuring that typing and validations remained consistent after the refactor.

**Tecnical decisions/learnings:**
- The most relevant learning from this ticket wasn't technical, but rather process-related, since the kind information was already available, work was done on the account selection filters (deposit and transfer) ahead of schedule, which exceeded the original scope of the branch. Although this progress doesn't cause any functional problems, it highlights a point for personal improvement: being more disciplined with the scope limits of each branch/commit, even when working alone, to maintain a cleaner history and better-encapsulated decisions, this ticket achieves its main objective, but serves as a reminder that scope control is also part of software design.

**Next Steps:**
- go to validateMovementLogic in the backend to do some adjustments