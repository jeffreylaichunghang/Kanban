const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const bcrypt = require('bcrypt')
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()

module.exports = (passport, prisma) => {
    passport.use(
        'signup',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                try {
                    const emailExist = await prisma.user.findFirst({
                        where: {
                            email
                        }
                    })
                    if (emailExist) {
                        console.log('email already exist')
                        return done(null, false, { message: 'email already exists' })
                    }
                    const user = await prisma.user.create({
                        data: {
                            email,
                            first_name: req.body.first_name || null,
                            last_name: req.body.last_name || null
                        }
                    })
                    const userCredential = await prisma.user_Credential.create({
                        data: {
                            password: await bcrypt.hash(password, 10),
                            userId: user.id
                        }
                    })
                    const profile = await prisma.profile.create({
                        data: {
                            userId: user.id,
                            sex: req.body.sex || 'PREFER_NOT_TO_SAY'
                        }
                    })
                    // console.log(user)
                    // console.log(userCredential)
                    // console.log(profile)
                    return done(null, user)
                } catch (error) {
                    console.log(error)
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'login',
        new localStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            email
                        }
                    })
                    if (!user) return done(null, false, { message: 'user not found' })

                    // validate password
                    const userCredential = await prisma.user_Credential.findFirst({
                        where: {
                            userId: user.id
                        }
                    })
                    const correctPassword = await bcrypt.compare(password, userCredential.password)
                    if (!correctPassword) return done(null, false, { message: 'wrong password' })
                    return done(null, user, { message: 'Logged in Successfully' })
                } catch (error) {
                    return done(error)
                }
            }
        ),
    )

    passport.use(
        new JWTstrategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            },
            async (token, done) => {
                console.log('authorizing ...:', token)
                try {
                    return done(null, token.user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}
