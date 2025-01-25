# Materials and Process Simulation Center (MSC) Website

Welcome to the official repository for the Caltech Materials and Process Simulation Center (MSC) website! This platform serves as a comprehensive hub for showcasing the groundbreaking research, publications, and events of MSC, while providing a streamlined experience for both administrators and users.

> This project is structured as a **full-stack application** with separate **frontend** and **backend** components.

## 🌐 Overview

The MSC website is designed to offer:

- A public-facing portal to **explore research, publications, and member details**.
- A secure admin dashboard for **efficient content management**.
- Auto-crawling of **publications** from external sources. (Caltech Library)
- A **responsive design** for seamless user experience across devices.
- **SEO optimization** for improved visibility on search engines.

## 📋 Features

### Public Website

- **About MSC**: Insights into the center, team biographies, and achievements.
- **Research**: Detailed information on ongoing projects and collaborations.
- **Publications**: Access the latest papers, archives and most cited works.
- **Members**: Browse through the MSC team and their respective profiles.
- **Events**: View group photos, upcoming events, and a dynamic calendar.

### Admin Dashboard

- **User Management**: Add, edit, or remove members and collaborators.
- **Content Management**: Update research overviews, member bios, and more with Quill.js.
- **Publication Crawling**: Fetch and display publications from the Caltech Library.
- **Event Management**: Upload and manage group photos.

## 🛠️ Technologies

- **Frontend**: Node.js, Express.js, HTML (EJS), CSS (Tailwind CSS), JavaScript, Quill.js
- **Backend**: Node.js, Express.js, SQLite, Lowdb, Cheerio.js

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Install the latest version of Node.js from the [official website](https://nodejs.org/).
- **Nginx**: Install Nginx to serve the frontend and backend on a single domain. (for reverse proxy) (Optional)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/TKanX/MSC-Website.git && cd MSC-Website
   ```

2. **Setup the backend**:

   1. Create a `.env` file in the `backend` directory and add the following environment variables:

      ```env
      PORT=5000 # Port number for the server (default: 5000)
      HOST=localhost # Host address for the server (default: localhost)
      JWT_SECRET=secret # Secret key for JWT token generation
      PUBLICATIONS_URL=https://caltech-msc.github.io/publications/pubs-current.html # URL for the Caltech Library publications
      ```

   2. Install the dependencies:

      ```bash
      cd backend # Move to the backend directory
      npm install # Install the dependencies
      ```

   3. Start the backend server:

      ```bash
      npm start # Start the backend server
      ```

   4. Go back to the root directory:

      ```bash
      cd ..
      ```

3. **Setup the frontend**:

   1. Create a `.env` file in the `frontend` directory and add the following environment variables:

      ```env
      PORT=3000 # Port number for the server (default: 3000)
      HOST=localhost # Host address for the server (default: localhost)
      ```

   2. Install the dependencies:

      ```bash
      cd frontend # Move to the frontend directory
      npm install # Install the dependencies
      ```

   3. Start the frontend server:

      ```bash
      npm start # Start the frontend server
      ```

   > **Note:** The configuration to connect to the backend server is already set in the frontend application. If you want to change the backend server address, configure the server URL in the `frontend/public/js/app.js` file (Default: `/api`).

4. **Setup Nginx (Optional)**:

   1. Configure Nginx as a reverse proxy `/api` to the backend server. (Default: `http://localhost:5000`)
   2. Configure Nginx to serve the frontend application. (Default: `http://localhost:3000`)
   3. Restart Nginx to apply the changes.

5. **Access the application**:

   Open the browser and navigate to the server address to `http://localhost` to access the MSC website. (Use the configured Nginx server address if applicable)

> **Note:** If you are developing the application, you need to install the development dependencies in the root directory to use linting and formatting tools.

## 📝 Licens

This project is not licensed under any open-source license currently. All rights are reserved by the Caltech Materials and Process Simulation Center (MSC).
