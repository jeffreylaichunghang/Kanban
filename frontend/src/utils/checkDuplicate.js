export default function checkDuplicate(array, value) {
    return array.filter(item => item === value).length >= 2 ? true : false
}
