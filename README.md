<h2 align="center"> ProFast | A Professional Parcel Booking and Delivery Management System</h2>

<p align="center">
A full-stack solution built for booking, managing, and providing professional parcel booking and delivery services.
</p>

---

## 🔗 Live Links

| Type | URL |
|------|-----|
| 🌍 Live Site | https://zap-shift-64d7f.web.app/ |
| 🛠️ Backend API | https://zap-shift-server-indol.vercel.app/ |

---

## 📌 Short Project Description

ProFast is a dynamic full-stack Parcel Booking and Delivery Management System built to streamline modern courier operations. Customers can easily book parcels online, schedule pickup, track delivery progress in real-time, and manage their shipment orders efficiently. Delivery agents can access assigned parcels, update status during transit, and complete deliveries with proper verification. 

Administrators oversee the entire logistics flow, including agent assignments, parcel routing, warehouse forwarding, and user management through an advanced role-based dashboard. 

From booking to doorstep delivery, ProFast ensures fast, secure, and reliable logistics automation for users and delivery service providers.


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
| 👤 User / Customer | Book parcels, Browse booking list, online pay, track parcel status, see assigned rider |
| 🧑‍💼 Rider | See assigned parcel, manage parcel status, update progress, earning reports |
| 👑 Admin | Full control: manage users, approve riders, modify any data |

---

## 🧩 Dashboard Overview

### Rider Dashboard
✔ Booking requests list  
✔ Approve / Reject / Complete parcels  
✔ Earning summary  
✔ Can see full overview

### User Dashboard
✔ View booking history  
✔ Secure payments  
✔ Cancel bookings  
✔ Parcel tracking

### Admin Dashboard
✔ Manage users  
✔ Approve riders / Reject riders / see verified riders
✔ Mnage role
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

A visual walkthrough of the ProFast interface and features.

<div align="center">

| Admin Overview | Client Overview | Rider Assign |
|----------|--------------|----------------|
<img src="https://i.ibb.co.com/GQ12HkMw/screencapture-zap-shift-64d7f-web-app-dashboard-2025-10-25-20-40-45.png" width="300"/> | <img src="https://i.ibb.co.com/M5Wbd9zQ/screencapture-zap-shift-64d7f-web-app-dashboard-2025-10-25-20-42-26.png" width="300"/> | <img src="https://i.ibb.co.com/Xf0FgM9T/rider-assign.png" width="300"/> |

| Parcel Tracking | Parcel Details | Coverage Map |
|--------------|-----------|-----------------|
| <img src="https://i.ibb.co.com/ynD9tRQc/screencapture-zap-shift-64d7f-web-app-dashboard-track-Parcel-TRK063158-2025-10-25-20-43-21.png" width="300"/> | <img src="https://i.ibb.co.com/xtxdRTvX/screencapture-zap-shift-64d7f-web-app-dashboard-my-Parcels-2025-10-25-20-53-18.png" width="300"/> | <img src="https://i.ibb.co.com/svZgfw9X/screencapture-zap-shift-64d7f-web-app-coverage-2025-10-25-20-54-23.png" width="300"/> |

| Parcel Booking | Rider List | Rider Apply Form |
|--------------|-----------|-----------------|
| <img src="https://i.ibb.co.com/Vc1f8kt9/booking.png" width="300"/> | <img src="[https://i.ibb.co.com/xtxdRTvX/screencapture-zap-shift-64d7f-web-app-dashboard-my-Parcels-2025-10-25-20-53-18.png](https://i.ibb.co.com/35tHZpdb/rider-list.png)" width="300"/> | <img src="https://i.ibb.co.com/993VX4kh/rider-apply-form.png" width="300"/> |

||||||||||||||||||||||||| Home Page ||||||||||||||||||||||||||
| <img src="https://i.ibb.co.com/KjQdsLZc/zap-shift-home.png" width="900"/> |

</div>
---

## 🚚 Parcel Delivery Workflow

This diagram shows the step by step journey of a parcel inside the ProFast system.

```mermaid
flowchart TD
    A[📦 Agent Collects Parcel] --> B{🏙️ Within Same City?}
    B -- ✅ Yes --> C[🚚 Direct Delivery by Agent]
    B -- ❌ No --> D[🏭 Send to Central Warehouse]
    D --> E[✈️ Dispatch to Destination City]
    E --> F[🧑‍💼 Admin Assigns Local Delivery Agent]
    F --> G[🚚 Final Delivery to Customer]
