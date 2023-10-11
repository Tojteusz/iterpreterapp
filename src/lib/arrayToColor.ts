const arrayToColor = (array: number[]) => {
    if (!array) return 'rgb(0, 0, 0)'
    return `rgb(${array[0]}, ${array[1]}, ${array[2]})`
}
export default arrayToColor
