# 🌱 Green Bangladesh – Product Requirements Document (PRD)

## 1. Product Overview

**Green Bangladesh** is a web application that visualizes tree density across all 64 districts of Bangladesh and encourages citizens to plant more trees.

The platform categorizes districts into environmental zones based on tree density and highlights areas where tree plantation efforts are most needed.

Users can also report newly planted trees to contribute to environmental improvement and track community impact.

---

# 2. Product Goals

### Primary Goals

* Visualize tree density distribution across Bangladesh.
* Identify districts with low vegetation coverage.
* Encourage tree plantation through community participation.
* Track user-reported tree plantation activities.

### Long-Term Vision

Create a **national environmental awareness platform** that helps citizens and organizations monitor and improve Bangladesh’s green coverage.

---

# 3. Target Users

### Citizens

People who want to contribute to environmental protection by planting trees.

### Environmental Volunteers

Organizations or individuals tracking plantation campaigns.

### Policy Researchers

People who want to observe tree density patterns across districts.

---

# 4. Core MVP Features

## 4.1 Authentication System

Users must authenticate before submitting plantation reports.

Authentication will be implemented using **Better Auth**.

### Features

* User signup
* User login
* Session management
* Secure authentication

---

# 4.2 Bangladesh District Tree Density Map

The application will display an **interactive map of Bangladesh with all 64 districts**.

Each district will be color-coded based on tree density zones.

### Zone System

Tree density score determines the zone:

| Score Range | Zone        | Color |
| ----------- | ----------- | ----- |
| 1 – 30      | Red Zone    | 🔴    |
| 31 – 50     | Orange Zone | 🟠    |
| > 50        | Green Zone  | 🟢    |

Zones represent environmental health levels.

### Map Capabilities

Users can:

* View the entire Bangladesh map
* Hover or click on districts
* See district statistics
* Understand environmental health visually

---

# 4.3 District Environmental Data

Each district will store tree density information.

### District Data Fields

* District Name
* Division
* Area (km²)
* Estimated Total Trees
* Trees Per Km²

The system **does NOT store zone or score in the database**.
These values are calculated dynamically in the backend.

---

# 4.4 Tree Plantation Tracker

Users can report that they planted trees.

This helps measure community participation and environmental impact.

### User Submission Data

Users can submit:

* Number of trees planted
* Location
* District
* Plantation date

### Purpose

* Track tree plantation activity
* Encourage community participation
* Measure environmental contribution

---

# 4.5 District Leaderboard

The system will show districts contributing the most to tree plantation.

### Leaderboard Data

* District Name
* Total Trees Planted by Users
* Number of Plantation Reports

### Example

Top Green Districts

1. Sylhet – 12,000 trees planted
2. Rangamati – 10,500 trees planted
3. Barisal – 9,200 trees planted

---

# 5. Database Entities (MVP)

## Core Entities

### User

Authenticated platform user.

### Profile

Stores extended user information.

### Division

Administrative division of Bangladesh.

### District

District-level environmental data.

### PlantationReport

User-reported tree plantation record.

---

# 6. Database Relationships

### Division → District

One division contains many districts.

### District → PlantationReport

Each plantation report belongs to a district.

### User → PlantationReport

A user can submit many plantation reports.

### User → Profile

Each user has one profile.

---

# 7. Tree Density Score Calculation

Tree density score is calculated dynamically.

### Formula

```
score = (treesPerKm2 / 12000) * 100
```

Score is clamped between **0 and 100**.

---

# 8. Zone Calculation

Zone is derived from the tree density score.

```
Score <= 30  → RED
Score <= 50  → ORANGE
Score > 50   → GREEN
```

Zones are **computed in backend services**, not stored in the database.

---

# 9. Backend API Overview

## Authentication

POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout

---

## District APIs

GET /api/districts
Returns all districts with calculated zone and score.

GET /api/districts/:id
Returns detailed district information.

---

## Plantation APIs

POST /api/plantations
Create a plantation report.

GET /api/plantations
Get all plantation reports.

GET /api/districts/:id/plantations
Get plantation reports for a district.

---

## Leaderboard API

GET /api/leaderboard

Returns districts ranked by total planted trees.

---

# 10. Data Seeding

The system will initially use **dummy environmental data for all 64 districts** of Bangladesh.

The seed dataset includes:

* District name
* Division
* Area (km²)
* Estimated trees
* Trees per km²

Real environmental data can be integrated later without changing the system architecture.

---

# 11. Tech Stack

### Frontend

* Next.js
* React
* TailwindCSS
* Leaflet or Mapbox for maps

### Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL

### Authentication

* Better Auth

### Deployment

* Vercel (frontend)
* VPS / Railway / Render (backend)

---

# 12. Future Features (Post-MVP)

Community system:

* User communities
* Environmental discussion posts
* Comments
* Campaign organization

Advanced features:

* Satellite tree data integration
* Environmental analytics dashboards
* Government data integration
* Tree plantation campaigns

---

# 13. Success Metrics

The platform success will be measured by:

* Number of active users
* Plantation reports submitted
* Trees planted via the platform
* Participation in low-density districts

---

# 14. Product Vision

Green Bangladesh aims to become a **national environmental awareness platform** that empowers citizens to take action in restoring the country's green ecosystem.
