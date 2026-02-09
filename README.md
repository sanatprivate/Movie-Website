# SF Movies

A production-ready full-stack Movie Website built with Node.js, Express, MongoDB, and React.

## Features

- **User Authentication**: Secure Login/Register with JWT and bcrypt.
- **Role-Based Access Control**:
    - **Admin**: Add, edit, delete movies.
    - **Moderator**: Manage reviews.
    - **Premium User**: Access exclusive "Premium-only" movies (marked with ⭐).
    - **User**: View standard movies, rate, and review.
- **Premium Subscription**: Users can upgrade to Premium status for $5 to unlock exclusive content.
- **Email Notifications**: Automated welcome emails via SendGrid/Nodemailer upon registration.
- **Movie Management**: Dynamic movie listing, searching, and details view.
- **Reviews & Ratings**: Role-specific badges (🛡️ Admin, ⭐ Premium) in review sections.
- **Responsive Design**: Modern, dark-themed UI inspired by Netflix.

## Tech Stack

### Backend
- **Node.js & Express**: API Server.
- **MongoDB Atlas**: Cloud Database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Authentication.
- **Bcrypt**: Password Hashing.
- **Nodemailer & SendGrid**: Email Service.

### Frontend
- **HTML5 & CSS3**: Semantic markup and custom premium dark styles.
- **Vanilla JavaScript**: ES6+ modules for API interaction and DOM manipulation.
- **Glassmorphism UI**: Modern aesthetic with blur effects and smooth transitions.

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas URI
- SendGrid API Key (for emails)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd movie-website
    ```

2.  **Install Backend Dependencies**
    ```bash
    cd server
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `server` folder:
    ```env
    PORT=8080
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    
    # Email Service
    SMTP_HOST=smtp.sendgrid.net
    SMTP_PORT=587
    SMTP_EMAIL=apikey
    SMTP_PASSWORD=your_sendgrid_api_key
    FROM_EMAIL=your_verified_sender_email
    FROM_NAME=SF Movies
    ```

### Running the App

1.  **Start Backend**
    ```bash
    cd server
    npm start
    ```

2.  **Start Frontend**
    Open `client/index.html` in your browser.
    *Recommended: Use "Live Server" extension in VS Code for better experience.*

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Users
- `GET /api/users/profile` - Get user profile (Private)
- `PUT /api/users/profile` - Update user profile (Private)
- `PUT /api/users/upgrade` - **[NEW]** Upgrade user to Premium role (Private)

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### Reviews
- `GET /api/reviews/:movieId` - Get reviews for a movie
- `POST /api/reviews/:movieId` - Create review (Private, No Admins)
- `PUT /api/reviews/:id` - Update review (Owner/Moderator)
- `DELETE /api/reviews/:id` - Delete review (Owner/Moderator/Admin)

## Features Overview & Screenshots

### 🎥 Premium Exclusive Content
Certain movies (like *Avengers: Endgame*, *Avatar*) are locked for regular users.
- **Locked State**: Displays a "Premium Content" lock 🔒 message and an "Upgrade" button.
- **Unlocked State**: Premium users see the full movie trailer and a Star ⭐ badge.

### 📧 Email Integration
- **Welcome Email**: Automatically sent to new users upon registration.
- **Technology**: Uses SendGrid SMTP for reliable delivery.

### 🛡️ Role-Based Badges
In the reviews section, users are distinguished by roles:
- **Admin**: 🛡️ Shield Icon
- **Premium**: ⭐ Star Icon
- **User**: Standard display
