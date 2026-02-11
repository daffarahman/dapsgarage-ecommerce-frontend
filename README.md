# Dap's Garage E-commerce Frontend

A modern e-commerce frontend application built for performance and maintainability.

## Tech Stack

-   **Framework:** React 19 with TypeScript
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS 4
-   **UI Components:** Shadcn UI, Lucide React
-   **Routing:** React Router 7
-   **HTTP Client:** Axios
-   **Deployment:** Docker, Nginx

## Development

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start the development server:**

    ```bash
    npm run dev
    ```

3.  **Build for production:**

    ```bash
    npm run build
    ```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

## Docker Deployment (Manual)

You can build and deploy this application using Docker without GitHub Actions.

### Prerequisites

-   Docker installed on your local machine.
-   Access to a remote server via SSH.

### 1. Build the Docker Image

1.  Ensure your `.env` file is set up with the correct API URL.
2.  Build the image:

    ```bash
    docker build -t dapsgarage-frontend .
    ```

### 2. Run Locally

Test the build on port 3000:

```bash
docker run -p 3000:80 dapsgarage-frontend
```

Visit `http://localhost:3000` to verify.

### 3. Deploy to Server

**Step 1: Save the image**

```bash
docker save -o dapsgarage-frontend.tar dapsgarage-frontend:latest
```

**Step 2: Copy to server**

```bash
scp dapsgarage-frontend.tar user@your-server-ip:/tmp/
```

**Step 3: Load and run on server**

SSH into your server and run:

```bash
# Load the image
docker load -i /tmp/dapsgarage-frontend.tar

# Stop and remove existing container
docker stop dapsgarage-frontend || true
docker rm dapsgarage-frontend || true

# Run the new container (mapped to port 6701)
docker run -d \
  --name dapsgarage-frontend \
  -p 6701:80 \
  --restart unless-stopped \
  dapsgarage-frontend:latest

# Cleanup
rm /tmp/dapsgarage-frontend.tar
```
