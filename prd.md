# 🌱 Green Bangladesh – Product Requirements Document (PRD)

---

# 1. Product Overview

**Green Bangladesh** is a web application that visualizes tree density across all 64 districts of Bangladesh and encourages citizens to plant more trees.

The platform categorizes districts into environmental zones based on tree density and highlights areas where plantation efforts are most needed.

Users can report newly planted trees, helping track environmental progress and community contribution.

Administrators maintain environmental data accuracy and manage users through a dedicated admin dashboard.

---

# 2. Product Goals

### Primary Goals

* Visualize tree density distribution across all districts of Bangladesh
* Identify districts with low vegetation coverage
* Encourage citizens to plant trees
* Track community plantation activities

### Long-Term Vision

Build a **national environmental awareness platform** that helps citizens, volunteers, and organizations monitor and improve Bangladesh's green coverage.

---

# 3. Target Users

### Citizens

Individuals who want to contribute to environmental protection by planting trees.

### Environmental Volunteers

Organizations or individuals who monitor plantation campaigns.

### Researchers

People interested in environmental data and tree density distribution.

### Platform Administrators

Authorized users responsible for maintaining environmental data and moderating platform activities.

---

# 4. Core MVP Features

---

# 4.1 Authentication System

Authentication is implemented using **Better Auth**, supporting secure session management and advanced flows.

### Endpoints

* `POST /api/auth/register` – User signup
* `POST /api/auth/login` – User login
* `POST /api/auth/logout` – Session termination
* `POST /api/auth/get-new-token` – Refresh access token
* `POST /api/auth/change-password` – Update user password
* `POST /api/auth/verify-email` – Email verification flow
* `POST /api/auth/forgot-password` – Request password reset
* `POST /api/auth/reset-password` – Complete password reset

### Features

* Secure session management
* Token rotation (refresh tokens)
* Role-based authorization
* Email verification and password recovery

---

# 4.2 Bangladesh District Tree Density Map

The platform will display an **interactive map of Bangladesh with all 64 districts**.

Each district will be color-coded based on environmental zone.

### Zone System

Zones are derived from the **tree density score**.

| Score Range | Zone        | Color |
| ----------- | ----------- | ----- |
| 1 – 30      | Red Zone    | 🔴    |
| 31 – 50     | Orange Zone | 🟠    |
| > 50        | Green Zone  | 🟢    |

### Map Capabilities

Users can:

* View all districts
* Click on a district
* See district statistics
* Understand environmental health visually

---

# 4.3 District Environmental Data

District environmental data is maintained by administrators.

### District Data Fields

* District Name
* Division
* Area (km²)
* Estimated Total Trees
* Trees Per Km²

The system **does not store zone or score in the database**.
These values are calculated dynamically in the backend.

---

# 4.4 Tree Plantation Tracker

Users can report that they planted trees.

### Plantation Report Fields

* Number of trees planted
* Location description
* District
* Plantation date
* User ID

### Purpose

* Track tree plantation activity
* Encourage environmental participation
* Measure community impact

---

# 4.5 District Leaderboard

The system ranks districts based on community plantation activity.

### Leaderboard Data

* District name
* Total trees planted
* Number of plantation reports

### Example

Top Green Districts

1. Sylhet – 12,000 trees planted
2. Rangamati – 10,500 trees planted
3. Barisal – 9,200 trees planted

---

# 4.6 Admin Dashboard

The platform includes a secure **Admin Dashboard**.

Only administrators can access this dashboard.

### Admin Responsibilities

Admins can:

* Insert district environmental data
* Update district tree density information
* Manage platform users
* Monitor plantation reports
* Maintain data accuracy

---

# 5. Role-Based Access Control (RBAC)

The system implements role-based access control.

### User Roles

| Role  | Permissions                    |
| ----- | ------------------------------ |
| USER  | Submit plantation reports      |
| ADMIN | Manage district data and users |

---

# 6. District Data Management (Admin Only)

Only administrators can modify environmental data.

### Admin Capabilities

Admins can:

* Add district environmental data
* Update tree density information
* Update estimated tree counts
* Modify district environmental metrics

### Editable Fields

* Estimated Trees
* Trees Per Km²
* Area (optional)

### Restrictions

Regular users **cannot modify district environmental data**.

---

# 7. User & Profile Management

The system allows users to manage their own profiles and admins to manage all platform users.

### User Self-Management

* `GET /api/users/me` – Retrieve own profile and account details
* `PATCH /api/users/me` – Update own profile (name, bio, avatar)
* `DELETE /api/users/me` – Deactivate/Delete own account

### Admin User Management

* `GET /api/admin/users` – View all users (with plantation stats)
* `PATCH /api/admin/users/:id/role` – Change user roles (USER/ADMIN)
* `PATCH /api/admin/users/:id/status` – Change account status (ACTIVE/BLOCKED)

### Admin Account Management

* `GET /api/admin/admins` – View list of all administrators
* `DELETE /api/admin/admins/:id` – Remove an administrator (soft delete)
* `PATCH /api/admin/profile` – Admin updates their own administrative profile

---

# 8. Plantation Report Moderation

Admins can monitor plantation reports to maintain platform integrity.

### Admin Actions

* View all plantation reports
* Detect spam or invalid submissions
* Delete invalid reports
* Monitor district participation

---

# 9. Database Entities (MVP)

### Core Entities

* **User**: Account credentials, roles, and status.
* **Profile**: Extended user information (bio, avatar).
* **Division**: High-level administrative regions.
* **District**: Specific areas with environmental metrics (tree density).
* **PlantationReport**: Community-submitted data for tree planting.
* **Session**: Better Auth session tokens.
* **Account**: Linked authentication providers (Better Auth).
* **Verification**: Email and reset verification tokens (Better Auth).

---

# 10. Database Relationships

User → Profile (One-to-One)

User → PlantationReport (One-to-Many)

Division → District (One-to-Many)

District → PlantationReport (One-to-Many)

---

# 11. Tree Density Score Calculation

Tree density score is calculated dynamically in the backend.

Formula:

```
score = (treesPerKm2 / 12000) * 100
```

Score is clamped between **0 and 100**.

---

# 12. Zone Calculation

Zone is derived from the tree density score.

```
Score <= 30  → RED
Score <= 50  → ORANGE
Score > 50   → GREEN
```

Zone values are **not stored in the database**.

---

# 13. Backend API Overview

---

## Authentication APIs

POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout

---

## District APIs

GET /api/districts
Returns all districts with calculated score and zone.

GET /api/districts/:id
Returns district details.

---

## Plantation APIs

POST /api/plantations
Create plantation report.

GET /api/plantations
Retrieve plantation reports.

GET /api/districts/:id/plantations
Retrieve plantation reports for a district.

---

## Leaderboard API

GET /api/leaderboard

Returns districts ranked by total planted trees.

---

# 14. Admin APIs

### District Management

* `PATCH /api/admin/districts/:id` – Update environmental metrics (area, estimated trees, density)

### User & Admin Management

* `GET /api/admin/users` – List all users
* `PATCH /api/admin/users/:id/role` – Update user role
* `PATCH /api/admin/users/:id/status` – Update user status (ACTIVE/BLOCKED)
* `GET /api/admin/admins` – List all administrators
* `DELETE /api/admin/admins/:id` – Soft delete an administrator account
* `PATCH /api/admin/profile` – Update admin's own profile

### Plantation Moderation

* `DELETE /api/admin/plantations/:id` – Delete invalid or spam reports

---

# 15. Data Seeding

Initial environmental data for all **64 districts of Bangladesh** will be seeded into the database.

Seed data includes:

* District name
* Division
* Area (km²)
* Estimated trees
* Trees per km²

This dataset will be replaced later with real environmental data.

---

# 16. Tech Stack

### Frontend

Next.js
React
TailwindCSS
Leaflet or Mapbox for maps

### Backend

Node.js
Express.js
Prisma ORM
PostgreSQL

### Authentication

Better Auth

### Deployment

Frontend: Vercel
Backend: VPS / Render / Railway

---

# 17. Future Features (Post-MVP)

Community system:

* User communities
* Environmental discussion posts
* Comments
* Plantation campaigns
* Tree plantation events

Advanced features:

* Satellite tree coverage data
* Environmental analytics dashboards
* Government environmental data integration
* AI-based environmental insights

---

# 18. Success Metrics

The platform success will be measured by:

* Number of registered users
* Plantation reports submitted
* Total trees planted via the platform
* Participation in low-density districts

---

# 19. Product Vision

Green Bangladesh aims to become a **national environmental platform** that empowers citizens to protect and expand Bangladesh’s green ecosystem through community participation and environmental data transparency.
