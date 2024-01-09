

# Kanban

The Kanban Task Management App is a web-based application designed to help individuals or teams efficiently manage their tasks using the popular Kanban method. With an intuitive user interface and powerful features, the app allows users to visualize their workflow, track progress, and collaborate effectively.


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Demo

Insert gif or link to demo


## Tech Stack

**Client:** React, Recoil, CSS, Material UI

**Server:** Node, Express, Postgres, Prisma


## Features

- Light/dark mode toggle
- Drag-and-Drop Interface
- Workflow Visualization


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.



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

Start the server

```bash
  node index.js
```

Install frontend dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```



## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Roadmap

- Additional browser support

- Add more integrations


## Authors

- [@jeffreylaichunghang](https://www.github.com/jeffreylaichunghang)

## Acknowledgements

 - [Frontend Mentor](https://www.frontendmentor.io/)
