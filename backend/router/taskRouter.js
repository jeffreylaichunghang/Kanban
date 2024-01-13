class TaskRouter {
    constructor(express, service) {
        this.express = express
        this.service = service
    }

    route() {
        const router = this.express.Router()

        router.get('/getAllBoardsData', this.getAllBoardsData.bind(this))
        router.get('/getAllBoards', this.getAllBoards.bind(this))
        router.get('/allTasks', this.getBoardTasks.bind(this))

        router.post('/createBoard', this.createBoard.bind(this))
        router.post('/createColumn', this.createColumn.bind(this))
        router.post('/createTask', this.createTask.bind(this))

        router.put('/editBoard/:id', this.editBoard.bind(this))
        router.put('/editTask/:id', this.editTask.bind(this))
        router.put('/updateSubTask/:taskId', this.updateSubTask.bind(this))

        router.delete('/deleteBoard/:id', this.deleteBoard.bind(this))
        router.delete('/deleteTask/:id', this.deleteTask.bind(this))

        return router
    }

    async getAllBoardsData(req, res) {
        const data = await this.service.getAllBoardsData()
        res.json(data)
    }

    async getAllBoards(req, res) {
        const data = await this.service.getAllBoards()
        res.json(data)
    }

    async getBoardTasks(req, res) {
        const data = await this.service.getBoardTasks()
        res.json(data)
    }

    async createBoard(req, res) {
        console.log(req.body)
        const data = await this.service.createBoard(req.body)
        res.json(data)
    }

    async createColumn(req, res) {
        const { board_columns, boardId } = req.body
        const data = await this.service.createColumn(board_columns, boardId)
        res.json(data)
    }

    async createTask(req, res) {
        const createdTask = await this.service.createTask(req.body)
        const createdSubTasks = await this.service.createSubTasks(req.body.sub_tasks, createdTask.id)
        const data = {
            ...createdTask,
            sub_tasks: createdSubTasks
        }
        console.log(data)
        res.json(data)
    }

    async editBoard(req, res) {
        // update board's columns
        const { board_columns, board_name } = req.body
        const boardId = Number(req.params.id)
        console.log('edit board payload', req.body)
        // - update the board name
        const updatedBoard = await this.service.updateBoard(board_name, boardId)
        // - update the current columns
        const updatedColumns = await this.service.updateColumn(
            board_columns.filter(col => col.id),
            boardId
        )
        // - create the added one
        const createdColumns = await this.service.createColumn(
            board_columns.filter(col => !col.id),
            boardId
        )
        // - delete the removed columns
        const boardColumnId = board_columns.map(col => col.id)
        const deletedColumns = await this.service.deleteColumn(
            updatedBoard.columns.filter(col => !boardColumnId.includes(col.id)),
            boardId
        )
        // get the latest board info
        const newBoard = await this.service.getBoard(boardId)

        console.log('update board ', updatedBoard)
        console.log('update columns ', updatedColumns)
        console.log('create column ', createdColumns)
        console.log('delete column ', deletedColumns)
        res.json(newBoard)
    }

    async editTask(req, res) {
        const taskId = Number(req.params.id)
        const taskInfo = req.body
        // update task info
        const updatedTask = await this.service.updateTask(taskInfo, taskId)
        // update subTask
        const updatedSubTasks = await this.service.updateSubTask(
            taskInfo.sub_tasks.filter(subtask => subtask.id),
            taskId
        )
        // create subTask
        const createdSubTasks = await this.service.createSubTasks(
            taskInfo.sub_tasks.filter(subtask => !subtask.id),
            taskId
        )
        console.log(updatedTask)
        // delete subTask
        const deletedSubTasks = await this.service.deleteSubTasks(
            updatedTask.sub_tasks.filter(subtask => !taskInfo.sub_tasks.map(item => item.id).includes(subtask.id))
        )

        const newTask = await this.service.getTask(taskId)

        res.json(newTask)
    }

    async updateSubTask(req, res) {
        const taskId = req.params.taskId
        const data = await this.service.updateSubTask(req.body, taskId)
        res.json(data)
    }

    async deleteBoard(req, res) {
        const boardId = Number(req.params.id)
        const data = await this.service.deleteBoard(boardId)
        console.log(data)
        res.json(data)
    }

    async deleteTask(req, res) {
        const taskId = Number(req.params.id)
        const data = await this.service.deleteTask(taskId)
        res.json(data)
    }
}

module.exports = TaskRouter
