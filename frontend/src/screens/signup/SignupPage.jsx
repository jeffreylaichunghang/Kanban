import { useContext, useState } from "react"
import { ThemeContext, MediaQueryContext } from '../../themes/index'
import useWindowDimension from '../../hooks/useWindowDimension'

import Sidebar from "./Sidebar"
import SignupForm from "./SignupForm"
import Text from "../../components/Text"
import { useForm, FormProvider } from "react-hook-form"

export default function SignupPage() {
    const methods = useForm()
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: '',
        plan: {
            name: 'Arcade',
            price: 9
        },
        paymentPeriod: 'Monthly',
        addons: [],
    })
    const [step, setStep] = useState(1)
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width, height } = useWindowDimension()
    let priceofplans, priceofAddons;
    if (signupData.paymentPeriod === 'Monthly') {
        priceofplans = [9, 12, 15]
        priceofAddons = [1, 2, 2]
    } else if (signupData.paymentPeriod === 'Yearly') {
        priceofplans = [90, 120, 150]
        priceofAddons = [10, 20, 20]
    }

    const inputOnchange = (e) => {
        setSignupData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        methods.clearErrors(e.target.name)
    }

    const addonsOnchange = (addon, price) => {
        setSignupData(prev => {
            const item = { addon, price }
            const newAddons = [...prev.addons]
            if (!prev.addons.map(addon => addon.addon).includes(addon)) {
                return {
                    ...prev,
                    addons: newAddons.concat(item)
                }
            } else {
                return {
                    ...prev,
                    addons: newAddons.filter(addon => addon.addon !== item.addon)
                }
            }
        })
    }

    const renderItems = [
        {
            title: 'Personal info',
            subTitle: 'Please provide your name, email address, and password.',
            componentData: [
                {
                    props: {
                        label: 'Name',
                        name: 'name',
                        placeholder: 'e.g. Stephen King',
                        value: signupData.name,
                        type: 'text',
                        onChange: inputOnchange,
                    },
                    component: 'labeledInput',
                },
                {
                    props: {
                        label: 'Email Address',
                        name: 'email',
                        placeholder: 'e.g. stephenking@lorem.com',
                        value: signupData.email,
                        type: 'email',
                        onChange: inputOnchange,
                    },
                    component: 'labeledInput',
                },
                {
                    props: {
                        label: 'Password',
                        name: 'password',
                        placeholder: '',
                        value: signupData.password,
                        type: 'password',
                        onChange: inputOnchange,
                    },
                    component: 'labeledInput',
                },
            ]
        },
        {
            title: 'Select your plan',
            subTitle: 'You have the option of monthly or yearly billing',
            componentData: [
                {
                    props: {
                        image: ['ArcadeIcon', 'AdvancedIcon', 'ProIcon'],
                        name: ['Arcade', 'Advanced', 'Pro'],
                        price: priceofplans,
                        defaultPlan: signupData.plan.name,
                        priceunit: signupData.paymentPeriod,
                        setSignupData: setSignupData,
                    },
                    component: 'pricingCardGroup'
                },
                {
                    props: {
                        leftLabel: <Text variant="body" size="m" text="Monthly" color={theme.color.secondaryText} />,
                        rightLabel: <Text variant="body" size="m" text="Yearly" color={theme.color.secondaryText} />,
                        defaultValue: signupData.paymentPeriod === 'Monthly',
                        onClick: () => setSignupData(prev => ({
                            ...prev,
                            paymentPeriod: prev.paymentPeriod === 'Yearly' ? 'Monthly' : 'Yearly'
                        }))
                    },
                    component: 'toggleSwitch'
                },
            ],
        },
        {
            title: 'Pick add-ons',
            subTitle: 'Add-ons help enhance your app experience',
            componentData: [
                {
                    props: {
                        text: 'Group Project',
                        subText: 'Work together on the same board',
                        price: priceofAddons[0],
                        onChange: () => addonsOnchange('Group Project', priceofAddons[0]),
                        priceunit: signupData.paymentPeriod,

                    },
                    component: 'addons',
                },
                {
                    props: {
                        text: 'Larger storage',
                        subText: 'Extra 1TB of cloud save',
                        price: priceofAddons[1],
                        onChange: () => addonsOnchange('Larger storage', priceofAddons[1]),
                        priceunit: signupData.paymentPeriod,

                    },
                    component: 'addons',
                },
                {
                    props: {
                        text: 'Customizable Profile',
                        subText: 'Custom theme on your profile',
                        price: priceofAddons[2],
                        onChange: () => addonsOnchange('Customizable Profile', priceofAddons[2]),
                        priceunit: signupData.paymentPeriod,

                    },
                    component: 'addons',
                },
            ],
        },
        {
            title: 'Finishing up',
            subTitle: 'Double-check everything looks OK before confirming.',
            componentData: [
                {
                    props: signupData,
                    component: 'cartSummary'
                }
            ],
        },
    ]

    return (
        <div
            style={{
                backgroundColor: theme.color.backgroundPrimary,
                width: width,
                height: height,
                overflow: 'none',
                display: 'grid',
                placeItems: 'center'
            }}
        >
            <div
                style={{
                    // border: '1px solid white',
                    width: layout.signupContainerWidth,
                    height: layout.signupContainerHeight,
                    backgroundColor: theme.color.backgroundSecondary,
                    borderRadius: 15,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    padding: layout.signupContainerPadding,
                }}
            >
                <Sidebar
                    step={step}
                    setStep={setStep}
                />
                <FormProvider {...methods}>
                    <SignupForm
                        renderItems={renderItems}
                        step={step}
                        setStep={setStep}
                        signupData={signupData}
                    />
                </FormProvider>
            </div>
        </div>
    )
}
