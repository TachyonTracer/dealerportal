# Dealer Portal - Modern E-commerce Platform

A comprehensive dealer portal built with Next.js, featuring modern cart functionality, real-time dashboard analytics, and beautiful user interface components.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation & Setup

1. **Clone the repository** (if applicable):
```bash
git clone <repository-url>
cd dealerportal
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open the application**:
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Demo Credentials
For testing the application, use these demo credentials:
- **Email**: `demo@dealer.com`
- **Password**: `Demo@123456`

## 📱 Features Overview

### Core Functionality
- **🔐 Authentication System**: Secure login with form validation
- **🛒 Shopping Cart**: Add, remove, update items with persistent storage
- **📊 Dashboard**: Real-time analytics and order tracking
- **🛍️ Product Catalog**: Browse, search, and filter products
- **📋 Order Management**: Complete order history and tracking

### User Experience
- **🎨 Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **🔔 Smart Notifications**: Beautiful SweetAlert2 popup notifications
- **📱 Mobile Responsive**: Optimized for all screen sizes
- **⚡ Real-time Updates**: Live cart count and dashboard metrics

## 🎯 Level 2 Enhancements Implemented

All Level 2 enhancement requirements have been **fully implemented**:

### ✅ **Cart System**
- **Cart persistence via localStorage**: Cart items persist across browser sessions
- **Real-time cart management**: Add, remove, update quantities with immediate feedback
- **Checkout flow**: Complete order processing with confirmation dialogs

### ✅ **Product Management**
- **Product filtering by category**: Dynamic category-based filtering
- **Search functionality**: Real-time search by title and description
- **Pagination**: Smart pagination with customizable items per page (12, 24, 48)
- **Loading states**: Comprehensive loading indicators and error handling

### ✅ **Component Architecture**
- **Reusable components**: 
  - `ProductCard` - Modular product display with add-to-cart functionality
  - `Layout` - Shared layout wrapper with navigation
  - `Navbar` - Dynamic navigation with cart count and user menu
- **Custom hooks**:
  - `useCart` - Cart state management and persistence
  - `useProducts` - Product data fetching, filtering, and search

### ✅ **Form Validation & UX**
- **Login form validation**: Real-time regex validation for email and password
- **Visual feedback**: Error states, loading spinners, success indicators
- **Toast notifications**: Non-intrusive notifications for user actions

### ✅ **Data Management**
- **Error handling**: Comprehensive error boundaries and user-friendly error messages
- **Loading states**: Skeleton loading and progress indicators
- **Local storage integration**: Persistent cart and user session data

## 🏗️ Technical Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context + Custom Hooks
- **Notifications**: SweetAlert2
- **Data Persistence**: localStorage
- **API**: FakeStore API for product data

### Project Structure
```
dealerportal/
├── app/
│   ├── auth/login/          # Authentication pages
│   ├── components/          # Reusable UI components
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions and configs
│   ├── cart/               # Shopping cart page
│   ├── dashboard/          # Analytics dashboard
│   ├── orders/             # Order management
│   └── products/           # Product catalog
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

### Key Components

#### **CartContext & useCart Hook**
- Global cart state management
- localStorage persistence
- Real-time cart operations

#### **useProducts Hook**
- Product data fetching and caching
- Search and filtering logic
- Category management

#### **Dashboard Service**
- Order tracking and analytics
- Local storage data management
- Statistics calculation

#### **SweetAlert2 Integration**
- Custom configuration for consistent styling
- Toast notifications and confirmation dialogs
- Enhanced user feedback system

## 🛠️ Development Features

### Code Quality
- **Clean Architecture**: Separation of concerns with hooks and services
- **Reusable Components**: Modular component design
- **Error Handling**: Comprehensive error boundaries
- **Type Safety**: Consistent prop validation

### Performance Optimizations
- **Memoized Callbacks**: Optimized re-renders with useCallback
- **Efficient Filtering**: Client-side search and filtering
- **Image Optimization**: Next.js Image component usage
- **Responsive Design**: Mobile-first approach

## 📊 Development Summary

### **Estimated Time Spent: ~4-5 hours**
Deployed Link: https://dealerportal-phi.vercel.app/
