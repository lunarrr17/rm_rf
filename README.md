# social_community_web_app
Building a social web platform where developers can log in , connect with other developers , follow them , write posts , share insights , talk to each other  and have access to many more such premium features by subscribing


# ROADMAP 
## Phase 01 - Setting up identity and access
<b>Here we will be focusing on the registration , login , JWT auth , Google Auth , protected routes and email verification</b>

You will learn:

1) Access tokens (short-lived, 15min) vs Refresh tokens (long-lived, 7d) — implement both, understand why both exist
2) httpOnly cookies vs localStorage — make a decision, defend it
3) Google OAuth 2.0 flow with Passport.js — understand the redirect dance, don't just copy it
4) Email verification with signed tokens (crypto.randomBytes, not JWT here — learn why)
5) Middleware: authenticate, authorize(roles) — write these yourself

6) MongoDB models you design: User, RefreshToken

<b>Your non-negotiable rule: Write a DECISIONS.md file. Every time you make an architectural choice, write one paragraph explaining why. Future-you will thank present-you.</b>



## Phase 2 — The Core Community (Days 8–16)
<b>What you ship: Communities (subreddits-style), posts, comments, nested replies, follow system, feed</b>

You will learn:

1) MongoDB schema design under pressure — embedding vs referencing (you'll get this wrong once, then understand it)
2) Aggregation pipelines — your feed is NOT a simple .find(). It's an aggregation across follows, communities, and recency
3) Pagination done right — cursor-based pagination, not skip/limit (learn why skip breaks at scale)
4) Indexing — run .explain("executionStats") on every query you write. If it's doing a COLLSCAN, fix it
5) Soft deletes — deleted posts aren't gone, they're hidden. Implement this correctly

6) MongoDB models: Community, Post, Comment, Follow, Membership

Checkpoint: Take your feed aggregation query. Add 10,000 fake documents using a seed script. Is it still fast? If not — you have missing indexes. Find them.

## Phase 3 — Real-Time Everything (Days 17–23)
<b>What you ship: Real-time notifications, direct messaging, online presence indicators, live comment updates</b>

You will learn:

1) WebSocket lifecycle — connection, rooms, namespaces, disconnection cleanup
2) Socket.io + JWT auth (yes, you auth WebSocket connections too — most tutorials skip this)
3) Room-based architecture — each community, each DM thread is a room
4) Event design — define a strict event schema (type, payload, timestamp). Treat it like an API contract
5) Presence system — track who's online in Redis (not MongoDB — learn why)
6) Handling reconnections gracefully on the client

<b>The hard problem you'll hit: A user has 3 browser tabs open. They get a notification. All 3 tabs should update. Solving this teaches you more about WebSockets than any tutorial.</b>

Checkpoint: Open your app in 3 tabs as the same user. Send a message from another account. Do all 3 tabs show the notification instantly? If not — not done.

## Phase 4 — File Uploads & Background Jobs (Days 24–30)
<b>What you ship: Avatar uploads, post image attachments, email notification system, async job processing</b>

You will learn:

1) Multer + Cloudinary pipeline — validate file type and size BEFORE sending to Cloudinary
2) Signed uploads vs unsigned uploads — understand the security difference
3) Image transformation on-the-fly (Cloudinary URLs are programmable — use this)
4) BullMQ + Redis — every email, every "process this image", every "send this notification" is a background job. Nothing blocking in your request cycle
5) Job retries, failure handling, dead letter queues — what happens when Cloudinary is down?
6) Bull Board — add the admin UI so you can see your queues visually

<b>Why queues matter here: A user uploads a profile picture. You need to: resize it, strip EXIF data, update the DB, send a confirmation email. Do ALL of that in the request handler and your API response takes 3 seconds. Queue it and it takes 80ms.</b>

Checkpoint: Disconnect Redis mid-upload. What happens? Your app should degrade gracefully, not crash. Make it so.

## Phase 5 — Search (Days 31–36)
<b>What you ship: Full-text search across posts, users, and communities with filters, sorting, and relevance ranking</b>

You will learn:

1) MongoDB Atlas Search (text indexes) — set this up properly with weights (title matters more than body)
2) Faceted search — filter by community, date range, tags simultaneously
3) Debounced search on the frontend hitting a dedicated /search endpoint
4) Search result highlighting — show users WHY their query matched
5) Caching hot searches in Redis with a TTL

<b>The trap most devs fall into: They do { $text: { $search: req.query.q } } and call it search. You're going to build something that actually ranks results by relevance, recency, and engagement score. That's real search.</b>

Checkpoint: Search for a common word that appears in 500 posts. Is it fast? Are results relevant? Are they cached on the second hit?

## Phase 6 — Payments & Subscriptions (Days 37–44)
<b>What you ship: Premium membership via Stripe, feature gating, billing portal, webhook handling</b>

You will learn:

1) Stripe Checkout vs Payment Intents — understand when to use each
2) Webhooks — this is the most important concept in this phase. Stripe tells YOUR server what happened. You don't poll Stripe. Implement stripe.webhooks.constructEvent() properly
3) Idempotency — Stripe can send the same webhook twice. Your handler must be idempotent (processing it twice = same result as once)
4) Subscription lifecycle — created, updated, canceled, past_due — handle all states
5) Feature gating middleware — requiresPremium middleware that checks subscription status
6) Storing minimal billing data (never store card numbers — ever)

Checkpoint: Use Stripe CLI to replay a customer.subscription.deleted event. Does your app correctly revoke premium access? Does running it twice break anything?

## Phase 7 — Harden & Ship (Days 45–50)
<b>What you ship: Security hardening, logging, rate limiting, Docker setup, deployment</b>

You will learn:

1) Helmet.js, CORS config, NoSQL injection prevention
2) Rate limiting by IP and by user (different limits for different routes)
3) Winston structured logging — every request, every error, logged as JSON
4) Docker Compose — your entire app (Node + MongoDB + Redis) starts with one command
5) GitHub Actions CI — tests run on every push, broken code never merges
6) Deploy to Render or Railway (free tier)

Final Checkpoint — The only one that matters:
Delete your local database. Clone your repo on a fresh machine. Follow only your own README.md. The app should be fully running in under 10 minutes. If it's not — your README is incomplete and your setup is fragile.