import s from './modalHeadsUp.module.scss';
import Button from '../button';
import { modalContext } from '../../context/contextProvider';
import { useContext } from 'react';

export default function modalHeadsUp({click, children, cancel, reverse, blueText, redText} : {click: any, children: any, cancel?: boolean, reverse?: boolean, blueText?: string, redText?: string}) {
    const [, setModalRender] = useContext(modalContext)
    return (
        <div className={`${s.container}`} >
            {children}
            <div className={`${s.buttonWrapper}`}>
                <Button click={click}  red={reverse} text={blueText ?? 'Proceed'} icon='done_all'/>
                {cancel ? <Button click={() =>{
                    setModalRender({showModal: false, componentToRender: null})
                }} text={redText ?? 'Cancel'} red= {!reverse} icon='close'/> : null}
            </div>
        </div>
    )
}
