const palette = {
    mainPurple: {
        1: '#635FC7',
        0.25: 'rgba(99, 95, 199, 0.25)',
        0.1: 'rgba(99, 95, 199, 0.1)'
    },
    mainPurpleHover: '#A8A4FF',
    black: '#000112',
    veryDarkGrey: '#20212C',
    darkGrey: '#2B2C37',
    darkLine: '#3E3F4E',
    lightLine: '#E4EBFA',
    mediumGrey: {
        1: '#828FA3',
        0.25: 'rgba(130, 143, 163, 0.25)'
    },
    lightGrey: '#F4F7FD',
    white: '#FFFFFF',
    red: '#EA5555',
    redHover: '#FF9898'
}

export const theme = {
    color: {
        primary: palette.mainPurple[1],
        primaryHover: palette.mainPurpleHover,
        secondary: palette.white,
        secondaryHover: palette.white,
        backgroundPrimary: palette.veryDarkGrey,
        backgroundPrimaryHover: palette.mainPurple[0.25],
        backgroundSecondary: palette.darkGrey,
        borderLine: palette.mediumGrey[0.25],
        primaryText: palette.white,
        secondaryText: palette.mediumGrey[1],
        line: palette.darkLine,
        destructive: palette.red,
        destructiveHover: palette.redHover,
        mainPurple: palette.mainPurple[1],
        white: palette.white
    },
    font: {
        heading: {
            xl: {
                fontSize: '24px',
                lineHeight: '30px',
                fontWeight: 'Bold',
                fontFamily: 'Plus Jakarta Sans'
            },
            l: {
                fontSize: '18px',
                lineHeight: '23px',
                fontWeight: 'Bold',
                fontFamily: 'Plus Jakarta Sans'
            },
            m: {
                fontSize: '15px',
                lineHeight: '19px',
                fontWeight: 'Bold',
                fontFamily: 'Plus Jakarta Sans'
            },
            s: {
                fontSize: '12px',
                lineHeight: '15px',
                fontWeight: 'Bold',
                fontFamily: 'Plus Jakarta Sans',
                fontKerning: '2.4px'
            },
        },
        body: {
            l: {
                fontSize: '13px',
                lineHeight: '23px',
                fontWeight: 'Medium',
                fontFamily: 'Plus Jakarta Sans',
            },
            m: {
                fontSize: '12px',
                lineHeight: '15px',
                fontWeight: 'Bold',
                fontFamily: 'Plus Jakarta Sans',
            },
        }
    }
}

export const lightTheme = {
    ...theme,
    color: {
        ...theme.color,
        secondary: palette.mainPurple[0.1],
        secondaryHover: palette.mainPurple[0.25],
        backgroundPrimary: palette.lightGrey,
        backgroundSecondary: palette.white,
        primaryText: palette.black,
        line: palette.lightLine
    }
}
