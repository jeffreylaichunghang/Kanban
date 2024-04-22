import Ellipsis from "../assets/Ellipsis"
const DoubleEllipsis = () => {
    const styles = {
        ellipsis: {
            marginRight: 10,
            marginTop: 5
        }
    }

    return (
        <span style={styles.ellipsis}>
            <Ellipsis />
            <Ellipsis />
        </span>
    )
}

export default DoubleEllipsis
