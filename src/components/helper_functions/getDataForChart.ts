export function getDataForChart(days: number, practiceData: any, sectionName: string, subjectName: string) {
    const today = Date.now();
    const returnArray = [];
    
    for (let index = 0; index < days; index++) {
        const newDay = new Date(today - (8.64e+7 * index));
        let object = practiceData.find((item : any) => item.date == newDay.toDateString());
        if(object) {
            object = object[sectionName][subjectName];
        }else object = {}

        returnArray.push({
            day: newDay.getDate(),
            correct: 0,
            wrong: 0,
            ...object
        })
    }
    return returnArray.reverse();
}
