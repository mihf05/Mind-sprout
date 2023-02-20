export function getDataOfCertainDays(days: number) {
    const today = Date.now();
    const returnArray = [];

    for (let index = 0; index < days; index++) {
        const newDay = new Date(today - (8.64e+7 * index));
        returnArray.push({
            day: newDay.getDate(),
            right: 0,
            wrong: 0,
        })
    }
    return returnArray.reverse();
}