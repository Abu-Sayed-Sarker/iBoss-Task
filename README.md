# iBoss-Task Frontend - Premium Online Test Management System

A state-of-the-art, responsive web application for managing assessment workflows. This frontend provides a seamless interface for administrators to design tests and for candidates to participate in real-time, timed examinations.

---

## 🔗 Demo & Documentation

- **Live Swagger API Docs**: [Interactive API Documentation](http://76.13.195.67:5001/api/docs/)
- **Admin Demo Credentials**:
  - **Email**: `admin@mail.com`
  - **Password**: `adminPassword123`

---

## ✨ Key Features

### 🏢 Unified Dashboard
- **Role-Based Views**: Dynamic interface that adapts automatically for `Admin` and `User` roles.
- **Smart Test Cards**: Interactive cards displaying test duration, question count, and negative marking rules.
- **Submission Tracking**: Real-time status indicators (e.g., "Submitted" vs. "Start") to prevent duplicate attempts.

### 🛠 Admin Command Center
- **Multi-Step Test Creation**: An intuitive workflow for drafting test metadata (Basic Info) followed by detailed question sets.
- **Dynamic Question Management**: Full control over examination content with a powerful modal-based editor.
- **Metadata Summary**: A dedicated management portal to review test statistics and candidate performance at a glance.

### ⏱ Premium Exam Terminal (Candidate Experience)
- **Live Sync Timer**: Persistent countdown timer with automatic exam finalization upon expiration.
- **Smart Navigation**: Question-by-question flow with "Skip" and "Save & Continue" capabilities.
- **Instant Persistence**: Every answer is synchronized with the backend in real-time to prevent data loss.
- **Personalized Completion**: Custom success states and timeout modals tailored to the user's profile.

### ⚡ Technical Excellence
- **Next.js 15+ (App Router)**: Utilizing server-side rendering and client-side transitions for maximum performance.
- **Redux Toolkit & RTK Query**: Advanced state management with automated caching, polling, and invalidation.
- **Rich Aesthetics**: A premium design system featuring glassmorphism, smooth micro-animations, and a professional color palette.

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Quality of Life**: [React Hot Toast](https://react-hot-toast.com/), [Lucide](https://lucide.dev/)

---

## 🔗 Related Repositories

- **Backend (API)**: [iBoss-Task Backend](https://github.com/Abu-Sayed-Sarker/iBoss-Task-Backend.git)

---

## ⚙️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Abu-Sayed-Sarker/iBoss-Task.git
cd iBoss-Task
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🏗 Project Structure

- **`/app`**: Next.js 15 App Router routes and page definitions.
- **`/apis`**: RTK Query service definitions (Tests, Questions, Exams).
- **`/components`**: Reusable UI components (Modals, Navbars, Cards).
- **`/features`**: Redux slices and auth logic.
- **`/store`**: Centralized Redux store configuration.
- **`/utils`**: Helper functions for cookies and formatting.

---

## 🛣 Application Flow

### Admin Workflow
1. **Login** -> **Dashboard** -> **Create Online Test**.
2. **Step 1**: Enter basic info (Title, Time Slots, Duration).
3. **Step 2**: Add/Edit MCQ questions with point values.
4. **Finalize**: Review the "Manage Test" summary page.

### Candidate Workflow
1. **Login** -> **Dashboard** -> **Start Exam**.
2. **Participation**: Answer questions sequentially; progress is auto-saved.
3. **Completion**: View success screen or handle timeout modal effortlessly.

---

## 👤 Author

**Abu Sayed Sarker**
- GitHub: [@Abu-Sayed-Sarker](https://github.com/Abu-Sayed-Sarker)
- Portfolio: [abusayedsarker.com](https://abusayedsarker.com)

---

## ⚖️ License
This project is part of a specific technical assessment and is not for commercial redistribution.
