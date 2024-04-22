import { Fragment, useContext, useEffect, useState, useRef } from "react"
import { ThemeContext, MediaQueryContext } from '../../themes/index'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import useApiCall from "../../hooks/useApiCall"
import { useFormContext } from "react-hook-form"

import Button from "../../components/Button"
import Text from "../../components/Text"
import LabeledInput from "../../components/LabeledInput"
import PricingCardGroup from "../../components/Signup/PricingCardGroup"
import ToggleSwitch from "../../components/ToggleSwitch"
import Addons from "../../components/Signup/Addons"
import CartSummary from "../../components/Signup/CartSummary"

const authUrl = import.meta.env.VITE_AUTH_URL

const RenderComponent = {
    labeledInput: LabeledInput,
    pricingCardGroup: PricingCardGroup,
    toggleSwitch: ToggleSwitch,
    addons: Addons,
    cartSummary: CartSummary,
}

export default function SignupForm({
    renderItems,
    step,
    setStep,
    signupData,
}) {
    const { handleSubmit, setError, formState: { errors } } = useFormContext()
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { value: signupSuccess, loading: signingup, error: signupFail, callApi: signup } = useApiCall('signup', 'POST', authUrl)
    const navigate = useNavigate()
    const itemsRef = useRef(0)

    const FORM_MARGIN = isMobile ? 15 : 90;
    const FORM_WIDTH = isMobile ? 345 : layout.signupContainerWidth - layout.signupSidebarWidth

    useEffect(() => {
        if (signupSuccess) return navigate('/signin')
        if (signupFail) {
            console.log(signupFail.response)
            setStep(1)
            itemsRef.current = 0
            const data = signupFail.response.data
            if (data.message === 'email already exists') {
                setError('email', data)
            }
        }
    }, [signupSuccess, signupFail])

    const submitForm = (data) => {
        if (step < renderItems.length) {
            return setStep(prev => {
                let nextStep = prev;
                if (prev < renderItems.length) {
                    nextStep++
                    itemsRef.current += isMobile ? FORM_WIDTH : FORM_WIDTH - FORM_MARGIN * 2
                }
                return nextStep
            })
        } else if (step === renderItems.length) {
            console.log(data);
            signup({
                email: data.email,
                password: data.password
            })
        }
    }
    return (
        <form
            style={{
                height: isMobile ? layout.signupContainerHeight - layout.signupSidebarHeight : '100%',
                width: FORM_WIDTH,
                marginLeft: FORM_MARGIN,
                marginRight: FORM_MARGIN,
                overflow: 'hidden',
                translate: `0 ${isMobile ? '-10%' : 0}`,
            }}
            onSubmit={handleSubmit(submitForm)}
        >
            <div>
                <ul
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        overflowY: 'none',
                        height: isMobile ? layout.signupContainerHeight - layout.signupSidebarHeight - 100 : layout.signupContainerHeight - 100,
                        minWidth: '100%',
                        borderRadius: 15,
                        backgroundColor: isMobile ? theme.color.white : theme.color.backgroundSecondary,
                    }}
                >{renderItems.map((renderItem, index) => (
                    <motion.li
                        key={`signup_step_${index}`}
                        style={{
                            height: '100%',
                            minWidth: isMobile ? FORM_WIDTH : FORM_WIDTH - FORM_MARGIN * 2,
                            listStyle: 'none',
                            paddingTop: isMobile ? 20 : 40,
                            paddingLeft: 15,
                            paddingRight: 15,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ x: -itemsRef.current, opacity: 1 }}
                        transition={{
                            type: 'spring',
                            duration: 0.3,
                            stiffness: 90,
                            damping: 15,
                        }}
                    >
                        <Text
                            variant="heading"
                            size="xl"
                            text={renderItem.title}
                            color={isMobile ? theme.color.mainPurple : theme.color.primaryText}
                            style={{ marginBottom: 10 }}
                        />
                        <Text
                            variant="body"
                            size="l"
                            text={renderItem.subTitle}
                            color={theme.color.secondaryText}
                        />
                        <motion.div
                            style={{
                                marginTop: isMobile ? 12 : 25,
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: isMobile ? 5 : 15,
                            }}
                        >
                            {renderItem.componentData.map(({ component, props }, itemIndex) => (
                                <Fragment key={`${renderItem.title}_${itemIndex}`}>
                                    {
                                        RenderComponent[component]({
                                            ...props,
                                            validation: errors[props.name]
                                        })
                                    }
                                </Fragment>
                            ))}
                        </motion.div>
                    </motion.li>
                ))}</ul>
            </div>
            <div
                style={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: isMobile ? 20 : 0
                }}
                data-test-id='signup-buttons'
            >
                <Button
                    text={step > 1 ? "Back" : "Cancel"}
                    variant="secondary"
                    onClick={() => {
                        let nextStep = step;
                        if (step > 1) {
                            nextStep--
                            itemsRef.current -= isMobile ? FORM_WIDTH : FORM_WIDTH - FORM_MARGIN * 2
                        }
                        setStep(nextStep)
                        if (step === 1) navigate('/signin')
                    }}
                />
                <Button
                    text={step === renderItems.length ? "Confirm" : "Next"}
                    variant="primary"
                    type={'submit'}
                    disabled={signingup}
                />
            </div>
        </form>
    )
}
