# Phonebook Application using Vue3 Vuetify3

## Overview
This Phonebook application is a simple, responsive web application built with Vue 3 and Vuetify 3, designed to manage contact information efficiently. The application provides both user and admin interfaces with features like contact search, admin login, and CRUD operations for contacts.

## Project Repositories
- **Frontend**: Current Repository
- **Backend**: [phonebook-backend-using-express](https://github.com/shoeb-howlader/phonebook-backend-using-express)

## Features
- 🔍 Advanced contact search functionality
- 👥 Admin login with protected routes
- ➕ Add, edit, and delete contacts
- 📸 Contact image upload
- 📱 Responsive design
- 🔒 JWT-based authentication

## Technology Stack
- **Frontend**: Vue 3
- **UI Framework**: Vuetify 3
- **State Management**: Composition API
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS classes

## Prerequisites
- Node.js (v14+ recommended)
- Yarn or npm
- Backend server running

## Project Setup

### 1. Clone the Repositories
```bash
# Clone Frontend
git clone <frontend-repository-url>
cd phonebook-frontend

# Clone Backend
git clone https://github.com/shoeb-howlader/phonebook-backend-using-express.git ../phonebook-backend
```

### 2. Install Dependencies
```bash
# Frontend
yarn install
# or
npm install

# Backend
cd ../phonebook-backend
yarn install
# or
npm install
```

### 3. Deployment and Build Process

#### Frontend Build
```bash
# In frontend directory
yarn build
# or
npm run build
```

#### Copy Frontend Build to Backend Public Directory
```bash
# Copy all files from dist to backend public directory
cp -R dist/* ../phonebook-backend/public/

# Or on Windows (PowerShell)
Copy-Item -Path "dist/*" -Destination "../phonebook-backend/public/" -Recurse
```

### 4. Running the Application
1. Start the Backend Server
```bash
# In backend directory
yarn start
# or
npm start
```

2. The application will now be accessible at `http://localhost:3001`

## Deployment Workflow
1. Build Frontend
2. Copy `dist` contents to backend's `public` directory
3. Deploy the backend server

## Environment Configuration
Ensure the following environment variables are set in your backend:
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Electron Desktop App Making
```bash
npm run make
```
## Key Components
- 🔐 Admin Login Dialog
- 📇 Contact List with Grid View
- 📝 Add/Edit Contact Form
- 🖼️ Contact Card with Detailed Information

## Authentication
- Admin login via JWT
- Protected routes for admin actions
- Token stored in localStorage

## Validation
- Form validations for:
  - Name (required, max 50 characters)
  - Phone (3 digits)
  - Mobile (11 digits)

## Contributing
1. Fork the repositories
2. Create your feature branch 
   - Frontend: `git checkout -b feature/frontend-amazing-feature`
   - Backend: `git checkout -b feature/backend-amazing-feature`
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License
MIT License

Copyright (c) 2024 Md Shoeb Howlader

## Contact
Developed by: Md Shoeb Howlader
- GitHub: [@shoeb-howlader](https://github.com/shoeb-howlader)
- Frontend Repository: [Current Repository]
- Backend Repository: [phonebook-backend-using-express](https://github.com/shoeb-howlader/phonebook-backend-using-express)

## Acknowledgements
- Vue.js
- Vuetify
- Axios
- Express.js
- MongoDB