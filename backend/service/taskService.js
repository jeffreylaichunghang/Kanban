// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()

class TaskService {
    constructor(prisma) {
        this.prisma = prisma
    }

    async getAllBoardsData() {
        const allBoardsData = await this.prisma.user.findFirst({
            where: {
                id: 1,
            },
            include: {
                boards: {
                    include: {
                        columns: {
                            include: {
                                tasks: {
                                    include: {
                                        sub_tasks: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return allBoardsData.boards
    }

    async geAllBoards(userId) {
        const boards = await this.prisma.board.findMany({
            where: { userId: userId }
        })
        return boards
    }

    async getBoardTasks(board) {
        const allTasks = await this.prisma.board.findFirst({
            where: {
                board_name: board,
            },
            include: {
                columns: {
                    include: {
                        tasks: {
                            include: {
                                sub_tasks: true
                            }
                        }
                    }
                },
            }
        })
        return allTasks
    }

    async getBoard(boardId) {
        return await this.prisma.board.findFirst({
            where: { id: boardId },
            include: { columns: true }
        })
    }

    async getTask(taskId) {
        return await this.prisma.task.findFirst({
            where: { id: taskId },
            include: { sub_tasks: true }
        })
    }

    async getBoardColumns(boardId) {
        const columns = await this.prisma.column.findMany({
            where: { boardId }
        })
        return columns
    }

    async createBoard(newBoard) {
        console.log(`create new board ${newBoard}`)
        const { board_name, board_columns } = newBoard
        try {
            const createdBoard = await this.prisma.$transaction(async tx => {
                const newBoard = await tx.board.create({
                    data: {
                        userId: 1,
                        board_name: board_name,
                    }
                })
                console.log('new board =', newBoard)
                return newBoard
            })
            const createdColumns = await this.createColumn(board_columns, createdBoard.id)
            return { createdBoard, createdColumns }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async createColumn(columns, boardId) {
        console.log(`create new columns ${columns} in board ${boardId}`)
        try {
            const createColumnsOperation = columns.map(col => {
                return this.prisma.column.create({
                    data: {
                        column_name: col.column_name,
                        boardId: boardId
                    }
                })
            })
            return await this.prisma.$transaction(createColumnsOperation)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async createTask(task) {
        console.log(`create new task ${task}`)
        try {
            return await this.prisma.$transaction(async tx => {
                return await tx.task.create({
                    data: {
                        task_name: task.task_name,
                        description: task.description,
                        columnId: task.columnId
                    }
                })
            })
        } catch (error) {
            console.error('error creating new task ', error);
            return error
        }
    }

    async createSubTasks(subtasks, taskId) {
        console.log(`create sub tasks at task ${taskId}`)
        try {
            const createSubtaskOperation = subtasks.map(subtask => {
                return this.prisma.subTask.create({
                    data: {
                        sub_task_name: subtask.sub_task_name,
                        status: subtask.status,
                        taskId: taskId
                    }
                })
            })
            return await this.prisma.$transaction(createSubtaskOperation)
        } catch (error) {
            console.error('error creating new sub task ', error);
            return error
        }
    }

    async updateBoard(board, boardId) {
        console.log(`update ${board} ${boardId}`)
        try {
            return await this.prisma.$transaction(async tx => {
                const updatedBoard = await tx.board.update({
                    where: {
                        id: boardId
                    },
                    data: {
                        board_name: board
                    },
                    include: {
                        columns: true
                    }
                })
                return updatedBoard
            })

        } catch (error) {
            console.error('error updating board', error)
            return error
        }
    }

    async updateColumn(column, boardId) {
        console.log('update column ', column)
        try {
            const updateColumnsOperation = column.map(col => {
                return this.prisma.column.update({
                    where: {
                        boardId,
                        id: col.id
                    },
                    data: {
                        column_name: col.column_name
                    }
                })
            })
            return await this.prisma.$transaction(updateColumnsOperation)
        } catch (error) {
            console.error('error updating column', error)
            return error
        }
    }

    async updateTask(task, taskId) {
        console.log(`update task ${taskId}`)
        try {
            return this.prisma.$transaction(async tx => {
                const updatedTask = await tx.task.update({
                    where: {
                        id: taskId,
                    },
                    data: {
                        task_name: task.task_name,
                        description: task.description,
                        columnId: task.columnId,
                    },
                    select: {
                        task_name: true,
                        description: true,
                        columnId: true,
                        sub_tasks: true
                    }
                })
                return updatedTask
            })
        } catch (error) {
            console.error('error updating task', error)
            return error
        }
    }

    async updateSubTask(subTasks, taskId) {
        console.log(`update subtask from task ${taskId}`)
        try {
            const updateSubTaskOperation = subTasks.map(subtask => {
                return this.prisma.subTask.update({
                    where: {
                        id: subtask.id,
                        taskId: subtask.taskId
                    },
                    data: {
                        sub_task_name: subtask.sub_task_name,
                        status: subtask.status,
                    }
                })
            })
            return await this.prisma.$transaction(updateSubTaskOperation)
        } catch (error) {
            console.error('error updating subtasks', error)
            return error
        }
    }

    async deleteBoard(boardId) {
        console.log('delete board =', boardId)
        try {
            return await this.prisma.$transaction(async tx => {
                const deletedBoard = await tx.board.delete({
                    where: {
                        id: boardId,
                    },
                    select: {
                        board_name: true,
                        id: true,
                    }
                })
                return deletedBoard
            })
        } catch (error) {
            console.error('error deleting board ', error)
            return error
        }
    }

    async deleteColumn(columns, boardId) {
        try {
            const deleteColumnOperation = columns.map(col => {
                return this.prisma.column.delete({
                    where: {
                        boardId,
                        id: col.id,
                    },
                    select: {
                        boardId: true,
                        id: true,
                        column_name: true
                    }
                })
            })
            return await this.prisma.$transaction(deleteColumnOperation)
        } catch (error) {
            console.error('error deleting column ', error)
            return error
        }
    }

    async deleteTask(taskId) {
        try {
            return await this.prisma.$transaction(async tx => {
                return await tx.task.delete({
                    where: {
                        id: taskId
                    },
                    select: {
                        id: true,
                        task_name: true
                    }
                })
            })
        } catch (error) {
            console.error('error deleting task ', error);
            return error
        }
    }

    async deleteSubTasks(subtasks) {
        try {
            const deleteSubtaskOperation = subtasks.map(subtask => {
                return this.prisma.subTask.delete({
                    where: {
                        id: subtask.id
                    },
                    select: {
                        id: true,
                        sub_task_name: true
                    }
                })
            })
            return await this.prisma.$transaction(deleteSubtaskOperation)
        } catch (error) {
            console.error('error deleting sub tasks ', error);
            return error
        }
    }
}

module.exports = TaskService
