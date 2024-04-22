export default function ChevronUp({
    onClick = () => true,
    rotateUp = true,
}) {
    return (
        <svg onClick={onClick} width="10" height="7" xmlns="http://www.w3.org/2000/svg" transform={`rotate(${rotateUp ? 0 : 180})`} vertOriginY={0.55} style={{ originY: 0.55 }}><path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" /></svg>
    )
}
