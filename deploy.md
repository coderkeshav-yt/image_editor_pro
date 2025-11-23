# Deploying Image Editor Pro to Vercel

This guide explains how to deploy the Image Editor Pro application to Vercel. Since this is a full-stack application (React Frontend + Node.js/Express Backend), we need to configure Vercel to handle both parts.

## Prerequisites

1.  A [Vercel Account](https://vercel.com/).
2.  [Vercel CLI](https://vercel.com/docs/cli) installed (`npm i -g vercel`) OR a GitHub/GitLab/Bitbucket repository connected to Vercel.

## Important Considerations

*   **Serverless Environment:** Vercel runs the backend as Serverless Functions. This means the server doesn't run continuously.
*   **File System:** The file system is read-only, except for the `/tmp` directory. Our use of `multer` with memory storage works fine, but ensure you don't try to save files to disk permanently.
*   **Payload Limits:** Vercel Serverless Functions have a payload limit (usually 4.5MB). Large image uploads might fail. For larger files, consider uploading directly from the frontend to Cloudinary (client-side upload) or using a dedicated backend host like Render or Heroku.
*   **Execution Time:** Functions have a timeout (usually 10s on the free plan). Complex image processing might time out.

## Configuration Steps

To deploy both frontend and backend in the same Vercel project, we need a `vercel.json` configuration file in the **root** of your project.

1.  **Create `vercel.json`** in the root directory:

    ```json
    {
      "version": 2,
      "builds": [
        {
          "src": "backend/server.js",
          "use": "@vercel/node"
        },
        {
          "src": "frontend/package.json",
          "use": "@vercel/static-build",
          "config": { "distDir": "dist" }
        }
      ],
      "routes": [
        {
          "src": "/api/(.*)",
          "dest": "/backend/server.js"
        },
        {
          "src": "/(.*)",
          "dest": "/frontend/$1"
        }
      ]
    }
    ```

2.  **Update `backend/server.js`:**
    Vercel requires the Express app to be exported for serverless execution. You might need to modify the end of your `server.js` file:

    ```javascript
    // ... existing code ...

    // Only listen if not running on Vercel (local development)
    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }

    // Export the app for Vercel
    module.exports = app;
    ```

3.  **Environment Variables:**
    Don't forget to add your environment variables in the Vercel Project Settings:
    *   `CLOUDINARY_CLOUD_NAME`
    *   `CLOUDINARY_API_KEY`
    *   `CLOUDINARY_API_SECRET`

## Deployment Methods

### Option A: Using Vercel CLI (Recommended for manual deploy)

1.  Open your terminal in the root directory.
2.  Run `vercel`.
3.  Follow the prompts:
    *   Set up and deploy? **Y**
    *   Which scope? (Select your account)
    *   Link to existing project? **N**
    *   Project name? **image-editor-pro**
    *   In which directory is your code located? **./**
    *   Auto-detected project settings? **N** (We are using `vercel.json` so we can skip overriding settings usually, or manually specify if asked).

### Option B: Using Git Integration

1.  Push your code to a Git repository (GitHub, GitLab, etc.).
2.  Go to the Vercel Dashboard and click **"Add New..."** -> **"Project"**.
3.  Import your repository.
4.  Vercel should detect the configuration. Ensure the **Root Directory** is set to `./`.
5.  Add your **Environment Variables** in the settings before deploying.
6.  Click **Deploy**.

## Troubleshooting

*   **404 on API:** Check the `routes` in `vercel.json`. Ensure requests to `/api/...` are correctly routed to `backend/server.js`.
*   **Missing Dependencies:** Ensure `backend/package.json` and `frontend/package.json` are present and correct. Run `npm install` in the root if you have a root `package.json` (optional for this structure).
