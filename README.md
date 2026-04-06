# 🌱 Green Bangladesh API

**Green Bangladesh** is a robust backend API designed to visualize tree density across all 64 districts of Bangladesh and encourage citizen-led plantation efforts. The platform categorizes districts into environmental zones and allows users to report their plantation activities, contributing to a community-driven green movement.


**Live API URL**: [https://green-bangladesh-api.vercel.app](https://green-bangladesh-api.vercel.app)

---

## 🚀 Features

- **Dynamic Environmental Zoning**: Automatically calculates environmental health scores (Red, Orange, Green) for districts based on tree density.
- **Secure Authentication**: Built with **Better Auth**, supporting session management, token rotation, social login (Google), email verification, and password recovery.
- **District Leaderboard**: Ranks districts by total trees planted to foster healthy environmental competition.
- **Plantation Tracker**: Allows users to log plant location, tree count, and date.
- **Admin Dashboard**: Comprehensive management tools for admins to update district metrics, moderate reports, and manage user roles/status.
- **Role-Based Access Control (RBAC)**: Secure separation between regular users and platform administrators.

---

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Email**: [Nodemailer](https://nodemailer.com/) with [EJS Templates](https://ejs.co/)
- **Validation**: [Zod](https://zod.dev/)

---

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (preferred) or npm/yarn
- **PostgreSQL** instance

---

## ⚙️ Project Setup

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd green-bangladesh
pnpm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and configure the following variables:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/green_bangladesh"
NODE_ENV="development"

# Authentication
BETTER_AUTH_SECRET="your-secret-here"
BETTER_AUTH_URL="http://localhost:5000/api/auth"
BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN="1d"
FRONTEND_URL="http://localhost:3000"

# JWT (Legacy/Additional Security)
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_ACCESS_EXPIRES_IN="1d"
JWT_REFRESH_EXPIRES_IN="7d"

# Admin Credentials
ADMIN_EMAIL="admin@greenbangladesh.gov"
ADMIN_PASSWORD="secure-password"

# SMTP Configuration
EMAIL_SENDER_SMTP_HOST="smtp.example.com"
EMAIL_SENDER_SMTP_PORT=465
EMAIL_SENDER_SMTP_USER="user@example.com"
EMAIL_SENDER_SMTP_PASS="pass"
EMAIL_SENDER_SMTP_FROM="noreply@greenbangladesh.com"

# Google Auth
GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="xxx"
GOOGLE_CALLBACK_URL="http://localhost:5000/api/auth/callback/google"
```

### 3. Database Migration & Seeding
Initialize the database and seed the 64 districts:

```bash
pnpm prisma migrate dev
pnpm prisma generate
pnpm seed:admin # Creates initial admin user
pnpm db:seed    # Seed initial district data
```

### 4. Running the Project
Start the development server:

```bash
pnpm dev
```

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── errors/           # Custom error classes and handlers
│   ├── helpers/          # Utility functions (JWT, Email, Cookie)
│   ├── interfaces/       # Shared TypeScript interfaces
│   ├── lib/              # Library initializations (Prisma, Better Auth)
│   ├── middleware/       # Express middlewares (Auth, Error Handling)
│   ├── modules/          # Feature domains (User, Auth, Districts, etc.)
│   │   └── [module]/
│   │       ├── [module].controller.ts
│   │       ├── [module].service.ts
│   │       ├── [module].routes.ts
│   │       └── [module].validation.ts
│   ├── routes/           # Central route registration
│   ├── shared/           # Common utilities (catchAsync, sendResponse)
│   └── views/            # Email templates (EJS)
├── config/               # Environment configuration
├── server.ts             # Server entry point
└── app.ts                # App initialization
```

---

## 📡 API Overview

### 🔐 Authentication (`/api/auth`)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/register` | POST | Register a new user | No |
| `/login` | POST | Login and receive sessions/tokens | No |
| `/get-new-token` | POST | Refresh access tokens using refresh token | No |
| `/verify-email` | POST | Verify email using OTP | No |
| `/forgot-password` | POST | Request password reset OTP | No |
| `/reset-password` | POST | Reset password using OTP | No |
| `/change-password` | POST | Update user password | Yes |
| `/logout` | POST | Terminate current session | Yes |

### 👤 User Management (`/api/users`)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/me` | GET | Retrieve own profile details | USER / ADMIN |
| `/me` | PATCH | Update shared profile fields (name, bio, avatar) | USER / ADMIN |
| `/me` | DELETE | Deactivate/Delete own account | USER / ADMIN |

### 🗺️ Districts (`/api/districts`)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/` | GET | List all 64 districts with calculated zones | No |
| `/:id` | GET | Retrieve specific district metrics | No |

### 🌱 Plantations (`/api/plantations`)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/` | POST | Submit a new tree plantation report | USER / ADMIN |
| `/` | GET | View all plantation reports | USER / ADMIN |

### 🏆 Leaderboard (`/api/leaderboard`)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/` | GET | View districts ranked by plantation activity | No |

### 🛠️ Admin Operations (`/api/admin`)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/districts/:id` | PATCH | Update district environmental metrics | ADMIN |
| `/users` | GET | View all platform users with stats | ADMIN |
| `/users/:id/role` | PATCH | Promote/Demote user roles (USER/ADMIN) | ADMIN |
| `/users/:id/status` | PATCH | Change user status (ACTIVE/BLOCKED) | ADMIN |
| `/users/:id` | DELETE | Remove a user account permanently | ADMIN |
| `/admins` | GET | List all administrative accounts | ADMIN |
| `/profile` | PATCH | Update admin's own administrative profile | ADMIN |
| `/admins/:id` | DELETE | Remove an admin account | ADMIN |
| `/plantations` | GET | Monitor all community plantation reports | ADMIN |
| `/plantations/:id` | DELETE | Remove invalid or spam reports | ADMIN |

---

## 👨‍💻 Developed By

**Abdullah Ragib Toqi**

- **LinkedIn**: [abdullah-ragib-toqi-b5154a297](https://www.linkedin.com/in/abdullah-ragib-toqi-b5154a297/)
- **GitHub**: [AR-Toqi](https://github.com/AR-Toqi)

---

## 🛡️ License
ISC
