

# Kanban

The Kanban Task Management App is a web-based application designed to help individuals or teams efficiently manage their tasks using the popular Kanban method. With an intuitive user interface and powerful features, the app allows users to visualize their workflow, track progress, and collaborate effectively.


## Screenshots

![App Screenshot](
  <img width="1252" alt="Screenshot 2024-01-14 at 10 31 43 PM" src="https://github.com/jeffreylaichunghang/portfolio/assets/129647521/aeb98b3c-197e-47b1-9da5-ecde0ac77206">
)


<!-- ## Demo

Insert gif or link to demo -->


## Tech Stack

**Client:** React, Framer Motion

**Server:** Node, Express, Postgres, Prisma


## Features

- Light/dark mode toggle
- Drag-and-Drop Interface
- Workflow Visualization


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

<!-- #### add(num1, num2)

Takes two numbers and returns the sum. -->



## Run Locally

Clone the project

```bash
  git clone https://github.com/jeffreylaichunghang/Kanban.git
```

Go to the project directory

```bash
  cd Kanban
```

Install backend dependencies

```bash
  npm install
```

Go to the frontend directory

```bash
  cd frondend
```

Install frontend dependencies

```bash
  npm install
```

Start the server at the root directory

```bash
  npm run dev
```


<!-- ## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
``` -->


## Roadmap

- Authentication

- Real-Time Collaboration

- Group messaging


## Authors

- [@jeffreylaichunghang](https://www.github.com/jeffreylaichunghang)

## Acknowledgements

 - [Frontend Mentor](https://www.frontendmentor.io/)
