# Future client portal — not implemented

A portal is a separate phase requiring a defined purpose and access model. The public site has no login or nonfunctional portal links.

A possible future implementation would use Firebase Authentication for verified identity and Firestore for client-specific records. Use a separate client collection or explicit client ID on every record, and enforce membership in Firestore Security Rules. A client ID in the browser or hidden navigation is not access control.

Before building it:

- Define client and administrator roles, invitations, account recovery and revocation.
- Design per-client data isolation and default-deny rules. Never let a user assign themselves a role or client membership.
- Use the Firebase Emulator Suite to test unauthenticated access, cross-client reads and writes, role changes, deleted membership, query access and administrative operations.
- Keep privileged operations in a trusted environment; do not ship service-account credentials to the browser.
- Agree on retention, privacy, file storage rules, billing limits and support responsibilities.

This plan is not a claim that a secure portal exists. Authentication, Firestore, rules and a backend will be introduced only when the phase is authorised and its requirements are concrete.
