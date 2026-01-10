# React + Vite

# 🛍️ Maaashi | Classified Ads Platform

**Maaashi** is a web application inspired by the Saudi platform _Haraj_, where users can post and browse advertisements for products or services in an easy and organized way.
# [live demo](https://masihe-web-e2m.vercel.app/).
<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <img src="./public/preview/maaashi.webp" style="width: 100%;"/>
</div>
---

## 🚀 Features

- 🔐 **Authentication System**  
   Users can register, log in, and manage their accounts securely.
  - **📸 Preview**
<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <img src="./public/preview/register.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/login.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/forgotPassword.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
</div>

- 👤 **User Profile**  
  Each user has a personal profile page where they can view and manage their posted ads and personal information.
  - **📸 Preview**
<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <img src="./public/preview/UserProfile.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/UserProfile-faveorit.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/UserProfile-setting.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/UserProfile-location.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/UserProfile-deleteAcount.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
</div>

- 📝 **Post Advertisements**  
  After creating an account, users can add their own ads with product details and images.
  - **📸 Preview**
<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">
  <img src="./public/preview/Advertisements-category.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/Advertisements-informaiton.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/Advertisements-images.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/Advertisements-seller.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
  <img src="./public/preview/Advertisements-conferm.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 220px; object-fit: cover;"/>
</div>

- 🗂️ **Category-Based Browsing**  
  Users can browse and filter ads based on specific categories (e.g., Cars, Electronics, Real Estate, etc.).
  - **📸 Preview**
<div align="center">
  <img src="./public/preview/SpecificCategory.webp" style="width: 100%;"/>
</div>

- 👀 **View Ad Details**  
  Each ad includes full information such as title, price, location, and seller info.
  - **📸 Preview**
<div align="center">
  <img src="./public/preview/detailes-ad.webp" style="width: 100%;"/>
</div>

- 📱 **Responsive UI**  
  The website is fully responsive and works seamlessly across all devices.
  - **📸 Preview**
<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px;">
  <img src="./public/preview/maaashi-mobile-1.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 600px; object-fit: cover;"/>
  <img src="./public/preview/maaashi-mobile-2.webp" style="width: 45%; min-width: 280px; max-width: 400px; height: 600px; object-fit: cover;"/>
</div>

- ⚡ **Smooth User Experience**  
  Built with reusable components and clean UI interactions.

---

## 🧠 Tech Stack

| Area             | Technology          |
| ---------------- | ------------------- |
| Front-End        | React.js + Vite     |
| Styling          | CSS                 |
| State Management | Context API         |
| Routing          | React Router        |
| Notifications    | Custom Toast System |
| Hosting          | Vercel              |

---

## 📂 Project Structure

Maaashi/

├── src/

│ ├── Components/

│ ├── Pages/

│ ├── Context/

│ ├── Assets/

│ └── App.jsx

├── public/

└── package.json

---

## 💡 How It Works

1. User registers or logs in.
2. After authentication, they can add new ads through a multi-step **Wizard Form**.
3. Each ad is categorized (e.g., Cars, Phones, Furniture).
4. Users can filter and browse ads by category.
5. Users can view detailed information about any ad, including seller info and location.

---

## 🧰 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/your-username/maaashi.git

# Navigate to project folder
cd maaashi

# Install dependencies
npm install

# Start the development server
npm run dev
```
