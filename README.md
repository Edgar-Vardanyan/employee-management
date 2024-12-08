# Employee Management System

This is an Employee Management System built with Angular, Angular Material, and MongoDB. The application allows you to manage employee records, including creating, viewing, editing, and deleting employee details. The system supports multiple views, such as table and grid views, and includes a responsive design.

## Features

- **Employee Dashboard**: Displays summary information about employees.
- **Create Employee**: Allows the creation of new employee records.
- **View Employees**: View employee details in a table or grid view.
- **Edit Employee**: Edit employee information in a dialog window.
- **Responsive Design**: The app is fully responsive and optimized for mobile and desktop views.
- **Employee Data**: Stores employee details like name, email, address, mobile, gender, and more.

## Technologies Used

- **Frontend**:
  - Angular v18
  - Angular Material
  - Tailwind CSS for custom styling and responsive design
  
- **Backend**:
  - MongoDB (via Mongoose)
  - Express.js (for API routes)
  - DotEnv

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 18 or above)
- [MongoDB](https://www.mongodb.com/) (running locally or via Atlas)

## Running the Application

1. **Start the backend**:
   - Navigate to the `backend` folder and run the following command:
   
     ```bash
     nodemon server.js
     ```

2. **Start the frontend**:
   - Navigate to the `frontend` folder and run the following command:
   
     ```bash
     ng s
     ```

Once both the backend and frontend are running, you can access the application in your browser.
