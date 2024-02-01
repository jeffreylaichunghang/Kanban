import { useContext } from 'react'
import { ThemeContext, MediaQueryContext } from '../../themes'

import Text from '../Text'

function CartSummary({
    plan,
    paymentPeriod,
    addons
}) {
    const { theme } = useContext(ThemeContext)
    const { isMobile } = useContext(MediaQueryContext)
    const styles = {
        summaryText: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    }
    let addonsPrice, totalPrice;
    addonsPrice = addons.map(addon => addon.price).reduce((acc, cur) => acc + cur, 0)
    totalPrice = plan.price + addonsPrice
    if (paymentPeriod === 'Yearly') totalPrice -= 2
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
                        ...styles.summaryText
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
                        text={`$${plan.price}/${paymentPeriod === 'Monthly' ? 'mo' : 'yr'}`}
                        color={theme.color.primaryText}
                    />
                </div>
                {
                    paymentPeriod === 'Yearly' &&
                    <div style={{ ...styles.summaryText }}>
                        <Text
                            variant='body'
                            size='l'
                            text={'Two Years Free'}
                            color={theme.color.destructiveHover}
                        />
                        <Text
                            variant='body'
                            size='l'
                            text={'-$2/yr'}
                            color={theme.color.destructiveHover}
                        />
                    </div>
                }
                <hr style={{
                    border: `0.5px solid ${theme.color.borderLine}`,
                    marginTop: isMobile ? 5 : 20,
                    marginBottom: isMobile ? 5 : 20,
                }} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: isMobile ? 15 : 20,
                    }}
                >
                    {
                        addons.length > 0 ?
                            addons.map((addon, index) => {
                                return (
                                    <div
                                        key={`addon_${index}`}
                                        style={{
                                            ...styles.summaryText
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
                                            text={`$${addon.price}/${paymentPeriod === 'Monthly' ? 'mo' : 'yr'}`}
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
                    ...styles.summaryText,
                    padding: isMobile ? 10 : 20,
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
                    text={`+$${totalPrice}/${paymentPeriod === 'Monthly' ? 'mo' : 'yr'}`}
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
