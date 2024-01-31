import { useContext } from 'react'
import { ThemeContext } from '../../themes'

import Text from '../Text'

function CartSummary({
    plan,
    paymentPeriod,
    addons
}) {
    const { theme } = useContext(ThemeContext)
    let addonsPrice;
    addonsPrice = addons.map(addon => addon.price).reduce((acc, cur) => acc + cur, 0)
    return (
        <div>
            <div
                style={{
                    backgroundColor: theme.color.backgroundPrimary,
                    borderRadius: 10,
                    padding: 20,

                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        variant='body'
                        size='l'
                        text={`${plan.name} (${paymentPeriod})`}
                        color={theme.color.primaryText}
                    />
                    <Text
                        variant='body'
                        size='l'
                        text={`${plan.price}/${paymentPeriod === 'Monthly' ? 'mo' : 'yr'}`}
                        color={theme.color.primaryText}
                    />
                </div>
                <hr style={{
                    border: `0.5px solid ${theme.color.borderLine}`,
                    marginTop: 20,
                    marginBottom: 20,
                }} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 20,
                    }}
                >
                    {
                        addons.length > 0 ?
                            addons.map((addon, index) => {
                                return (
                                    <div
                                        key={`addon_${index}`}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            variant='body'
                                            size='l'
                                            text={addon.addon}
                                            color={theme.color.secondaryText}
                                        />
                                        <Text
                                            variant='body'
                                            size='l'
                                            text={`${addon.price}/${paymentPeriod === 'Monthly' ? 'mo' : 'yr'}`}
                                            color={theme.color.secondaryText}
                                        />
                                    </div>
                                )
                            }) :
                            <Text
                                variant='body'
                                size='l'
                                text={'No additional addon'}
                                color={theme.color.secondaryText}
                            />
                    }
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 20,
                }}
            >
                <Text
                    variant='body'
                    size='l'
                    text={`Total (per ${paymentPeriod === 'Monthly' ? 'month' : 'year'})`}
                    color={theme.color.secondaryText}
                />
                <Text
                    variant='heading'
                    size='xl'
                    text={`+${plan.price + addonsPrice}/${paymentPeriod === 'Monthly' ? 'mo' : 'yr'}`}
                    color={theme.color.primary}
                    style={{
                        fontWeight: 'bolder'
                    }}
                />
            </div>
        </div>
    )
}

export default CartSummary
