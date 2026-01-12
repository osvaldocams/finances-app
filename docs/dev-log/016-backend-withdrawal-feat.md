
ticket
# 016

**side-project**
-Backend- 

**subject**
withdrawal feature (backend)

**branch**
feature/withdraw

**part**
all 

**Date:** Jan/10/2026

**Desccription:**
- This update introduces full backend support for the withdrawal movement type.
- This update introduces full backend support for the withdrawal movement type.
    The change includes:
    Adding withdrawal to the typeMovements enum.
    Propagating the new type through the Movement model validations.
    Updating business rules to correctly enforce required accounts for withdrawals.
    Implementing balance updates and reverse operations in controllers, keeping data integrity checks consistent with existing movement types.
    Extending middleware validations and tests to cover the new feature.
- This feature models real-world cash withdrawals as a bank → cash transfer, maintaining symmetry with deposit while preserving explicit business semantics.
- Frontend support for withdrawal is intentionally deferred and will be addressed in the next branch.