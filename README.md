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

## 📸 Project Screenshots

> Upload images to GitHub issues or Imgur, then replace these example image URLs.

| Homepage | Dashboard |
|---------|-----------|
| ![Homepage Screenshot]([https://via.placeholder.com/450x250](https://i.ibb.co.com/KjQdsLZc/zap-shift-home.png)) | ![Dashboard Screenshot](https://via.placeholder.com/450x250) |

| Mobile Responsive | Booking Page |
|---------|-----------|
| ![Mobile View](https://via.placeholder.com/450x250) | ![Booking Page](https://via.placeholder.com/450x250) |

---

## 🧩 System Architecture Diagram

```mermaid
flowchart LR
User[Client / User] -->|HTTP Requests| Frontend[React App]
Frontend -->|Auth + CRUD| Backend[Express Server]
Backend -->|Query / Store| Database[(MongoDB Atlas)]
