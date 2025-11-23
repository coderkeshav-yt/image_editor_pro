# Image Editor Pro

A full-stack web application for quick and easy image transformations. This project allows users to convert, resize, and compress images, with automatic storage to Cloudinary.

**Note:** This project is designed for local development and usage.

## Features

*   **Image Conversion:** Convert images to JPEG, PNG, or WebP formats.
*   **Image Resizing:** Resize images to specific dimensions while maintaining aspect ratio.
*   **Image Compression:** Compress images to reduce file size with adjustable quality.
*   **Cloudinary Integration:** Automatically uploads processed images to your Cloudinary Media Library.
*   **Drag & Drop Interface:** User-friendly file upload.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or higher recommended)
*   A [Cloudinary](https://cloudinary.com/) account (for API credentials)

## Installation

1.  **Clone or Download** the repository to your local machine.

2.  **Backend Setup:**
    *   Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `backend` directory with your Cloudinary credentials:
        ```env
        PORT=5000
        CLOUDINARY_CLOUD_NAME=your_cloud_name
        CLOUDINARY_API_KEY=your_api_key
        CLOUDINARY_API_SECRET=your_api_secret
        ```

3.  **Frontend Setup:**
    *   Navigate to the `frontend` directory:
        ```bash
        cd ../frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```

## Running the Application

You need to run both the backend and frontend servers simultaneously.

1.  **Start the Backend:**
    *   In the `backend` terminal:
        ```bash
        npm run dev
        ```
    *   The server will start on `http://localhost:5000`.

2.  **Start the Frontend:**
    *   In the `frontend` terminal:
        ```bash
        npm run dev
        ```
    *   Open your browser and navigate to the URL shown (usually `http://localhost:5173`).

## Usage

1.  Open the application in your browser.
2.  Drag and drop an image or click to select one.
3.  Choose a feature (Convert, Resize, Compress).
4.  Adjust the settings as needed.
5.  Click **Process & Download**.
6.  The processed image will be downloaded to your computer and uploaded to your Cloudinary account.
