const { parseArgs } = require('node:util')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// to seed the db, run: npx prisma db seed -- --environment development
// reset: npx prisma migrate reset

const options = {
    environment: { type: 'string' },
}

async function main() {
    const {
        values: { environment },
    } = parseArgs({ options })

    // const tablenames = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    // const tables = tablenames
    //     .map(({ tablename }) => tablename)
    //     .filter((name) => name !== '_prisma_migrations')
    //     .map((name) => `"public"."${name}"`)
    //     .join(', ')

    // try {
    //     await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
    // } catch (error) {
    //     console.log({ error })
    // }

    switch (environment) {
        case 'development':
            /** data for your development */
            const user = await prisma.user.create({
                data: {
                    email: 'jdoe@gmail.com',
                    first_name: 'John',
                    last_name: 'Doe',
                }
            })
            const userCredential = await prisma.user_Credential.create({
                data: {
                    userId: user.id
                }
            })
            const userProfile = await prisma.profile.create({
                data: {
                    userId: user.id,
                    userId: user.id,
                    sex: 'MALE',
                }
            })
            const boards = await prisma.board.createMany({
                data: [
                    {
                        board_name: 'Platform Launch',
                        userId: user.id,
                    },
                    {
                        board_name: 'Marketing Plan',
                        userId: user.id,
                    },
                    {
                        board_name: 'Roadmap',
                        userId: user.id,
                    },
                ]
            })
            const columns = await prisma.column.createMany({
                data: [
                    {
                        column_name: 'Todo',
                        boardId: 1
                    },
                    {
                        column_name: 'Doing',
                        boardId: 1
                    },
                    {
                        column_name: 'Done',
                        boardId: 1
                    },
                    {
                        column_name: 'Todo',
                        boardId: 2
                    },
                    {
                        column_name: 'Doing',
                        boardId: 2
                    },
                    {
                        column_name: 'Done',
                        boardId: 2
                    },
                    {
                        column_name: 'Now',
                        boardId: 3
                    },
                    {
                        column_name: 'Next',
                        boardId: 3
                    },
                    {
                        column_name: 'Later',
                        boardId: 3
                    },
                ]
            })
            const tasks = await prisma.task.createMany({
                data: [
                    {
                        columnId: 1,
                        task_name: 'Build UI for onboarding flow',
                        description: ''
                    },
                    {
                        columnId: 1,
                        task_name: 'Build UI for search',
                        description: ''
                    },
                    {
                        columnId: 1,
                        task_name: 'Build settings UI',
                        description: ''
                    },
                    {
                        columnId: 1,
                        task_name: 'QA and test all major user journeys',
                        description: 'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.'
                    },
                    {
                        columnId: 2,
                        task_name: 'Design settings and search pages',
                        description: ''
                    },
                    {
                        columnId: 2,
                        task_name: 'Add account management endpoints',
                        description: ''
                    },
                    {
                        columnId: 2,
                        task_name: 'Design onboarding flow',
                        description: ''
                    },
                    {
                        columnId: 2,
                        task_name: 'Add search endpoints',
                        description: ''
                    },
                    {
                        columnId: 2,
                        task_name: 'Add authentication endpoints',
                        description: ''
                    },
                    {
                        columnId: 2,
                        task_name: 'Research pricing points of various competitors and trial different business models',
                        description: 'We know what we\'re planning to build for version one.Now we need to finalise the first pricing model we\'ll use. Keep iterating the subtasks until we have a coherent proposition.'
                    },
                    {
                        columnId: 3,
                        task_name: 'Conduct 5 wireframe tests',
                        description: 'Ensure the layout continues to make sense and we have strong buy-in from potential users.'
                    },
                    {
                        columnId: 3,
                        task_name: 'Create wireframe prototype',
                        description: 'Create a greyscale clickable wireframe prototype to test our asssumptions so far.'
                    },
                    {
                        columnId: 3,
                        task_name: 'Review results of usability tests and iterate',
                        description: 'Keep iterating through the subtasks until we\'re clear on the core concepts for the app.'
                    },
                    {
                        columnId: 3,
                        task_name: 'Create paper prototypes and conduct 10 usability tests with potential customers',
                        description: ''
                    },
                    {
                        columnId: 3,
                        task_name: 'Market discovery',
                        description: 'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.'
                    },
                    {
                        columnId: 3,
                        task_name: 'Competitor analysis',
                        description: ''
                    },
                    {
                        columnId: 3,
                        task_name: 'Research the market',
                        description: 'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.'
                    },
                    {
                        columnId: 4,
                        task_name: 'Plan Product Hunt launch',
                        description: ''
                    },
                    {
                        columnId: 4,
                        task_name: 'Share on Show HN',
                        description: ''
                    },
                    {
                        columnId: 4,
                        task_name: 'Write launch article to publish on multiple channels',
                        description: ''
                    },
                    {
                        columnId: 7,
                        task_name: 'Launch version one',
                        description: ''
                    },
                    {
                        columnId: 7,
                        task_name: 'Review early feedback and plan next steps for roadmap',
                        description: 'Beyond the initial launch, we\'re keeping the initial roadmap completely empty.This meeting will help us plan out our next steps based on actual customer feedback.'
                    },
                ]
            })
            const subTasks = await prisma.subTask.createMany({
                data: [
                    {
                        taskId: 1,
                        sub_task_name: 'Sign up page',
                        status: true,
                    },
                    {
                        taskId: 1,
                        sub_task_name: 'Sign in page',
                        status: false,
                    },
                    {
                        taskId: 1,
                        sub_task_name: 'Welcome page',
                        status: false,
                    },
                    {
                        taskId: 2,
                        sub_task_name: 'Search page',
                        status: false,
                    },
                    {
                        taskId: 3,
                        sub_task_name: 'Account page',
                        status: false,
                    },
                    {
                        taskId: 3,
                        sub_task_name: 'Billing page',
                        status: false,
                    },
                    {
                        taskId: 4,
                        sub_task_name: 'Internal testing',
                        status: false,
                    },
                    {
                        taskId: 4,
                        sub_task_name: 'External testing',
                        status: false,
                    },
                    {
                        taskId: 5,
                        sub_task_name: 'Settings - Account page',
                        status: true,
                    },
                    {
                        taskId: 5,
                        sub_task_name: 'Settings - Billing page',
                        status: true,
                    },
                    {
                        taskId: 5,
                        sub_task_name: 'Search page',
                        status: false,
                    },
                    {
                        taskId: 6,
                        sub_task_name: 'Upgrade plan',
                        status: true,
                    },
                    {
                        taskId: 6,
                        sub_task_name: 'Cancel plan',
                        status: true,
                    },
                    {
                        taskId: 6,
                        sub_task_name: 'Update payment method',
                        status: false,
                    },
                    {
                        taskId: 7,
                        sub_task_name: 'Sign up page',
                        status: true,
                    },
                    {
                        taskId: 7,
                        sub_task_name: 'Sign in page',
                        status: false,
                    },
                    {
                        taskId: 7,
                        sub_task_name: 'Welcome page',
                        status: false,
                    },
                    {
                        taskId: 8,
                        sub_task_name: 'Add search endpoint',
                        status: true,
                    },
                    {
                        taskId: 8,
                        sub_task_name: 'Define search filters',
                        status: false,
                    },
                    {
                        taskId: 9,
                        sub_task_name: 'Define user model',
                        status: true,
                    },
                    {
                        taskId: 9,
                        sub_task_name: 'Add auth endpoints',
                        status: false,
                    },
                    {
                        taskId: 10,
                        sub_task_name: 'Research competitor pricing and business models',
                        status: true,
                    },
                    {
                        taskId: 10,
                        sub_task_name: 'Outline a business model that works for our solution',
                        status: false,
                    },
                    {
                        taskId: 10,
                        sub_task_name: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                        status: false,
                    },
                    {
                        taskId: 11,
                        sub_task_name: 'Complete 5 wireframe prototype tests',
                        status: true,
                    },
                    {
                        taskId: 12,
                        sub_task_name: 'Create clickable wireframe prototype in Balsamiq: "Complete 5 wireframe prototype tests',
                        status: true,
                    },
                    {
                        taskId: 13,
                        sub_task_name: 'Meet to review notes from previous tests and plan changes',
                        status: true,
                    },
                    {
                        taskId: 13,
                        sub_task_name: 'Make changes to paper prototypes',
                        status: true,
                    },
                    {
                        taskId: 13,
                        sub_task_name: 'Conduct 5 usability tests',
                        status: true,
                    },
                    {
                        taskId: 14,
                        sub_task_name: 'Create paper prototypes for version one',
                        status: true,
                    },
                    {
                        taskId: 14,
                        sub_task_name: 'Complete 10 usability tests',
                        status: true,
                    },
                    {
                        taskId: 15,
                        sub_task_name: 'Interview 10 prospective customers',
                        status: true,
                    },
                    {
                        taskId: 16,
                        sub_task_name: 'Find direct and indirect competitors',
                        status: true,
                    },
                    {
                        taskId: 16,
                        sub_task_name: 'SWOT analysis for each competitor',
                        status: true,
                    },
                    {
                        taskId: 17,
                        sub_task_name: 'Write up research analysis',
                        status: true,
                    },
                    {
                        taskId: 17,
                        sub_task_name: 'Calculate TAM',
                        status: true,
                    },
                    {
                        taskId: 18,
                        sub_task_name: 'Find hunter',
                        status: false,
                    },
                    {
                        taskId: 18,
                        sub_task_name: 'Gather assets',
                        status: false,
                    },
                    {
                        taskId: 18,
                        sub_task_name: 'Draft product page',
                        status: false,
                    },
                    {
                        taskId: 18,
                        sub_task_name: 'Notify customers',
                        status: false,
                    },
                    {
                        taskId: 18,
                        sub_task_name: 'Notify network',
                        status: false,
                    },
                    {
                        taskId: 18,
                        sub_task_name: 'Launch!',
                        status: false,
                    },
                    {
                        taskId: 19,
                        sub_task_name: 'Draft out HN post',
                        status: false,
                    },
                    {
                        taskId: 19,
                        sub_task_name: 'Get feedback and refine',
                        status: false,
                    },
                    {
                        taskId: 19,
                        sub_task_name: 'Publish post',
                        status: false,
                    },
                    {
                        taskId: 20,
                        sub_task_name: 'Write article',
                        status: false,
                    },
                    {
                        taskId: 20,
                        sub_task_name: 'Publish on LinkedIn',
                        status: false,
                    },
                    {
                        taskId: 20,
                        sub_task_name: 'Publish on Inndie Hackers',
                        status: false,
                    },
                    {
                        taskId: 20,
                        sub_task_name: 'Publish on Medium',
                        status: false,
                    },
                    {
                        taskId: 21,
                        sub_task_name: 'Launch privately to our waitlist',
                        status: false,
                    },
                    {
                        taskId: 21,
                        sub_task_name: 'Launch publicly on PH, HN, etc.',
                        status: false,
                    },
                    {
                        taskId: 22,
                        sub_task_name: 'Interview 10 customers',
                        status: false,
                    },
                    {
                        taskId: 22,
                        sub_task_name: 'Review common customer pain points and suggestions',
                        status: false,
                    },
                    {
                        taskId: 22,
                        sub_task_name: 'Outline next steps for our roadmap',
                        status: false,
                    },
                ]
            })
            break
        case 'test':
            /** data for your test environment */
            break
        case 'production':
            /** data for your production environment */
            break
        default:
            break
    }

}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
