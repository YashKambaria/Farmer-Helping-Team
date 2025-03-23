# Farmer Helping Team 🌼

Farmer Helping Team is a **full-stack web application** designed to assist farmers with **alternative credit evaluation and resource planning**. Using **machine learning models, Gemini AI API, and advanced data analysis techniques**, this project empowers farmers by providing data-driven financial assessments and recommendations.

## 🌟 Features
- **AI-Powered Credit Scoring**: Uses **Gemini AI API** and **ML algorithms** for alternative credit evaluation.
- **Interactive UI**: Built with **React.js** and styled using **Tailwind CSS**.
- **Real-time Data Visualization**: Displays credit scores and financial insights dynamically using **Framer Motion, Chart.js, and D3.js**.
- **Secure Authentication & Authorization**: Implemented using **Spring Boot Security & JWT**.
- **RESTful API**: Backend powered by **Spring Boot (for authentication) & Flask (for ML and data processing)**.
- **MongoDB Database**: Stores farmer data, credit history, and financial metrics.

## 📦 Frontend Dependencies
- **React.js** (JavaScript framework for modern web applications)
  - Node.js & npm (for package management)
  - Axios (for API requests)
  - **Framer Motion** (for animations)
  - **Chart.js & D3.js** (for interactive data visualization)
- **Tailwind CSS** (for styling)
  - Flexbox/Grid for layout compatibility

## ⚙️ Backend Dependencies (Spring Boot, Flask & Python)

### Spring Boot (Authentication & Authorization)
- **Spring Security** (authentication & authorization)
- **Spring Boot JWT** (token-based security)
- **Spring Boot Web & Spring Boot Data JPA** (for REST API and database operations)
- **Spring Boot Validation** (for input validation)
- **MongoDB** (for user authentication data storage)

### Flask (ML & Data Processing)
- **Flask Framework**
  - `flask` (lightweight web framework)
  - `flask-cors` (for handling cross-origin requests)
  - `flask-restful` (for building REST APIs)
- **Python Libraries**
  - `pandas`, `numpy` (data processing)
  - `scikit-learn` (ML models)
  - `matplotlib`, `seaborn` (data visualization)
  - `openai` (for integrating Gemini AI API)
  - `pymongo` (for MongoDB database interaction)

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YashKambaria/Farmer-Helping-Team.git
cd Farmer-Helping-Team
```

### 2️⃣ Backend Setup
#### Spring Boot (Authentication & Authorization)
```bash
cd backend/authentication
mvn clean install
mvn spring-boot:run
```
Spring Boot will start on **port 8080**.

#### Flask (ML & Data Processing)
```bash
cd backend/ml
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py  # Runs the Flask server
```
Flask will start on **port 5000**.

### 3️⃣ Frontend Setup
#### Install dependencies:
```bash
cd frontend
npm install
```
#### Start the frontend:
```bash
npm start
```

## 🔄 Contributing

### 1️⃣ Fork the Project
Click on the **Fork** button at the top right of the repository to create your own copy.

### 2️⃣ Clone the Fork
```bash
git clone https://github.com/your-username/Farmer-Helping-Team.git
cd Farmer-Helping-Team
```

### 3️⃣ Create a Branch
```bash
git checkout -b feature-new-ai-model
```

### 4️⃣ Make Changes & Commit
Modify the code, then commit your changes.
```bash
git add .
git commit -m "Added new AI model for credit evaluation"
```

### 5️⃣ Push & Create a Pull Request
```bash
git push origin feature-new-ai-model
```
Go to the original repo and open a **Pull Request**.

## 🎯 Why Farmer Helping Team is Unique?
- **AI-Driven Financial Analysis**: Uses **Gemini AI API** and **ML models** for alternative credit evaluation.
- **Full-Stack Solution**: Integrated **React.js frontend, Spring Boot authentication, and Flask for ML processing**.
- **Secure & Scalable**: Implements **Spring Security with JWT authentication**.
- **Data-Driven Insights**: Leverages **AI and analytics** for better financial decision-making.

## 🐟 API Endpoints

### Authentication (Spring Boot - Port 8080)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login (JWT) |
| GET | `/api/user/profile` | Get user profile (secured) |

### ML & Data Processing (Flask - Port 5000)
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/api/credit-score` | Compute AI-based credit score |
| GET | `/api/farmers` | Get farmer data |
| POST | `/api/farmers` | Add farmer data |

## 🌟 License
This proje
