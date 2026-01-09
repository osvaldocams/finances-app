
ticket
# 015

**side-project**
-Backend- 

**subject**
additional business rules

**branch**
backend/movement-business-rules

**part**
all 

**Date:** Jan/08/2026

**Desccription:**
- This update introduces stricter business rule validation in validateMovementLogic for deposit and transfer movement types.
- The middleware now enforces account domain constraints based on the kind property, ensuring that deposits only occur from cash to bank accounts, and transfers are restricted exclusively to bank-to-bank operations,this change strengthens domain consistency at the middleware level and prevents invalid financial movements before they reach the persistence layer.