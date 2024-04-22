export const getArrayorder = (array) => {
    let orderedArray = [];

    const sortedArray = array.toSorted()

    array.forEach(number => {
        orderedArray.push(sortedArray.indexOf(number))
    });

    return orderedArray;
}

/*
    1. [1, 2, 10, 5, 3] => [1, 2, 3, 5, 10]
    2. get index of sorted number
    3. return [0, 1, 4, 3, 2]
*/
