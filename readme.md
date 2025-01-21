# Task Manager API

## Project Description

A comprehensive task management API built using Node.js, Express, Sequelize ORM, and MySQL. This API allows users to manage tasks, projects, and team members, with robust authentication and role-based access control (RBAC) features. The API supports CRUD operations for tasks and projects, user management within projects, and assignment of tasks to users.

Redis is also required for session management and caching to improve performance.

## Features

- **User Authentication**: Login system based on sessions.
- **Project Management**: Create, update, delete, and retrieve projects.
- **Task Management**: Create, update, delete, and retrieve tasks.
- **User Management**: Manage users within a project and assign tasks to users.
- **Project Members**: Add members to specific projects.
- **RBAC System**: Role-based access control ensures secure and granular permission handling.

## RBAC System

The application fully implements an **RBAC (Role-Based Access Control)** system with the following components:

- **Roles**: Defines the role of each user (e.g., Admin, User).
- **Permissions**: Defines the actions that can be performed within the system (e.g., Create Task, Edit Project).
- **RolePermissions**: Maps roles to permissions.

Upon application startup, predefined permissions and roles are automatically populated into the database, ensuring consistent and reliable access control.

## Authentication System

Authentication is session-based and includes routes for login (via OTP or password), updating user credentials, and logout. Redis is used to manage and store session data for improved performance.

## API Endpoints

### Authentication

#### 1. Authentication
- **POST** `/api/authentication`
- Validates user session.
- **Request Body Example:**
  ```json
  {
    "username": ""
  }
  ```

#### 2. Login via OTP
- **POST** `/api/login/otp`
- **Request Body Example:**
  ```json
  {
    "phone": "",
    "otp": ""
  }
  ```

#### 3. Login via Password
- **POST** `/api/login/password`
- **Request Body Example:**
  ```json
  {
    "username": "",
    "password": ""
  }
  ```

#### 4. Update Username
- **POST** `/api/username/update`
- **Request Body Example:**
  ```json
  {
    "first_name": "",
    "last_name": ""
  }
  ```

#### 5. Update Email
- **POST** `/api/email/update`
- **Request Body Example:**
  ```json
  {
    "email": ""
  }
  ```

#### 6. Update Password
- **POST** `/api/password/update`
- **Request Body Example:**
  ```json
  {
    "current_password": "",
    "new_password": "",
    "repeat_password": ""
  }
  ```

#### 7. Logout
- **GET** `/api/user/logout`

### Projects

#### 1. Get All Projects
- **GET** `/api/projects`

#### 2. Create Project
- **POST** `/api/projects`
- **Request Body Example:**
  ```json
  {
    "title": "",
    "description": "",
    "created_by": ""
  }
  ```

#### 3. Update Project
- **PUT** `/api/projects/{project_id}`
- **Request Body Example:**
  ```json
  {
    "description": ""
  }
  ```

#### 4. Delete Project
- **DELETE** `/api/projects/{project_id}`

#### 5. Add Member to Project
- **POST** `/api/projects/{project_id}/members`
- **Request Body Example:**
  ```json
  {
    "user_id": ""
  }
  ```

### Tasks

#### 1. Create Task
- **POST** `/api/tasks`
- **Request Body Example:**
  ```json
  {
    "title": "",
    "description": "",
    "status": "",
    "priority": "",
    "due_date": "",
    "project_id": "",
    "user_id": ""
  }
  ```

#### 2. Get Task Details
- **GET** `/api/tasks/{task_id}`

#### 3. Update Task
- **PUT** `/api/tasks/{task_id}`
- **Request Body Example:**
  ```json
  {
    "title": "updated task"
  }
  ```

#### 4. Delete Task
- **DELETE** `/api/tasks/{task_id}`

### User and Project Tasks

#### 1. Get Tasks of User in Project
- **GET** `/api/projects/{project_id}/users/{user_id}/tasks`

#### 2. Get User's Tasks
- **GET** `/api/users/{user_id}/tasks`

### Users

#### 1. Get All Users
- **GET** `/api/users`

#### 2. Get Users of Project
- **GET** `/api/projects/{project_id}/users`

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
