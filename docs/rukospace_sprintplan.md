# Part B — One-Day Sprint Plan (Four-Person Team)

This plan assumes a standard eight-hour working day, split into two development blocks separated by a lunch break, with structured checkpoints for integration. It further assumes the pre-sprint preparation in Section 2 is complete before the sprint day begins, since environment setup and framework onboarding within the sprint window would consume time unaffordable against the MVP scope in Part A.

## 1. Team Structure and Role Allocation

| Person | Role | Primary Responsibility |
|---|---|---|
| **A** | Backend Engineer — Platform | Authentication, RBAC middleware, database migrations, Docker Compose environment, deployment readiness. |
| **B** | Backend Engineer — Domain | Property and booking domain logic, geospatial search, file uploads, QR code generation, admin verification endpoints. |
| **C** | Frontend Engineer — Public Surface | Landing page, authentication UI, search and map interface, property detail page. |
| **D** | Frontend Engineer — Operational Surface | Owner dashboard, listing creation and management UI, admin verification UI, booking management UI. |

This split isolates the two backend engineers by domain boundary (platform concerns versus business-domain concerns) rather than by arbitrary endpoint count, which keeps ownership clear when both work against the same database. The two frontend engineers split by user surface (public-facing tenant journeys versus authenticated operational dashboards), which minimises component overlap and merge conflicts.

## 2. Pre-Sprint Preparation Checklist

Complete the following before the sprint day begins:

- [ ] Repository scaffolded with a Go module, Fiber boilerplate, and a Vite React TypeScript project, committed to `main`.
- [ ] `docker-compose.yml` prepared for PostgreSQL with the PostGIS image (`postgis/postgis:16-3.4`).
- [ ] The API contract from Part A, Section 11, converted into a committed OpenAPI YAML file or Postman collection.
- [ ] The database schema from Part A, Section 10.2, saved as a migration file, tested to run cleanly against a fresh database.
- [ ] Seed script prepared to populate at least 50 sample properties across varied locations, prices, and specifications, for realistic search demonstration.
- [ ] Design reference (Figma or equivalent) confirmed accessible to both frontend engineers.
- [ ] A shared task board (GitHub Projects, Trello, or Linear) populated with the task breakdown from Section 4 below.
- [ ] A communication channel (Discord or Slack) established for the sprint day's standups and blocker flagging.

## 3. Sprint Timeline

| Time | Duration | Activity | Participants |
|---|---|---|---|
| 08:00–08:20 | 20 min | Kickoff standup: confirm scope, review the task board, surface any environment issues from setup. | All |
| 08:20–09:00 | 40 min | Lock the API contract and database schema; each backend engineer confirms their endpoint set against Part A, Section 11. | All |
| 09:00–11:30 | 2 h 30 min | **Build Block 1** (parallel development; see Section 4). | All, working independently |
| 11:30–11:45 | 15 min | Standup checkpoint: report progress, flag blockers, adjust Block 2 scope if required. | All |
| 11:45–12:45 | 1 h | Lunch break. | All |
| 12:45–15:00 | 2 h 15 min | **Build Block 2** (parallel development; see Section 4). | All, working independently |
| 15:00–15:15 | 15 min | Standup checkpoint: confirm all endpoints and screens are ready for integration. | All |
| 15:15–16:15 | 1 h | Integration and bug-fixing, in pairs: A with C (authentication and tenant flow), B with D (listings, bookings, and admin flow). | All, paired |
| 16:15–16:45 | 30 min | End-to-end testing against the demo script in Section 7. | All |
| 16:45–17:00 | 15 min | Demo rehearsal and sprint retrospective. | All |

## 4. Detailed Task Breakdown per Person

### Build Block 1 (09:00–11:30)

| Person | Tasks | Linked Requirements |
|---|---|---|
| **A** | Implement `POST /auth/register`, `POST /auth/login`, `GET /auth/me`. Build JWT-issuance and JWT-validation middleware. Build role-based access-control middleware. Finalise and run the `users` table migration. | FR-AUTH-01 to FR-AUTH-04 |
| **B** | Finalise and run the `properties`, `property_photos`, `property_documents` migrations with the PostGIS index. Implement `POST /properties`, `PUT /properties/:id`, `GET /properties/:id`. Implement the seed script execution. | FR-O-01, FR-O-04 |
| **C** | Build the application shell, routing structure, and Tailwind design tokens from the reference design. Build the registration and login pages, wired against A's contract using a mocked response until A's endpoints are live. Build the landing page. | FR-AUTH-01, FR-AUTH-02 |
| **D** | Build the owner dashboard shell and the admin dashboard shell, including routing and role-gated navigation. Build the listing-creation form UI (fields only, wired to a mock submit handler pending B's endpoint). | FR-O-01, FR-A-01 |

### Build Block 2 (12:45–15:00)

| Person | Tasks | Linked Requirements |
|---|---|---|
| **A** | Implement `survey_bookings` migration. Implement `POST /bookings`, `GET /bookings/mine`, `GET /bookings/received`, `PATCH /bookings/:id/status`. Wire booking endpoints to RBAC middleware built in Block 1. | FR-T-05, FR-T-06, FR-O-06 |
| **B** | Implement `GET /properties` with geospatial and specification filtering. Implement photo and document upload endpoints. Implement QR code generation and `GET /properties/:id/qrcode`. Implement `POST /properties/:id/submit`. | FR-T-01, FR-T-02, FR-O-02, FR-O-03, FR-O-05 |
| **C** | Build the search page with the Leaflet map and synchronised results list, wired to B's live search endpoint. Build the property detail page, including the QR code display and the survey-request form wired to A's booking endpoint. | FR-T-01 to FR-T-05, FR-T-07 |
| **D** | Complete the listing-creation form's photo and document upload, wired to B's live upload endpoints. Build the admin verification queue UI, wired to endpoints B delivers by end of block. Build the booking management UI for owners, wired to A's live booking endpoints. | FR-O-02, FR-O-03, FR-O-06, FR-A-01 to FR-A-04 |

### Fallback Provision

If PostGIS integration in Block 1 is not stable by 10:30, B switches to a plain `latitude DOUBLE PRECISION` and `longitude DOUBLE PRECISION` column pair with an application-level bounding-box filter, preserving the `GET /properties` contract's query parameters unchanged. This keeps C's frontend work unaffected regardless of which implementation ships.

## 5. Definition of Done

The one-day MVP is complete when every item below is true:

- [ ] A tenant account can be registered and can log in successfully.
- [ ] An owner account can be registered, can log in, and can create a listing with all specification fields, photographs, and at least one legality document.
- [ ] A submitted listing appears in the administrator's verification queue.
- [ ] An administrator can approve a listing, after which it becomes visible in public search.
- [ ] An administrator can reject a listing with a reason, after which it disappears from public search and the reason is visible to the owner.
- [ ] A tenant can search by location and filter by at least price and floor area, with results reflected on both the map and the list view.
- [ ] A tenant can open a property detail page and view its QR code.
- [ ] A tenant can submit a survey booking request, and the owner can approve or reject it from their dashboard.
- [ ] No console errors or unhandled API failures occur across the demo script in Section 7.

## 6. Integration and Testing Strategy

- Each backend engineer exposes endpoints against the locked OpenAPI contract from the pre-sprint checklist, allowing frontend work to proceed against mocked responses until real endpoints land, with a straightforward mock-to-live swap at integration time.
- The 15:15–16:15 integration block pairs each backend engineer with the frontend engineer consuming their endpoints directly, resolving contract drift in real time rather than through asynchronous bug reports.
- Manual testing during integration follows the three user flows in Part A, Section 12, executed in full by each pair before moving to the shared end-to-end pass.
- The 16:15–16:45 slot runs the complete demo script (Section 7) with all four team members present, capturing any cross-cutting issue that pairwise testing missed.

## 7. Demo Script

1. **Tenant registration and search.** Register a new tenant account. Search for shophouses within a defined radius of a chosen point. Apply a price and floor-area filter. Confirm the map and list view update in sync.
2. **Property detail and QR code.** Open a listing from the search results. Review its photographs, specifications, and legality status. Display its QR code.
3. **Survey request.** Submit a survey request for a preferred date and time. Confirm the request appears under the tenant's dashboard with a `pending` status.
4. **Owner listing creation.** Register a new owner account. Create a listing with full specifications, photographs, and a legality document. Submit it for verification.
5. **Administrator verification.** Log in as the seeded administrator. Locate the newly submitted listing in the verification queue. Review its documents and approve it.
6. **Owner booking management.** Return to the owner account. Locate the tenant's survey request from Step 3 against a previously approved listing. Approve the request.
7. **Closing confirmation.** Return to the tenant account and confirm the survey request now shows an `approved` status, closing the loop on the full discovery-to-survey journey.

## 8. Risk Mitigation for the Sprint Day

| Risk | Mitigation |
|---|---|
| Scope creep beyond the MVP list in Part A, Section 5.1. | The task board contains only MVP-tagged tasks; any additional idea raised during the day is logged directly to the Section 9 backlog rather than built. |
| A blocked engineer with no immediate task. | Standups at 11:30 and 15:00 exist specifically to reallocate a blocked engineer onto an unblocked teammate's task rather than leaving idle time. |
| Merge conflicts from four people committing to `main` throughout the day. | Trunk-based development with small, frequent commits (Part A, Section 8.4) keeps individual diffs small enough to resolve conflicts within minutes. |
| Geospatial search complexity overruns its time box. | The fallback bounding-box filter in Section 4 is pre-agreed, not improvised under time pressure. |
| File upload handling (photos and documents) consumes more backend time than budgeted. | B implements photo and document upload as a single shared handler differentiated only by a `doc_type` parameter, avoiding duplicated multipart-parsing logic. |

## 9. Post-Sprint Backlog (Sprint 2 Onward)

| Priority | Item | Notes |
|---|---|---|
| High | Digital payment integration (virtual account, e-wallet, card). | Requires a licensed payment gateway partner; see Part A, Section 5.2. |
| High | Escrow fund holding. | Depends on the payment integration above; requires legal review against Indonesian financial regulation. |
| High | Digital contract generation and e-signature. | Requires an e-signature provider evaluation and legal template review. |
| Medium | Automated notification delivery (email, SMS, push). | Introduce a message-queue-backed notification service once traffic volume justifies it. |
| Medium | Tenant listing-report and administrator moderation workflow. | FR-T-08 and FR-A-05 from Part A. |
| Medium | Owner-facing visit and enquiry analytics dashboard. | FR-O-07 from Part A. |
| Low | Migration from local disk storage to MinIO or S3. | Recommended before any multi-instance deployment, per Part A, Section 8.5. |
| Low | Redis-backed search result and session caching. | Warranted once catalogue size or concurrent traffic exceeds single-instance comfort margins. |