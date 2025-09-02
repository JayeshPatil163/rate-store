# RateStore - Store Rating Platform

RateStore is a full-stack web application designed as a platform for users to submit and view ratings for various stores. The application features a complete authentication system and role-based access control, providing distinct dashboards and functionalities for System Administrators, Store Owners, and Normal Users.

---

## ✨ Key Features

* **Role-Based Access Control**: Three distinct user roles (Admin, Store Owner, Normal User) with unique permissions.
* **JWT Authentication**: Secure and stateless authentication for all users.
* **Interactive Dashboards**: Custom dashboards tailored to the needs of each user role.
* **Dynamic Filtering & Sorting**: All data tables support live filtering and column sorting.
* **Light/Dark Theme**: A theme toggle for user preference and accessibility.
* **Responsive Design**: A modern, responsive UI built with Tailwind CSS.

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite), Tailwind CSS, Axios
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **ORM**: Prisma

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
* [Node.js](https://nodejs.org/) (v18.x or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [PostgreSQL](https://www.postgresql.org/download/)

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd <repository-folder>
```
2. Backend Setup
First, set up and run the backend server.

Navigate to the Backend Directory:

```bash

cd Backend
```
Install Dependencies:
```bash

npm install
```
Set Up Environment Variables:
Create a new file named .env in the Backend directory and add the following content. Make sure to replace the placeholder with your PostgreSQL connection string.

Code snippet
```bash
# .env.example
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/ratestore"
JWT_SECRET=yourSuperSecretKey123
```
You must create a new PostgreSQL database named ratestore for this to work.

Run Database Migration:
This command will set up your database schema based on the Prisma model.

```bash
npx prisma migrate dev
```
Start the Backend Server:

```bash

npm run dev
```
The backend server should now be running on http://localhost:8080.

3. Frontend Setup
Open a new terminal window to set up and run the frontend.

Navigate to the Frontend Directory:
Make sure to navigate to the correct subfolder.

```bash

cd Frontend/rate-store
```
Install Dependencies:

```bash

npm install
```
Start the Frontend Development Server:

```bash

npm run dev
```
The React application should now be running on http://localhost:5173 (or another port if 5173 is busy).

📋 Usage
Open the application in your browser (e.g., http://localhost:5173).

From the landing page, click "Sign Up" or "Register" to create a Normal User account.

Once registered, you will be logged in and redirected to the /stores dashboard where you can view and rate stores.

To create an Admin account, you must use an API client (like Postman or Thunder Client) to hit the initial setup endpoint, as public admin registration is disabled for security.

Endpoint: POST http://localhost:8080/api/auth/add-initial-admin

Body: { "name": "Your Full Admin Name Here", "email": "admin@example.com", "password": "Password!123", "address": "Admin Address" }

Once the Admin is created, you can log in with those credentials to access the Admin Dashboard. From there, you can create Store Owner accounts.
