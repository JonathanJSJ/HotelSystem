# README

## Description

This is a basic server developed with **Node.js** and **Express**. It includes support for:

- JSON data handling.
- Allowing requests from any origin (CORS).

## Requirements

Before running the project, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm
- Typescript

## Installation

1. Clone this repository or copy the files to your local machine:

   ```bash
   git clone <REPOSITORY_URL>
   cd <FOLDER_NAME>
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a .env file in the root of the project to define the needed constants. You can refer to the .env.example file for an example configuration.

> Note: By default, the `.env.example` file includes a `MONGO_URI` configured to work with the `docker-compose.dev` setup. Make sure to update this URI if you're not using Docker or are connecting to a different MongoDB instance.

## How to Run

1. Run the following command to start the server:

   ```bash
   npm run dev
   ```

2. The server will be running. Access it in your browser or with an HTTP client:
   - [http://localhost:3000](http://localhost:3000) (or the port defined in `.env`)

## API Documentation

To view and interact with the API documentation using Swagger UI, access the following link after starting the server:
[Swagger UI Doc](http://localhost:3000/api-docs/)
