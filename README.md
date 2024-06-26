
# Kanban

The Kanban Task Management App is a web-based application designed to help individuals or teams efficiently manage their tasks using the popular Kanban method. With an intuitive user interface and powerful features, the app allows users to visualize their workflow, track progress, and collaborate effectively.

<https://kanban.codes/>

sample
email: <jdoe@gmail.com>
password: 1234

## Screenshots

<!-- ![App Screenshot]() -->
  <img width="1256" alt="Screenshot 2024-01-15 at 11 04 25 AM" src="https://github.com/jeffreylaichunghang/Kanban/assets/129647521/e99618e9-b1df-4412-b176-835d845cd372">

<!-- ## Demo

Insert gif or link to demo -->

## Tech Stack

**Client:** React, React Router, Framer Motion, React Hook Form, React-beautiful-dnd, Redux

**API:** Node, Express, Postgres, Prisma

**API testing** Postmen

**E2E testing** Cypress

**Authentication:** Passport, JWT, bcrypt

**Deployment** AWS, EC2, Route53

**CI/CD** Github Action

## Features

- Light/dark mode toggle
- Drag-and-Drop Interface
- Workflow Visualization
- Sign up form carousel

## API Reference

#### Get all items

```http
  GET /api/getAllBoardsData
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|           |          | All data of boards, columns, tasks and subtasks|

#### Create a board

```http
  POST /api/createBoard
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `board_name` | `string` | **Required**. Name of board |
| `columns` | `string[]` | Name of the columns |

```http
  POST /api/createColumn
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `column_name` | `string` | **Required**. Name of column |

```http
  POST /api/createTask
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `task_name` | `string` | **Required**. Name of task |
| `sub_tasks` | `string[]` | **Required**. Array of sub task names |

```http
  PUT /api/editBoard/:id
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `board_name` | `string` | **Required**. Name of board |
| `columns` | `object[]` | **Required**. Array of columns. Those with an id will be updated. Those without an id will be created. The array is compared with the old array from which those items don't exist anymore will be deleted |

```http
  PUT /api/editTask/:id
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `task_name` | `string` | **Required**. Name of task |
| `sub_tasks` | `object[]` | **Required**. Array of sub tasks. Those with an id will be updated. Those without an id will be created. The array is compared with the old array from which those items don't exist anymore will be deleted |

```http
  PUT /api/updateSubTask/:taskId
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `task_Id` | `number` | **Required**. Id of task |
| `sub_tasks` | `object` | **Required**. An object of a sub task. To update the info of the sub task, mainly to update its status ( done / undone) from the app |

```http
  PUT /api/deleteBoard/:id
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `board_Id` | `number` | **Required**. Id of board |

```http
  PUT /api/deleteTask/:id
```

| Data | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `task_Id` | `number` | **Required**. Id of task |

<!-- #### add(num1, num2)

Takes two numbers and returns the sum. -->

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/jeffreylaichunghang/Kanban.git
```

2. Go to the project directory

```bash
  cd Kanban
```

3. Create .env file at root directory
  you can use .example.env template and change the DATABASE_URL

4. Install backend dependencies

```bash
  cd backend
  npm install
  npx prisma migrate dev
  (if you wish to have seed data, run:)
  npx prisma db seed -- --environment development
```

5. Go to the frontend directory

```bash
  cd frondend
```

Install frontend dependencies

```bash
  npm install
```

6. Start the server at the root directory

```bash
  ( NODE_ENV=development )
  npm run dev
  or
  ( NODE_ENV=production )
  npm run server
```

<!-- ## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
``` -->

## Roadmap

- Real-Time Collaboration

- Group messaging

- sample boards

## Authors

- [@jeffreylaichunghang](https://www.github.com/jeffreylaichunghang)

## Acknowledgements

- [Frontend Mentor](https://www.frontendmentor.io/)
