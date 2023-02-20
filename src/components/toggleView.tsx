
import { dayViewContext } from '../context/contextProvider';
import s from './toggleView.module.scss';
import { useContext } from 'react';

export default function ToggleView() {
    const [daysToView, setDaysToView] = useContext(dayViewContext)
    
    return (
        <div className={`${s.container}`}>
            <button className={`${daysToView == 7 ? s.active : ''}`} onClick={() => setDaysToView(7)}>7days</button>
            <button className={`${daysToView == 15 ? s.active : ''}`} onClick={() => setDaysToView(15)}>15days</button>
            <button className={`${daysToView == 30 ? s.active : ''}`} onClick={() => setDaysToView(30)}>30day</button>
        </div>
    )
}
