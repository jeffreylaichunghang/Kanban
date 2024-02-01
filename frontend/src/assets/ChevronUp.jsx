export default function ChevronUp({
    onClick = () => true,
}) {
    return (
        <svg onClick={onClick} width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" /></svg>
    )
}
