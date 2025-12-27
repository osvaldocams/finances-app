
ticket
# 011

**side-project**
-Frontend- 

**subject**
Movement logic and validation 

**branch**
feat/movement-flow

**part**
frontend form

**Date:** Dec/27/2025

**Desccription:**
- This iteration focused on making the movement form fully functional, and it turned out to be one of the most challenging parts of the project so far.


**Tecnical decisions/learnings:**
- What initially seemed like a “simple form” quickly revealed the inherent complexity of financial forms. Handling optional fields, business rules, conditional validation, and data normalization required more than basic form handling.
- To address this, I integrated React Hook Form with Zod using zodResolver, and implemented advanced validation logic through superRefine. This allowed me to express business rules that go beyond simple field-level validation and reason about the form as a whole.
- During this process, I faced several friction points between Zod, React Hook Form, and TypeScript. Type inference conflicts, value normalization issues (empty strings vs undefined), and schema expectations often clashed. Resolving these conflicts required multiple iterations and a deeper understanding of how each tool models data and validation internally.
- Key learnings from this stage: 
 - Financial forms require explicit modeling of intent, not just input validation.
 - superRefine is essential for enforcing real-world business rules.
 - watch from React Hook Form is critical for reactive, conditional logic within forms.
 - Harmonizing Zod, RHF, and TypeScript is non-trivial but leads to a far more robust and predictable form layer once achieved.
 - This step significantly improved both the reliability of the form and my understanding of schema-driven validation in real-world applications.



**Next Steps:**
- Next step is to start with data fetching logic


















