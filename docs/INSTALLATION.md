# Installation Guide

## Prerequisites

- **Node.js**: Install the latest version of Node.js from the [official website](https://nodejs.org/).
- **Nginx**: Install Nginx to serve the frontend and backend on a single domain. (for reverse proxy) (Optional)
- **PM2**: Install PM2 to manage the backend server. (Optional)
- **Git**: Install Git to clone the repository. (Optional)

## Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/caltechmsc/site.git && cd site
   ```

2. **Setup the backend**:

   1. Create a `.env` file in the `backend` directory and add the following environment variables:

      ```env
      PORT=5000 # Port number for the server (default: 5000)
      HOST=localhost # Host address for the server (default: localhost)
      JWT_SECRET=secret # Secret key for JWT token generation
      PUBLICATIONS_URL=https://feeds.library.caltech.edu/people/Goddard-W-A-III/article.json # URL for the Caltech Library publications
      PUBLICATIONS_HTML_URL=https://caltech-msc.github.io/publications/pubs-current.html # URL for the Caltech Library publications HTML (GitHub Pages)
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

      or

      ```bash
      pm2 start server.js # Start the backend server with PM2
      ```

   4. Go back to the root directory:

      ```bash
      cd .. # Move to the root directory
      ```

3. **Setup the frontend**:

   1. Create a `.env` file in the `frontend` directory and add the following environment variables:

      ```env
      PORT=3000 # Port number for the server (default: 3000)
      HOST=localhost # Host address for the server (default: localhost)
      GOOGLE_CLIENT_ID=client_id # Google OAuth 2.0 client ID
      ```

      > **Note:** The `GOOGLE_CLIENT_ID` is required for the admin dashboard for google login. You can generate the client ID from the [Google Cloud Console](https://console.cloud.google.com/).

   2. Install the dependencies:

      ```bash
      cd frontend # Move to the frontend directory
      npm install # Install the dependencies
      ```

   3. Build the Tailwind CSS:

      ```bash
      npm run build:css # Build the Tailwind CSS
      ```

   4. Start the frontend server:

      ```bash
      npm start # Start the frontend server
      ```

      or

      ```bash
      pm2 start server.js # Start the frontend server with PM2
      ```

   > **Note:** The configuration to connect to the backend server is already set in the frontend application. If you want to change the backend server address, configure the server URL in the `frontend/public/js/app.js` file (Default: `/api`).

4. **Setup Nginx (Optional)**:

   1. Configure Nginx as a reverse proxy `/api` to the backend server. (Default: `http://localhost:5000`)
   2. Configure Nginx to serve the frontend application. (Default: `http://localhost:3000`)
   3. Restart Nginx to apply the changes.
   4. (Optional) Configure Certbot for SSL certificate generation and renewal.

5. **Access the application**:

   The application should now be running on the machine host, if you are using Nginx, you can access the application via the domain name or IP address of the server.

> **Note:** If you are developing the application, you need to install the development dependencies in the root directory to use linting and formatting tools.
