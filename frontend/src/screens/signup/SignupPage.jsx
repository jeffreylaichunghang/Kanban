import { useContext, useState } from "react"
import { ThemeContext, MediaQueryContext } from '../../themes/index'
import useWindowDimension from '../../hooks/useWindowDimension'

import Sidebar from "./Sidebar"
import SignupForm from "./SignupForm"
import Text from "../../components/Text"

export default function SignupPage() {
    const [step, setStep] = useState(1)
    const { theme } = useContext(ThemeContext)
    const { layout, isMobile } = useContext(MediaQueryContext)
    const { width, height } = useWindowDimension()

    const renderItems = [
        {
            title: 'Personal info',
            subTitle: 'Please provide your name, email address, and phone number.',
            componentData: [
                {
                    props: {
                        label: 'Name',
                        name: 'name',
                        placeholder: 'e.g. Stephen King',
                        value: '',
                        type: 'text',
                    },
                    component: 'labeledInput',
                },
                {
                    props: {
                        label: 'Email Address',
                        name: 'email',
                        placeholder: 'e.g. stephenking@lorem.com',
                        value: '',
                        type: 'email',
                    },
                    component: 'labeledInput',
                },
                {
                    props: {
                        label: 'Phone Number',
                        name: 'phone_number',
                        placeholder: 'e.g. Stephen King',
                        value: '',
                        type: 'tel',
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
                        price: [9, 12, 15],
                        defaultPlan: 'Arcade',
                    },
                    component: 'pricingCardGroup'
                },
                {
                    props: {
                        toggleValue: ['Monthly, Yearly'],
                        leftLabel: <Text variant="body" size="m" text="Monthly" color={theme.color.secondaryText} />,
                        rightLabel: <Text variant="body" size="m" text="Yearly" color={theme.color.secondaryText} />,
                        defaultValue: 'Monthly' === 'Monthly',
                        onclick: () => true
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
                        price: 1,
                    },
                    component: 'addons'
                },
                {
                    props: {
                        text: 'Larger storage',
                        subText: 'Extra 1TB of cloud save',
                        price: 2,
                    },
                    component: 'addons'
                },
                {
                    props: {
                        text: 'Customizable Profile',
                        subText: 'Custom theme on your profile',
                        price: 2,
                    },
                    component: 'addons'
                },
            ],
        },
        {
            title: 'Finishing up',
            subTitle: 'Double-check everything looks OK before confirming.',
            componentData: [
                {
                    props: {
                        plan: 'Arcade',
                        toggleValue: 'Monthly',
                        addons: [
                            {
                                addon: 'Group Project',
                                price: 1
                            },
                            {
                                addon: 'Larger Storage',
                                price: 2
                            },
                        ],
                        total: 12,
                    },
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
                <Sidebar />
                <SignupForm
                    renderItems={renderItems}
                    step={step}
                    setStep={setStep}
                />
            </div>
        </div>
    )
}
