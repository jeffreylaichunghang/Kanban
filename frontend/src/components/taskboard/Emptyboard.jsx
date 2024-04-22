import { useContext } from 'react'
import { ThemeContext, MediaQueryContext } from '../../themes'

import Text from '../Text'
import Button from '../Button'
import { setModal } from '../../Redux/features/modal/modalSlice'
import { useDispatch } from 'react-redux'

const Emptyboard = () => {
    const { theme } = useContext(ThemeContext)
    const { layout } = useContext(MediaQueryContext)
    const dispatch = useDispatch()

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center'
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <Text
                    variant="heading"
                    size="l"
                    text="This board is empty. Create a new column to get started."
                    color={theme.color.secondaryText}
                    style={{ width: layout.emptyBoardtext }}
                />
                <Button
                    variant="primary"
                    text="+ Add New Column"
                    style={{ marginTop: 32 }}
                    onClick={() => dispatch(setModal('editboard'))}
                />
            </div>
        </div>
    )
}

export default Emptyboard
