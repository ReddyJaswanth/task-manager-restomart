# Task Manager - Restomart Assignment

A full-stack Task Manager web application built with Node.js, Express, TypeORM, SQLite for the backend, and Next.js with React for the frontend. This application provides a simple and efficient way to manage tasks without requiring authentication.

## 🛠 Tech Stack

| Layer | Technologies Used |
| --- | --- |
| Backend | Node.js, Express.js, TypeORM, SQLite |
| Frontend | Next.js (React), TypeScript, Tailwind CSS |
| Database | SQLite |
| Environment | dotenv for configuration |

## ✨ Features

- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Three status options - To Do, In Progress, Done
- **Task Filtering**: Filter tasks by status
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Form Validation**: Client-side validation for required fields
- **Real-time Updates**: Immediate UI updates after operations
- **Error Handling**: Comprehensive error handling and user feedback

## 📋 Task Model

Each task includes the following fields:
- `id`: UUID (Primary Key)
- `title`: String (Required)
- `description`: Text (Optional)
- `status`: Enum (`todo`, `in_progress`, `done`)
- `dueDate`: Date (Optional)
- `createdAt`: Timestamp (Auto-generated)
- `updatedAt`: Timestamp (Auto-updated)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```
   PORT=3001
   DB_TYPE=sqlite
   DB_DATABASE=database.sqlite
   NODE_ENV=development
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp env.local.example .env.local
   ```
   
   Edit `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a specific task |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check API status |

### Request/Response Examples

#### Create Task
```bash
POST /tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for the task manager project",
  "status": "todo",
  "dueDate": "2024-01-15"
}
```

#### Update Task
```bash
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "in_progress"
}
```

## 🎨 Frontend Pages

### Home Page (`/`)
- Displays all tasks in a table format
- Filter tasks by status (All, To Do, In Progress, Done)
- Actions: Edit and Delete for each task
- "Add Task" button to create new tasks

### Add Task Page (`/add`)
- Form to create new tasks
- Fields: Title (required), Description, Status, Due Date
- Client-side validation
- Cancel and Create buttons

### Edit Task Page (`/edit/:id`)
- Form to update existing tasks
- Pre-filled with current task data
- Same fields as Add Task page
- Cancel and Update buttons

## 🎯 Optional Features Implemented

- **Responsive Design**: Mobile-friendly layout using Tailwind CSS
- **Form Validation**: Client-side validation for required fields
- **Task Filtering**: Filter tasks by status on the home page
- **Loading States**: Spinner animations during API calls
- **Error Handling**: User-friendly error messages
- **Confirmation Dialogs**: Delete confirmation using browser confirm

## 🎬 Demo Video

![Task Manager Demo](demo-video.gif)

*Watch the demo video to see the Task Manager application in action!*

## 📁 Project Structure

```
task-manager-restomart/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── entity/
│   │   │   └── Task.ts
│   │   ├── routes/
│   │   │   └── tasks.ts
│   │   └── index.ts
│   ├── scripts/
│   │   ├── db-query.js
│   │   ├── create-tables.js
│   │   └── init-db.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── env.example
│   └── .gitignore
├── frontend/
│   ├── app/
│   │   ├── add/
│   │   │   └── page.tsx
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── task.ts
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── env.local.example
│   └── .gitignore
└── README.md
```

## 🔧 Development Scripts

### Backend
- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript to JavaScript
- `npm start`: Start production server
- `npm run watch`: Start development server with file watching

### Frontend
- `npm run dev`: Start Next.js development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint

## 🐛 Known Issues/Limitations

- No authentication system (as per requirements)
- No user management features
- SQLite database is file-based and not suitable for production scaling
- No image upload functionality
- No real-time updates (WebSocket not implemented)

## 🚀 Deployment Considerations

### Backend
- Set `NODE_ENV=production` in production
- Disable `synchronize: true` and use migrations
- Use a production database (PostgreSQL, MySQL)
- Implement proper logging
- Add rate limiting and security headers

### Frontend
- Build the application: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting service
- Update `NEXT_PUBLIC_API_URL` to point to production backend

## 📝 License

This project is created for the Restomart assignment and is not licensed for commercial use.

## 🤝 Contributing

This is an assignment project, but suggestions and improvements are welcome through issues or pull requests.

---

**Note**: Make sure both backend and frontend servers are running simultaneously for the application to work properly. The frontend will automatically connect to the backend API at the configured URL.
