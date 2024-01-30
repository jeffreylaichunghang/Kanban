class AuthRouter {
    constructor(express, passport, jwt) {
        this.express = express
        this.passport = passport
        this.jwt = jwt
    }

    route() {
        const router = this.express.Router()

        // router.get('/user')
        router.post('/signup', this.signup.bind(this))
        router.post('/login', this.login.bind(this))
        // router.put('/user/:id')

        return router
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
