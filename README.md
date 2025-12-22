# BookMySeat Frontend

This is the **frontend** of the BookMySeat application, built with **React**, **React Router**, and **React Query**. It allows users to browse tickets, request bookings, and manage their account. Admins can approve or reject booking requests.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Folder Structure](#folder-structure)  
- [Available Scripts](#available-scripts)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Demo

Live demo: [https://book-my-seat-77125.web.app/](https://book-my-seat-77125.web.app/)

---

## Features

- User registration and login with protected routes  
- Browse available tickets  
- Request bookings and view booking status  
- Admin dashboard to accept or reject booking requests  
- Real-time notifications using `react-hot-toast`  
- Responsive and mobile-friendly UI  

---

## Tech Stack

- **React** - Frontend library  
- **React Router** - Routing  
- **React Query** - Data fetching and caching  
- **Axios** - API requests  
- **Tailwind CSS** - Styling  
- **react-hot-toast** - Notifications  

---

## Getting Started

### Prerequisites

- Node.js (>= 18.x recommended)  
- npm or yarn  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/bookmyseat-frontend.git
cd bookmyseat-frontend
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Create a .env file in the root (if needed) and add your API URL:

ini
Copy code
VITE_API_BASE_URL=http://localhost:5000
Run the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open http://localhost:5173 to view it in your browser.


git clone https://github.com/your-username/bookmyseat-frontend.git
cd bookmyseat-frontend
