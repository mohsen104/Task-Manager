# Task Manager API

## Project Description

A task management API built using Node.js, Express, Sequelize ORM, and MySQL. This API allows users to manage tasks, projects, and team members. It supports authentication, CRUD operations for tasks and projects, and provides functionality for assigning users to projects and tasks.

## Features

- **User Authentication**: Login to the system.
- **Project Management**: Create, update, delete, and retrieve projects.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **User Management**: Manage users within a project, assign tasks to users.
- **Project Members**: Add members to specific projects.

## API Endpoints

### 1. List of All Users
- **GET** `/api/users`
- Retrieves a list of all users in the system.

### 2. List of All Projects
- **GET** `/api/projects`
- Retrieves a list of all projects in the system.

### 3. List of Users for Each Project
- **GET** `/api/projects/:project_id/users`
- Retrieves a list of users associated with a specific project.

### 4. List of Tasks for Each User in Each Project
- **GET** `/api/projects/:project_id/users/:user_id/tasks`
- Retrieves a list of all tasks assigned to a user in a specific project.

### 5. Task Details
- **GET** `/api/tasks/:task_id`
- Retrieves the details of a specific task using the task ID.

### 6. List of All User Tasks
- **GET** `/api/users/:user_id/tasks`
- Retrieves all tasks assigned to a specific user.

### 7. Create a Task
- **POST** `/api/tasks`
- Used to create a new task.

### 8. Create a Project
- **POST** `/api/projects`
- Used to create a new project.

### 9. Edit Task
- **PUT** `/api/tasks/:task_id`
- Used to edit an existing task.

### 10. Edit Project
- **PUT** `/api/projects/:project_id`
- Used to edit an existing project.

### 11. Remove a Task
- **DELETE** `/api/tasks/:task_id`
- Used to remove a specific task.

### 12. Delete a Project
- **DELETE** `/api/projects/:project_id`
- Used to delete a specific project.

### 13. Add Users to Project
- **POST** `/api/projects/:project_id/members`
- Used to add one or more users to a specific project.


## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and set up the required environment variables.
4. Start the server:
   ```bash
   npm start
   ```

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Sequelize ORM**: ORM for MySQL database interaction.
- **MySQL**: Database for storing project, task, and user data.
- **Winston**: Logging library.

## RBAC System

This application implements an **RBAC (Role-Based Access Control)** system with the following components:

- **Roles**: Defines the role of each user (e.g., Admin, User).
- **Permissions**: Defines the actions that can be performed within the system (e.g., Create Task, Edit Project).
- **RolePermissions**: Defines the mapping between roles and permissions.

However, note that **authorization guards** and the **authentication system** have not yet been implemented in the project.