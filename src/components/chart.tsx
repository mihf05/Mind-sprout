import s from './chart.module.scss';
import { Chart as ChartJS, registerables} from 'chart.js';
ChartJS.register(...registerables);

import {motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';


interface com{
    title: string,
    backgroundColor: string,
    data: any,
    className: string,
    click: any,
    setter?: any
}



export default function Chart({ data, backgroundColor, title, className, click, setter}: com) {
    
    const maximumYValue = data.reduce((before: any, item: any) => {
        return Math.max(before, Math.max(item.correct, item.wrong))
    }, 10) 


    return (
        <motion.div layout className={`${s.container} chart ${className}`} onClick={click}>
            <motion.section onClick={() => {if(setter) setter(title)}} className='chartTitleSection' layout><span>{title}</span>{setter ? <motion.p className="material-symbols-outlined">open_in_new</motion.p>: null}</motion.section>
            <div>
            <Line data={{
                labels: data.map((item: any) => item.day),
                datasets: [
                    {
                        label: 'correct',
                        data: data.map((item: any) => item.correct),
                        tension: .4,
                        backgroundColor: "white",
                        borderColor: backgroundColor,
                        
                    },
                    {
                        label: 'wrong',
                        data: data.map((item: any) => item.wrong),
                        tension: .4,
                        backgroundColor: 'white',
                        borderColor: 'rgb(219, 68, 55)'

                    }
                ]
            }}
            options={{
                    plugins: {
                        legend: {
                            display: false
                        },

                    },
                    scales : {
                        y: {
                            beginAtZero: true,
                            suggestedMax: maximumYValue + 5,
                            ticks: {
                                precision: 0
                            }
                        },
                    },
                    
                }}
            />
            </div>
        </motion.div>
    )
}

