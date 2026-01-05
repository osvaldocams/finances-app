
ticket
# 013

**side-project**
-Backend- 

**subject**
Refactor account module

**branch**
backend-refactor/account

**part**
all refactor

**Date:** Jan/05/2026

**Desccription:**
- This iteration focused on a structural refactor of the backend, specifically the Accounts module, transitioning from a rigid enum-based design to a more flexible and domain-driven approach.

- The original implementation constrained the system by tightly coupling account behavior to a fixed TypeScript enum. As the frontend evolved, it became clear that this rigidity would limit scalability and increase friction across the application. This refactor redefined how accounts are modeled, validated, and consumed across the backend.

- The changes followed the MVC design pattern and were propagated consistently across models, routes, middlewares, controllers, and shared types.


**Tecnical decisions/learnings:**
- Removed the enum-based account definition from the Account model and introduced a more flexible kind property to represent the account domain.

- Treated kind as a true domain concept, keeping it as an enum at the type level while allowing the data model itself to remain extensible.

- Introduced dedicated DTOs for both Movement and Account to clearly separate external input validation from internal domain logic.

- Updated routes and Express Validator rules to align with the new model structure.

- Refactored Account controllers to adapt to the new domain paradigm.

- Propagated the new account design to the Movement module, updating its routes, middlewares, and controllers to remain consistent with the refactored domain.

- Ensured correctness and stability by validating the full flow with successful tests after the refactor.

**Challenges:**
- The most conceptually challenging part of this refactor was the validateMovementLogic middleware.

- From my perspective, this middleware became the core of the new architecture. It represents the inflection point where domain rules are enforced in a centralized and explicit way, decoupled from controllers and models.

- Designing this middleware required carefully reasoning about: the correct order of execution for validations and side effects, how account kind influences movement behavior and ensuring that invalid domain states are rejected early, before any database mutations occur.

- Once this middleware was correctly designed, the rest of the system naturally aligned around it. In many ways, this component made the refactor possible and gave coherence to the new flexible account model.

**Leasson learned:**
- Domain-driven constraints should live in dedicated layers, not be scattered across controllers.

- Flexibility in data models often requires stronger, more explicit validation logic elsewhere.

- Middleware can act as a powerful architectural boundary when used intentionally, not just as a technical utility.

- Large refactors are easier to reason about when they are treated as atomic transformations rather than incremental tweaks.

**Next Steps:**
- Reconnect frontend development with the refactored backend, taking advantage of the new flexible Account design.