import { useForm } from "react-hook-form"
import useApiCall from '../../hooks/useApiCall'
import { redirect, useNavigate } from 'react-router-dom'

import Input from "../../components/Input"
import Button from "../../components/Button"
import { useEffect } from "react"

export default function SigninForm() {
    const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur' || 'onSubmit'
    })
    const { value: authenticated, loading: authenticating, error: notauthenticated, callApi: authenticate } = useApiCall('login', 'POST')
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
            console.log(authenticated)
            const { token, message } = authenticated
            localStorage.setItem('secret_token', token)
            navigate('/kanbanBoard')
        }
        if (notauthenticated) {
            console.log(notauthenticated)
        }
    }, [authenticated, notauthenticated])

    const onSubmit = (data) => {
        console.log(data)
        reset(undefined, {
            keepDirtyValues: true,
            keepErrors: false,
            keepValues: true,
        })
        if (data) authenticate(data)
    }

    // const navigate = (url) => {
    //     return redirect(url)
    // }

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
                />
                <Button
                    text="Sign Up"
                    variant="secondary"
                    style={styles.button}
                />
            </div>
        </form>
    )
}
