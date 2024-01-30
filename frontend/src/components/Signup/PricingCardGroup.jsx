import { useEffect, useState } from "react"

import PricingCard from "./PricingCard"

export default function PricingCardGroup({
    image,
    name,
    price,
    defaultPlan
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
                        selected={selected}
                        setSelected={setSelected}
                    />
                ))
            }
        </div>
    )
}
