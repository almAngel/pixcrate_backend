# Pixcrate Backend

**This project is part of my final project for a Spanish Higher Vocational Education program.**

This project is the backend for **Pixcrate**, an application focused on image management and storage. It provides a REST API to handle operations related to users, images, and other relevant entities.

## Table of Contents

- [Key Software Concepts and Technologies](#key-software-concepts-and-technologies)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Key Software Concepts and Technologies

- **REST API**: The backend exposes a RESTful API for CRUD operations on users, images, and other entities.
- **TypeScript**: The project is developed in TypeScript, providing static typing and improved maintainability.
- **Node.js & Express.js**: Node.js is used as the runtime environment and Express.js as the framework for building the API and handling HTTP requests.
- **MongoDB (NoSQL)**: MongoDB is used as the NoSQL database for flexible and scalable data storage.
- **AWS S3**: Images are stored in AWS S3, providing scalable and highly available cloud storage for static files.
- **Authentication & Authorization**: Libraries like `jsonwebtoken` and `bcrypt` are used for user authentication and secure password storage.
- **Modular Architecture**: The use of TypeScript and Express encourages a modular architecture, separating controllers, models, and routes.
- **Aspect-Oriented Programming (AOP)**: The use of decorators (see `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json`) suggests the use of AOP patterns for validation, logging, or authorization.
- **Development Tools**: Tools like Nodemon and ts-node-dev for live reloading, Mocha and nyc for testing and code coverage, and http-server for serving static files if needed.

## Technologies Used

- TypeScript & Javascript
- Node.js
- Express.js
- NoSQL Database (MongoDB)
- Image storage on AWS S3

## Installation

1. Clone the repository:
	```bash
	git clone https://github.com/your_user/pixcrate_backend.git
	cd pixcrate_backend
	```
2. Install dependencies:
	```bash
	npm install
	```
3. Configure the required environment variables.

4. Run the application in development mode:
	```bash
	npm run live
	```
	Or run the application in production mode (after building):
	```bash
	npm run build
	npm start
	```

## Relevant Tags for SEO and LinkedIn

These tags help improve the discoverability of this project on LinkedIn and search engines:

`typescript`, `javascript`, `nodejs`, `express`, `mongodb`, `aws-s3`, `rest-api`, `aop`, `jwt`, `bcrypt`, `image-management`, `backend`, `cloud-storage`, `api-development`, `software-architecture`, `modular-design`, `mocha`, `nyc`, `nodemon`, `ts-node-dev`, `vocational-education`, `higher-education`, `final-project`, `spanish-education`, `web-development`, `serverless`, `cloud-computing`, `security`, `authentication`, `authorization`, `decorators`, `oop`, `programming`, `open-source`, `project-management`, `devops`, `testing`, `code-coverage`, `scalable`, `maintainable`, `modern-stack`, `s3-bucket`, `expressjs`, `typescript-backend`, `api-security`, `education-project`, `portfolio`, `professional-development`
