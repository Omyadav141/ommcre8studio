## Architecture
- Shared site navigation and visual primitives live in the root shell and site components to keep every public page consistent.
- Service and insight layouts render Outlet; dynamic detail pages use browser-safe content modules to share copy without duplicating routes.
- Enquiries use a shared validation schema and a public server function with insert-only database access; no public read access is granted to lead records.
- Booking discovery uses the workspace Calendly connection on the server; the live provider calendar owns availability, confirmation and rescheduling.
- Route-specific metadata belongs on content leaves; illustrative bundled images do not receive relative social-image tags.
- A shared browser-only canvas background reads semantic CSS tokens and respects reduced motion so all pages share the same ambient movement without server dependencies.
- Project content distinguishes public references from illustrative concepts, and detail pages provide explicit return and sibling navigation so browsing never becomes a dead end.
- Project media is optional; shared cards and detail pages render a pending-preview state when no authentic asset is available, rather than substituting generated artwork.
