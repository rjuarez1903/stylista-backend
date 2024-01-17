# Stylista Backend

## Overview
Stylista is a Node.js backend for a mobile app that integrates the power of OpenAI's API for advanced image processing, text generation, and image creation based on descriptions. This backend specifically utilizes OpenAI's `gpt-4-vision-preview`, `gpt-4-1106-preview`, and `dall-e-3` models. It also integrates with Cloudinary for efficient image hosting.

## Features
- Integration with OpenAI API, specifically using `gpt-4-vision-preview`, `gpt-4-1106-preview`, and `dall-e-3` models.
- Single endpoint hosted at `localhost:4000/api/outfit`.
- Cloudinary integration for image hosting.

## Environment Setup
Create a `.env` file in the root directory and add the following keys:

```env
OPENAI_API_KEY=your_openai_api_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name_here
CLOUDINARY_API_KEY=your_cloudinary_api_key_here
CLOUDINARY_API_SECRET=your_cloudinary_api_secret_here
```


## Installation
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the necessary packages.
4. Set up the `.env` file as mentioned above.

## Running the Server
Start the server in development mode by running `npm run dev`.

## Usage
Send a POST request to `localhost:4000/api/outfit` with a JSON body containing a base64 encoded image string:

```json
{
    "base64ImageString": "<your_base64_encoded_image_string_here>"
}
```

## Todo

- Implement JWT (JSON Web Tokens) for API consumption limitation and enhanced security.

## Note

- Ensure that your API keys and sensitive data are not exposed in public repositories or documents. Always use environment variables to manage sensitive information securely.
