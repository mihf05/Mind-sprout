import {practiceContext, dayViewContext} from '../context/contextProvider';
import { useContext } from 'react';
import { getDataForChart } from './helper_functions/getDataForChart';
import Chart from './chart';

interface com{
    sectionName: string,
    subjectName: string,
    backgroundColor: string,
    className: string,
    click: any,
}



export function SingleChart({sectionName, subjectName, backgroundColor, className, click}: com) {
    const [days] = useContext(dayViewContext)
    
    const [practiceData] = useContext(practiceContext)
    const data = getDataForChart(days, practiceData, sectionName, subjectName)

    return (
        <Chart {...{backgroundColor, data}} title={subjectName}  className={className} click={click}/>
    )
}
