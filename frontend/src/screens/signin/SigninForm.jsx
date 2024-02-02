import { useEffect } from "react"
import { useForm } from "react-hook-form"
import useApiCall from '../../hooks/useApiCall'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../hooks/useAuth"

import Input from "../../components/Input"
import Button from "../../components/Button"

const authUrl = import.meta.env.VITE_AUTH_URL

export default function SigninForm() {
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur' || 'onSubmit',
        resetOptions: {
            keepDirtyValues: true,
            keepErrors: true
        }
    })
    const { value: authenticated, loading: authenticating, error: notauthenticated, callApi: authenticate } = useApiCall('login', 'POST', authUrl)
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const styles = {
        button: {
            width: '100%',
            padding: 10
        }
    }

    const registerOptions = {
        'email': {
            required: 'email is required',
            pattern: {
                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                message: 'wrong email format'
            },
        },
        'password': {
            required: 'password is required'
        }
    }

    useEffect(() => {
        if (authenticated) {
            // console.log(authenticated)
            const { token, message } = authenticated
            localStorage.setItem('secret_token', token)
            setUser(token)
            navigate('/kanbanBoard')
        }
        if (notauthenticated) {
            console.log(notauthenticated)
            const data = notauthenticated.response.data
            if (data.message === 'wrong password') {
                setError('password', data)
            } else if (data.message === 'user not found') {
                setError('email', data)
            }
        }
    }, [authenticated, notauthenticated])

    const onSubmit = (data) => {
        // reset(undefined, {
        //     keepDirtyValues: true,
        //     keepErrors: false,
        //     keepValues: true,
        // })
        if (data) authenticate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                ['email', 'password'].map((field, index) => {
                    return (
                        <Input
                            key={index}
                            label={field}
                            type={field}
                            placeholder={field}
                            validation={errors[field]}
                            {...register(field, registerOptions[field])}
                        />
                    )
                })
            }
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    columnGap: 10,
                    marginTop: 32,
                }}
            >
                <Button
                    text="Sign In"
                    variant="primary"
                    style={styles.button}
                    type={'submit'}
                    disabled={authenticating}
                />
                <Button
                    text="Sign Up"
                    variant="secondary"
                    style={styles.button}
                    disabled={authenticating}
                    onClick={() => navigate('/signup')}
                />
            </div>
        </form>
    )
}
