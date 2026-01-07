# SSR E-Commerce Product Management Dashboard

A full-stack Next.js application designed for administrators to manage product inventory efficiently. This dashboard features Server-Side Rendering (SSR) for fast load times and a robust MongoDB backend.

## 🚀 Features (Requirements Met)
* **Fast Page Load:** Utilizes Next.js Server Components for SSR.
* **Efficient Interface:** Full CRUD (Create, Read, Update, Delete) operations with instant UI updates.
* **Secure Access:** Restricted to eligible admins via Authentication.
* **Data Visualization:** Real-time inventory value and category charts.

## 🛠 Tech Stack
* **Frontend & Backend:** Next.js 15 (App Router)
* **Database:** MongoDB (via Mongoose)
* **Styling:** Tailwind CSS
* **Deployment:** Vercel

## 🔑 Admin Credentials (For Verification)
To access the dashboard, use the following dummy credentials:
* **Username:** manager
* **Password:** access2025

## ⚙️ Workflow
1.  **Request:** Admin accesses the secure URL.
2.  **Auth:** Middleware verifies eligibility.
3.  **Fetch:** Server connects to MongoDB to fetch latest product data (SSR).
4.  **Render:** Page is sent fully populated to the browser.
5.  **Interact:** Admin adds/updates products; server revalidates data instantly.