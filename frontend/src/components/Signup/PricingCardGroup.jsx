import { useEffect, useState } from "react"

import PricingCard from "./PricingCard"

export default function PricingCardGroup({
    image,
    name,
    price,
    defaultPlan = '',
    setSignupData,
    priceunit,
}) {
    const [selected, setSelected] = useState(defaultPlan)

    useEffect(() => {
        setSelected(defaultPlan)
    }, [defaultPlan])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                columnGap: 10,
                width: '100%'
            }}
        >
            {
                name.map((plan, index) => (
                    <PricingCard
                        key={index}
                        name={plan}
                        price={price[index]}
                        image={image[index]}
                        defaultPlan={defaultPlan}
                        selected={selected}
                        setSelected={setSelected}
                        priceunit={priceunit}
                        onClick={() => setSignupData(prev => ({
                            ...prev,
                            plan: {
                                name: plan,
                                price: price[index]
                            }
                        }))}
                    />
                ))
            }
        </div>
    )
}
