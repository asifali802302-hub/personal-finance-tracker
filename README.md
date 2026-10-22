# 🧾 Personal Finance Tracker

A full-stack, responsive Personal Finance Tracker built with **React**, **Tailwind CSS**, **Recharts**, **Spring Boot**, and **MongoDB Atlas**. It empowers users to monitor income, control expenses, visualize monthly spending trends, and manage their personal budget securely with JWT authentication.

---

## 🌟 Key Features

* **🔐 Secure JWT Authentication:** User registration and login with encrypted passwords (BCrypt) and stateless JWT token authorization.
* **💰 Income & Expense Management:** Full CRUD operations to log, categorize, and delete transactions with notes and dates.
* **📊 Visual Financial Analytics:**
  * **Interactive Pie Chart:** Category-wise breakdown of outgoing expenses (Food, Rent, Utilities, Shopping, etc.).
  * **Monthly Trend Bar Chart:** Side-by-side comparison of total Income vs. Expenses over time.
* **📈 Real-Time Budget Summary:** Live calculations of Net Balance, Total Inflow, and Total Outflow formatted in local currency (₹ INR).
* **🔍 Dynamic Filtering & Search:** Filter records by category, transaction type, or search by description in real-time.
* **📥 CSV Export:** One-click download of all transaction history for accounting and backups.
* **📱 Responsive Modern UI:** Mobile-first layout crafted with Tailwind CSS and dark mode aesthetics.

---

## 🧰 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Component architecture & fast client builds |
| **Styling** | Tailwind CSS v4 | Responsive utility-first modern styling |
| **Icons** | Lucide React | Crisp, modern UI icons |
| **Charts** | Recharts | SVG-based responsive data visualization |
| **Backend** | Spring Boot 3.3 (Java 21/25) | RESTful APIs & MVC architecture |
| **Security** | Spring Security 6 + JJWT | Bearer token authentication & authorization |
| **Database** | MongoDB Atlas (Cloud) | Scalable NoSQL document database |
| **Notifications** | React Hot Toast | Real-time user feedback and alerts |

---

## 📁 Project Structure

```text
personal-finance-tracker/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Navbar, StatsCards, SpendingCharts, TransactionList, Modal
│   │   ├── context/            # AuthContext (JWT management & session persistence)
│   │   ├── pages/              # AuthPage, DashboardPage
│   │   ├── services/           # Axios API service with Bearer interceptors
│   │   ├── App.jsx             # Root routing and state provider
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Spring Boot Backend
    ├── src/main/java/com/tracker/
    │   ├── controller/         # AuthController, TransactionController
    │   ├── dto/                # Request & Response Data Transfer Objects
    │   ├── model/              # MongoDB Documents (User, Transaction)
    │   ├── repository/         # MongoRepository interfaces
    │   ├── security/           # JWT Utils, Filter, SecurityConfig
    │   ├── service/            # Transaction & Aggregation business logic
    │   └── PersonalFinanceApplication.java
    ├── src/main/resources/
    │   └── application.properties # MongoDB Atlas URI & JWT secrets
    └── pom.xml
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
* **Node.js** (v18+)
* **Java Development Kit** (JDK 17 or higher)
* **Apache Maven** (v3.8+)
* Free **MongoDB Atlas** account (or local MongoDB)

---

### 2. Backend Setup (`server/`)

1. Open PowerShell / Terminal and navigate to the backend folder:
   ```bash
   cd server
   ```

2. Configure your MongoDB connection in `src/main/resources/application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@cluster0.flc9vmi.mongodb.net/personal_finance?retryWrites=true&w=majority
   jwt.secret=5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437
   jwt.expiration=86400000
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   *The backend will boot up at `http://localhost:8080`.*

---

### 3. Frontend Setup (`client/`)

1. Open a second terminal window and navigate to the frontend folder:
   ```bash
   cd client
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run at `http://localhost:5173`.*

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)
* `POST /api/auth/register` - Create a new user account (returns JWT token).
* `POST /api/auth/login` - Authenticate with email & password (returns JWT token).
* `GET /api/auth/me` - Retrieve current authenticated user profile.

### 💰 Transactions (`/api/transactions`) *(Requires `Authorization: Bearer <token>`)*
* `GET /api/transactions` - Fetch all transactions for the logged-in user (ordered by date desc).
* `POST /api/transactions` - Create a transaction (`title`, `amount`, `type`, `category`, `date`, `notes`).
* `DELETE /api/transactions/{id}` - Delete a transaction by ID.
* `GET /api/transactions/summary` - Aggregate total income, total expense, net balance, category breakdown, and monthly cash flow.

---

## 🌐 Deployment Instructions

### Frontend (Vercel)
1. Push the project to GitHub.
2. Link your repository in [Vercel](https://vercel.com).
3. Set the **Root Directory** to `client`.
4. Add environment variable `VITE_API_URL` pointing to your deployed backend URL.
5. Click **Deploy**!

### Backend (Render or Railway)
1. In [Render](https://render.com) or [Railway](https://railway.app), create a new **Web Service**.
2. Connect your repository and select the `server` root directory.
3. Build Command: `mvn clean package -DskipTests`
4. Start Command: `java -jar target/personal-finance-server-0.0.1-SNAPSHOT.jar`
5. Set environment variables for `SPRING_DATA_MONGODB_URI` and `JWT_SECRET`.
