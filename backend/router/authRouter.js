class AuthRouter {
    constructor(express, passport, jwt, service) {
        this.express = express
        this.passport = passport
        this.jwt = jwt
        this.service = service
    }

    route() {
        const router = this.express.Router()

        router.get('/user/:email', this.getUserByEmail.bind(this))
        router.post('/signup', this.signup.bind(this))
        router.post('/login', this.login.bind(this))
        // router.put('/user/:id')
        router.delete('/user/:email', this.deleteUser.bind(this))

        return router
    }

    async getUserByEmail(req, res) {
        const email = req.params.email
        console.log(`getting user with email: `.email)
        const user = await this.service.findUserByEmail(email)
        res.json(user)
    }

    async deleteUser(req, res) {
        const email = req.params.email

        const userFound = await this.service.findUserByEmail(email)

        if (userFound) {
            console.log(`deleting user with email: `.email)
            await this.service.deleteUser(email)
            res.json('user deleted')
        } else {
            res.status(404).send('user doesn\'t exist')
        }
    }

    async signup(req, res, next) {
        this.passport.authenticate(
            'signup',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        // return next(new Error('An error occurred', info))
                        return res.status(500).json(info)
                    }
                    res.json({
                        message: 'Signup successful',
                        user: req.user
                    })
                } catch (error) {
                    return next(error)
                }
            }
        )(req, res, next)
    }

    async login(req, res, next) {
        this.passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        // return next(new Error('An error occurred', info))
                        return res.status(500).json(info)
                    }

                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error)

                            const body = { id: user.id, email: user.email }
                            const token = this.jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '30d' })

                            // res.cookie('jwt', token, {
                            //     httpOnly: true,
                            //     secure: process.env.NODE_ENV !== 'development',
                            //     sameSite: 'strict',
                            //     maxAge: 30 * 24 * 60 * 60 * 1000,
                            // })

                            return res.status(200).json({ token, message: 'user logged in' })
                        }
                    )
                } catch (error) {
                    return next(error)
                }
            }
        )(req, res, next)
    }
}

module.exports = AuthRouter
