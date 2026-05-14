# AI Product Recommendation System

A simple full-stack web application that recommends products based on user preferences using React, Node.js, and Google Gemini AI.

---

## 🚀 Features

- Displays a list of products on the frontend
- Takes user input like "I want a phone under 500 dollars"
- Sends request to backend API
- Uses Google Gemini AI to generate recommendations
- Shows matching products in UI
- Fallback logic added if AI fails

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios

### Backend
- Node.js
- Express.js
- CORS

### AI Integration
- Google Gemini API (`@google/generative-ai`)

---
## 📁 Project Structure

```
product-recommender/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env (not included in GitHub)
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│
└── README.md
```


---

## ⚙️ How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/NismaK/product-recommender.git
cd product-recommender

2. Setup Backend
cd backend
npm install

Create a .env file inside backend:

GEMINI_API_KEY=your_api_key_here

Run backend server:

node server.js

Backend runs at:

http://localhost:5000
3. Setup Frontend
cd frontend
npm install
npm start

Frontend runs at:

http://localhost:3000
🤖 How It Works
User enters a product preference
Frontend sends request to backend
Backend sends data to Gemini AI
AI returns matching product IDs
Backend filters products and sends response
Frontend displays recommendations

If AI fails, fallback logic ensures results are still shown.

📌 Example

Input:

I want a budget phone under $500

Output:

Samsung Galaxy S21
OnePlus 11R
