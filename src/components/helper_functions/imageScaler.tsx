import { handelTap } from "./handelTap";
import ImgModal from '../modals/imgModal';

export function imageScaler(e: React.MouseEvent, setter: any){
    const img = e.target as HTMLImageElement;
    const source = img.src;
    
    handelTap(e, {
        onSingleTap() {
            skipNesting()
        },
    })

    function skipNesting() {
        setter({showModal: true, componentToRender: <ImgModal {...{source}}/>})
    }
}