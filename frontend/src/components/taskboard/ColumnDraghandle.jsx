import { useContext } from 'react'
import { ThemeContext } from '../../themes'

import { constants } from '../../constants/constants'
import Text from '../Text'

const ColumnDraghandle = ({
    text,
    colOrder
}) => {
    const { theme } = useContext(ThemeContext)
    const styles = {
        columnName: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            columnGap: 12,
        },
        colorDot: {
            display: 'block',
            width: 15,
            aspectRatio: 1 / 1,
            borderRadius: 15 / 2,
            backgroundColor: constants.colorTags[colOrder],
        },
    }

    return (
        <div style={styles.columnName}>
            <span style={styles.colorDot}></span>
            <Text
                variant="heading"
                size="s"
                color={theme.color.secondaryText}
                text={text}
                style={{ letterSpacing: '2.4px' }}
            />
        </div>
    )
}

export default ColumnDraghandle
