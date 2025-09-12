# QuickGPT Full-Stack Application

The application delivers an AI-driven conversational interface, enabling users to communicate with an intelligent assistant, exchange images, and obtain contextual responses instantly. It seamlessly merges natural language interaction with multimedia functionality.

## 🚀 Live Demo

- **Frontend**: (https://chat-gpt-clone-five-indol.vercel.app)
- **Backend**: (https://chat-gpt-clone-server-seven.vercel.app)


## 📋 Project Overview

This is a complete chat and image sharing platform with two main components:
1. **Frontend** - Chat interface, user authentication, and community image gallery
2. **Backend API** - RESTful API handling all business logic, authentication, and data management

## 📁 Project Structure

```
QUICKGPT-CHVR/
├── client/          # Customer-facing React app
├── server/          # Node.js Express API
├── README.md        # This file
└── .gitignore
```

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud instance)
- **npm** package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd quickgpt-chvr
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in server folder:
```env
MONGODB_URI=mongodb+srv://your_mongo_uri
JSON_WEB_TOKEN=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET_KEY=whsec_your_webhook_secret
PORT=3000
```

Start the backend:
```bash
cd server
npm run server
# Server runs on http://localhost:3000
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create `.env` file in client folder:
```env
VITE_SERVER_URL=http://localhost:3000
```

Start the frontend:
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000
```

### Authentication Routes
- **POST** `/api/user/register` - Register new user
- **POST** `/api/user/login` - User login
- **GET** `/api/user/data` - Get user data (Protected)
- **GET** `/api/user/published-images` - Get published images (Protected)

### Chat Routes
- **GET** `/api/chat/create` - Create new chat (Protected)
- **GET** `/api/chat/get` - Get user chats (Protected)
- **POST** `/api/chat/delete` - Delete chat (Protected)

### Message Routes
- **POST** `/api/message/send` - Send message (Protected)
- **GET** `/api/message/get/:chatId` - Get chat messages (Protected)

### Credit Routes
- **POST** `/api/credit/purchase` - Purchase credits (Protected)
- **GET** `/api/credit/verify` - Verify payment

### Stripe Webhook
- **POST** `/api/stripe` - Stripe webhook handler

## 📦 Dependencies

### Backend Dependencies
- **express** - Web framework
- **mongoose** - MongoDB modeling
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **multer** - File uploads (via ImageKit)
- **stripe** - Payment processing
- **axios** - HTTP client
- **openai** - AI integration
- **imagekit** - Image management
- **svix** - Webhook utilities
- **nodemon** - Development server

### Frontend Dependencies
- **react** - UI library
- **react-dom** - React rendering
- **react-router-dom** - Routing
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **react-hot-toast** - Notifications
- **moment** - Date handling
- **prismjs** - Syntax highlighting
- **react-markdown** - Markdown rendering

## 🎯 Features

- User registration and login with JWT authentication
- Chat interface for AI conversations
- Image generation and sharing
- Community gallery of published images
- Credit-based payment system with Stripe
- Dark/light theme support
- Responsive design for mobile and desktop

## 🚀 Running the Applications

### Development Mode
```bash
# Terminal 1 - Backend
cd server && npm run server

# Terminal 2 - Frontend
cd client && npm run dev
```

### Production Build
```bash
# Frontend
cd client
npm run build

# Backend is production-ready with npm run start
```

## 🔐 Environment Variables

Create `.env` file in server folder:
```env
MONGODB_URI=mongodb+srv://your_mongo_uri
JSON_WEB_TOKEN=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET_KEY=whsec_your_webhook_secret
PORT=3000
```

Create `.env` file in client folder:
```env
VITE_SERVER_URL=http://localhost:3000
```

## 🧪 Testing

```bash
# Test backend endpoints
curl http://localhost:3000/

# Test frontend
Open http://localhost:5173 in browser
```

## 📱 Responsive Design

All applications are fully responsive:
- **Mobile** - Optimized for touch interactions
- **Tablet** - Adaptive layouts for medium screens
- **Desktop** - Full-featured desktop experience

## Stripe Test Debit Card Numbers

Use these test card numbers with Stripe for testing purposes:

- **India:** `4000 0003 2000 0021`
- **US:** `4242 4242 4242 4242`
