# CHAT BRIEF — DATABASE

Missão: definir schema transacional e auditável antes de espalhar persistência.

Ordem: identity/institution → people/student → admissions/enrollment → academic → attendance/assessment/grades → finance → communication/documents/audit.

Não fazer: copiar mocks diretamente, esconder relações críticas em JSON, apagar histórico financeiro/académico ou modelar sem estados aprovados.

Primeira entrega: ERD V1 + data dictionary + migrations + constraints para Identity/Institution/Student/Guardian/Enrollment.
