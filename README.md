<h1 align="center">🚀 ProFast | A Professional Services Management Platform</h1>

<p align="center">
A full-stack solution built for booking, managing, and providing professional services with ease.
</p>

---

## 🔗 Live Links

| Type | URL |
|------|-----|
| 🌍 Live Site | https://zap-shift-64d7f.web.app/ |
| 🛠️ Backend API | https://zap-shift-server-indol.vercel.app/ |

---

## 📌 Short Project Description

ProFast is a dynamic full-stack web application designed to connect service providers and customers in a seamless, intuitive platform. Users can browse professional services, book appointments, pay securely, and track their orders in real time. Service providers can manage their bookings, update availability, and view financial insights through an optimized dashboard.

Whether you are a freelancer or a business, ProFast makes booking and managing professional services fast like lightning.

---

## ⭐ Key Features

✅ Authentication and Secure Role Management (Admin, Provider, Customer)  
✅ Automated Pricing & Tracking 
✅ Nationwide Coverage (64 districts) with location pointed map
✅ Transparent Commission Structure
✅ Browse & Filter Services Based on Category  
✅ Book Service With Real-Time Slot Validation  
✅ Provider Dashboard With Analytics  
✅ Manage Orders: Create, Update Status, Cancel  
✅ Secure Payment Integration (Stripe / Future Ready)  
✅ User Profile & Order History  
✅ Responsive UI for All Devices  
✅ Protected Routes for Dashboard Access  
✅ JWT-based API Security  
✅ Toast/Sweet Alert Notifications  
✅ Fully Deployed Frontend + Backend + Database

---

## 🎯 Roles & Permissions

| Role | Access & Features |
|------|-----------------|
| 👤 User / Customer | Browse services, book orders, pay, track status, review history |
| 🧑‍💼 Service Provider | Manage services, view bookings, update progress, earning reports |
| 👑 Admin | Full control: manage users, approve providers, modify any data |

---

## 🧩 Dashboard Overview

### Provider Dashboard
✔ Booking requests list  
✔ Approve / Reject / Complete services  
✔ Earning summary  
✔ Add new services

### User Dashboard
✔ View booking history  
✔ Secure payments  
✔ Cancel bookings  
✔ Edit profile

### Admin Dashboard
✔ Manage users  
✔ Global booking overview  
✔ Admin-only privileged actions

---

## 🧪 Hard Challenges Solved

🔒 Implementing **role-based authentication** using JWT  
📊 Building **dynamic dashboards** per user role  
🧩 Securing service booking system with real-time validation  
⚙️ Handling database relations for users, services, and orders  
🚀 Full deployment across multiple platforms (Firebase + Vercel)

---

## 🛠️ Technologies Used

### 🌐 Frontend
- React.js
- React Router
- Tailwind CSS
- DaisyUI
- Axios
- React Query / TanStack
- Firebase Authentication
- React Leaflet
- SweetAlert

### 🔙 Backend
- Node.js
- Express.js
- JSON Web Token (JWT)
- Stripe (if implemented)
- CORS middleware

### 🗄 Database
- MongoDB Atlas

### 🚀 Deployment & Tools
- Firebase Hosting (Frontend)
- Vercel (Backend)
- Git & GitHub
- Postman API testing

---

## 🖼️ Project Preview Gallery

A visual walkthrough of ProFast interface and features.

<div align="center">

| Home Page | Service List | Service Details |
|----------|--------------|----------------|
| <img src="https://via.placeholder.com/300x180" width="300"/> | <img src="https://i.ibb.co.com/GQ12HkMw/screencapture-zap-shift-64d7f-web-app-dashboard-2025-10-25-20-40-45.png" width="300"/> | <img src="https://i.ibb.co.com/M5Wbd9zQ/screencapture-zap-shift-64d7f-web-app-dashboard-2025-10-25-20-42-26.png" width="300"/> |

| Booking Flow | Dashboard | Mobile Responsive |
|--------------|-----------|-----------------|
| <img src="https://i.ibb.co.com/ynD9tRQc/screencapture-zap-shift-64d7f-web-app-dashboard-track-Parcel-TRK063158-2025-10-25-20-43-21.png" width="300"/> | <img src="https://i.ibb.co.com/xtxdRTvX/screencapture-zap-shift-64d7f-web-app-dashboard-my-Parcels-2025-10-25-20-53-18.png" width="300"/> | <img src="https://i.ibb.co.com/svZgfw9X/screencapture-zap-shift-64d7f-web-app-coverage-2025-10-25-20-54-23.png" width="300"/> |

</div>
---

## 📦 Parcel Delivery System Flow

This visual flow explains how parcels move inside the platform from pickup to delivery.


flowchart TD
    A[📦 Agent Collects Parcel] --> B{🏙️ Within Same City?}
    B -- ✅ Yes --> C[🚚 Agent Delivers Parcel]
    B -- ❌ No --> D[🏭 Sent to Warehouse]
    D --> E[✈️ Warehouse Dispatches to Destination]
    E --> F[🧑‍💼 Admin Assigns Delivery Agent]
    F --> G[🚚 Final Parcel Delivery to Customer]
