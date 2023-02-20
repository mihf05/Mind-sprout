import {dayViewContext, practiceContext} from '../context/contextProvider';
import { useContext } from 'react';
import { getDataForChart } from './helper_functions/getDataForChart';
import Chart from './chart';

interface com{
    sectionName: string,
    backgroundColor: string,
    className: string,
    click: any,
    setter: any
}

export function CombinedChart({sectionName, backgroundColor, className, click, setter}:com) {
    const [days] = useContext(dayViewContext)
    const [practiceData] = useContext(practiceContext)
    const processedData = practiceData.map((item: any) => {
        const sectionData = getCombinedSectionData(item, sectionName) ;
        return {
            date: item.date,
            combinedData: {
                [sectionName] : sectionData,
            }
        }
    })
    
    const data = getDataForChart(days, processedData, 'combinedData', sectionName)

    return (
        <Chart {...{backgroundColor, data}} title={capitalizeFirstLetter(sectionName)} className={className} click={click} setter={setter}/>
    )

}
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getCombinedSectionData (obj: any, sectionName: string){
    let correct = 0;
    let wrong = 0;

    for (const subjectName in obj[sectionName]) {
        const { correct: cr , wrong: wr } = obj[sectionName][subjectName];
        correct += cr;
        wrong += wr;
    }
    return { correct, wrong }
}