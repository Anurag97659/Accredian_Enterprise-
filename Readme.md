# Accredian Enterprise Platform

> **A Modern Full-Stack Enterprise Training & Upskilling Platform**  
> Building the bridge between organizational talent needs and transformative learning experiences.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Approach & Architecture](#approach--architecture)
- [AI Usage & Workflow](#ai-usage--workflow)
- [Features Implemented](#features-implemented)
- [Future Improvements](#future-improvements)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

**Accredian Enterprise** is a full-stack web platform designed for corporate training delivery. The platform enables:

✅ **User Authentication & Authorization** — Secure JWT-based auth with email verification  
✅ **Account Management** — Profile editing, password changes, account deletion  
✅ **Responsive UI** — Mobile-first design with Tailwind CSS v4  
✅ **Enterprise Enquiries** — Mini-form modal for training program inquiries  
✅ **Role-based Access** — Authenticated routes with middleware protection  

---

## Tech Stack

### **Frontend**

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.2.4 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS | 4.x |
| **HTTP Client** | Fetch API | Native |
| **Font Management** | Google Fonts (Sora, Source Sans 3) | Latest |

### **Backend**

| Component | Technology | Version |
|-----------|-----------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express.js | 4.x |
| **Database** | MongoDB | 5.x+ |
| **ODM** | Mongoose | 8.x |
| **Authentication** | JWT (jsonwebtoken) | 9.x |
| **Password Hashing** | bcrypt | 5.x |
| **Email Service** | Nodemailer | 6.x |
| **Environment** | dotenv | 16.x |
| **CORS** | cors | 2.8.x |

---

## Setup Instructions

### **Prerequisites**

- **Node.js** v18+ and **npm** v9+
- **MongoDB** instance (local or cloud: MongoDB Atlas)
- **Git** for version control

### **1️⃣ Backend Setup**

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file in Backend/ directory
cat > .env << EOF
# Server
PORT=8000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/
DB_NAME=Accredian

# Tokens
ACCESS_TOKEN_SECRET=your_access_token_secret_key_min_32_chars
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_min_32_chars
REFRESH_TOKEN_EXPIRY=7d

# Frontend & API
FRONTEND_URL=http://localhost:3000
API=http://localhost:3000

# SMTP (Email Configuration)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
EOF

# Start backend server
npm run dev
# Server runs on: http://localhost:8000
```

### **2️⃣ Frontend Setup**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file in frontend/ directory
cat > .env.local << EOF
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
EOF

# Start development server
npm run dev
# Application runs on: http://localhost:3000
```

### **3️⃣ Database Setup**

```bash
# Option A: Local MongoDB
mongod

# Option B: MongoDB Atlas (Cloud)
# 1. Create cluster at https://www.mongodb.com/cloud/atlas
# 2. Get connection string
# 3. Update MONGODB_URI in .env
```

---

## Approach & Architecture

### **Design Philosophy**

The platform follows a **client-server architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────┐
│         Frontend (Next.js 16 + React)       │
│  ├─ Auth Pages (login, register, verify)    │
│  ├─ Account Pages (edit details, password)  │
│  ├─ Landing Page with Navbar                │
│  └─ Modal Forms (Enquire Now)               │
└────────────┬────────────────────────────────┘
             │ HTTPS/REST API
             ↓
┌─────────────────────────────────────────────┐
│        Backend (Express.js + Node.js)       │
│  ├─ User Controller (auth, profile)         │
│  ├─ Auth Middleware (JWT verification)      │
│  ├─ Error Handling (structured responses)   │
│  └─ Email Service (verification, reset)     │
└────────────┬────────────────────────────────┘
             │ Mongoose ODM
             ↓
┌─────────────────────────────────────────────┐
│       MongoDB (NoSQL Database)              │
│  ├─ users collection (auth, profile)        │
│  └─ indexes (username, email uniqueness)    │
└─────────────────────────────────────────────┘
```

### **Authentication Flow**

1. **Registration** → User submits form → Backend validates → Password hashed (bcrypt) → Email verification link sent
2. **Email Verification** → User clicks link → Frontend calls `/verify-email` → Account activated
3. **Login** → Credentials validated → Access & Refresh tokens generated → Stored in secure HTTP-only cookies
4. **Protected Routes** → JWT verified via middleware → User data populated
5. **Logout** → Tokens cleared from cookies → localStorage cleaned

### **State Management**

- **Frontend Auth State**: Stored in `localStorage` (with `auth-changed` event broadcast)
- **Backend Session**: JWT tokens in HTTP-only cookies (CORS-enabled)
- **User Profile Cache**: Synced on every auth change

### **Error Handling**

| Scenario | Response | Status |
|----------|----------|--------|
| Duplicate username/email | Clean JSON error | 409 |
| Invalid credentials | Structured message | 401 |
| Unverified email | Friendly error | 403 |
| Server errors | JSON error handler | 500 |

---

## 🤖 AI Usage & Workflow

#### **1. Debugging**
- Traced MongoDB duplicate key errors to missing uniqueness checks before `findByIdAndUpdate`
- Fixed Express error handler returning HTML instead of JSON — added middleware to catch unhandled errors
- Diagnosed email verification link host mismatch by checking backend env vars
- Debugged auth state sync issues by recommending `auth-changed` custom event pattern for cross-page updates

#### **2. Testing**
- Recommended Jest for backend unit tests (password hashing, token generation, uniqueness validation)
- Suggested Supertest for API integration tests (full auth flows: register → verify → login)
- Advised React Testing Library for frontend component tests (form submissions, error handling)
- Proposed Cypress for E2E tests covering complete user journeys (signup to account management)

#### **3. UI/UX Suggestions**
- Separated settings gear button (⚙️) from username pill for better mobile affordance
- Increased dropdown panel size with larger touch targets (48px minimum) for accessibility
- Recommended underline-only form inputs with border-bottom for clean, modern aesthetic
- Suggested modal side-by-side layout (image on left, form on right) for visual balance
- Color-coded destructive actions (Delete Account in red) for intuitive warning signals

---

## Features Implemented

### **Authentication**

```
✓ User Registration with validation
✓ Email verification via token link
✓ JWT-based login with dual tokens (access + refresh)
✓ Secure password hashing with bcrypt
✓ Automatic token refresh on expiry
✓ Logout with cookie cleanup
```

### **Account Management **

```
✓ View and edit profile details (username, email, full name, address)
✓ Change password with old-password validation
✓ Delete account with confirmation
✓ Settings dropdown menu (⚙️) in navbar
✓ Real-time auth state sync across pages
```

### **UI/UX )**

```
✓ Responsive navbar with auth status display
✓ Mobile-friendly dropdown menus
✓ Enquire Now modal form with 12 domain options
✓ Landing page with 8+ sections (stats, clients, FAQs, testimonials)
✓ Form validation with user-friendly errors
✓ Loading states and success messages
```

### **API Endpoints (🔌)**

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/register` | POST | ❌ | Register new user |
| `/login` | POST | ❌ | Authenticate & get tokens |
| `/verify-email` | GET | ❌ | Activate email |
| `/logout` | POST | ✅ | Clear session |
| `/me` | GET | ✅ | Get current user profile |
| `/updatedetails` | POST | ✅ | Edit profile fields |
| `/changepassword` | POST | ✅ | Update password |
| `/deleteuser` | POST | ✅ | Remove account |
| `/getusername` | GET | ✅ | Fetch username only |

---

## 🚀 Future Improvements

### **Short Term (1-2 weeks)**

- [ ] **Enquiry Backend Endpoint** — Save form submissions to DB with email notifications
- [ ] **Password Reset Flow** — Forgot password → email link → new password setup
- [ ] **Email Templates** — HTML emails with branding for verification & password reset
- [ ] **Form Validation** — Client-side schema validation (Zod/Yup) before submission
- [ ] **Loading Indicators** — Skeleton screens during data fetch

### **Medium Term (1 month)**

- [ ] **Admin Dashboard** — View users, manage programs, track enquiries
- [ ] **Program Management** — CRUD for training programs with pricing
- [ ] **Batch Enrollment** — Users enroll in programs, track progress
- [ ] **Payment Integration** — Stripe/Razorpay for subscription handling
- [ ] **User Search & Filters** — Find programs by domain, delivery mode, price
- [ ] **Analytics Dashboard** — Enrollment trends, revenue charts

### **Long Term (2-3 months)**

- [ ] **Learning Management System (LMS)** — Video uploads, assignments, certificates
- [ ] **Mentor Matching** — AI-powered mentor assignment for programs
- [ ] **Mobile App** — React Native or Flutter for iOS/Android
- [ ] **Real-time Notifications** — WebSocket support for live updates
- [ ] **Microservices** — Separate services for payments, emails, analytics
- [ ] **CI/CD Pipeline** — GitHub Actions for automated testing & deployment
- [ ] **Database Optimization** — Indexing, query optimization, caching layer (Redis)
- [ ] **Internationalization (i18n)** — Multi-language support (Hindi, Spanish, French)

### **Technical Debt**

- [ ] Add comprehensive unit & integration tests (Jest, Supertest)
- [ ] Implement request rate limiting to prevent abuse
- [ ] Add input sanitization & SQL injection prevention
- [ ] Improve error logging with centralized service (Sentry, LogRocket)
- [ ] Add API versioning for backward compatibility
- [ ] Refactor large components into smaller, reusable units

---

## Project Structure

```
Accredian Enterprise/
│
├── Backend/
│   ├── src/
│   │   ├── app.js                          # Express app setup & middleware
│   │   ├── index.js                        # Server entry point
│   │   ├── controller/
│   │   │   └── user.controller.js          # Auth & profile logic
│   │   ├── routes/
│   │   │   └── user.routes.js              # API endpoint definitions
│   │   ├── models/
│   │   │   └── user.model.js               # MongoDB schema & methods
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js          # JWT verification
│   │   ├── db/
│   │   │   └── db.js                       # MongoDB connection
│   │   └── utils/
│   │       ├── ApiError.js                 # Error class
│   │       ├── ApiResponse.js              # Response formatter
│   │       ├── asyncHandler.js             # Try-catch wrapper
│   │       └── mail.service.js             # Email sending
│   ├── .env                                # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx                    # Landing page + Enquire modal
│   │   │   ├── layout.tsx                  # Root layout
│   │   │   ├── login/page.tsx              # Login page
│   │   │   ├── register/page.tsx           # Registration page
│   │   │   ├── verify-email/page.tsx       # Email verification page
│   │   │   ├── account/
│   │   │   │   ├── details/page.tsx        # Edit profile
│   │   │   │   └── password/page.tsx       # Change password
│   │   │   └── api/
│   │   │       └── testimonials/route.ts   # Mock testimonials API
│   │   ├── components/
│   │   │   ├── Navbar.tsx                  # Navigation + auth dropdown
│   │   │   ├── Footer.tsx                  # Footer section
│   │   │   ├── LogoCarousel.tsx            # Partner logos carousel
│   │   │   ├── SectionHeading.tsx          # Reusable heading component
│   │   │   └── Testimonials.tsx            # Testimonials section
│   │   ├── lib/
│   │   │   └── auth.ts                     # Auth API helpers
│   │   └── globals.css                     # Global styles
│   ├── .env.local                          # Frontend environment vars
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md                               # This file
```

---

## Security Measures

✅ **Password Security** — Bcrypt with 10 salt rounds  
✅ **Token Security** — JWT with short expiry + refresh token rotation  
✅ **HTTP-Only Cookies** — Prevent XSS attacks on tokens  
✅ **CORS Configuration** — Whitelist localhost:3000 only  
✅ **Input Validation** — Schema validation on all endpoints  
✅ **Email Verification** — Prevent automated account creation  
✅ **Unique Constraints** — MongoDB indexes on username & email  
✅ **Error Sanitization** — No sensitive data in error responses  

---

## Performance Considerations

| Metric | Target | Implementation |
|--------|--------|-----------------|
| **Page Load** | < 3s | Optimized images, minified CSS |
| **API Response** | < 200ms | Database indexing, efficient queries |
| **Bundle Size** | < 200KB | Tree-shaking, code splitting |
| **Time to Interactive** | < 2s | Lazy loading, Next.js optimization |

---

## 🧪 Testing Recommendations

### **Backend Testing** (Jest + Supertest)

```javascript
// Example: Test user registration
describe('POST /register', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/AccredianEnterprise/v1/users/register')
      .send({ username: 'test', email: 'test@example.com', password: 'Test123!@' });
    
    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe('test@example.com');
  });
});
```

### **Frontend Testing** (Vitest + React Testing Library)

```typescript
// Example: Test login form
describe('LoginPage', () => {
  it('should submit form and redirect on success', async () => {
    render(<LoginPage />);
    const button = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(button);
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
```

---

## 🚢 Deployment

### **Backend (Render.com)**

```bash
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]
```
### **Frontend (Vercel)**

```bash
# Automatic deployment from GitHub
# Set environment variables in Vercel dashboard
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### **Database (MongoDB Atlas)**

- Create cluster in MongoDB Atlas
- Configure IP whitelist
- Set up automated backups

---

##  License

This project is proprietary software for Accredian Enterprise. All rights reserved.

---


