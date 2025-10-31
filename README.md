# Team Collaboration Board

A full-stack Kanban-style task management application built using **React**, **Express.js**, and **MongoDB**.  
Users can create boards, add tasks, assign members, set priorities, and track progress through **To-Do**, **In Progress**, and **Done** columns.

---

## Features

### Boards
- Create and view multiple boards
- Each board contains its own tasks

### Tasks
- Create, edit, update, and delete tasks
- Grouped by status: **To Do**, **In Progress**, **Done**
- Each task includes:
  - Title (required)
  - Description
  - Status (To Do / In Progress / Done)
  - Priority (Low / Medium / High)
  - Assigned To
  - Due Date
  - Belongs to a board

### Additional
- Tasks can be moved between columns via the status dropdown  
- Responsive design using **Tailwind CSS**

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Environment | dotenv |


