import {timeInMin} from '../../globalStates';

export function timer(setter: any){
    const countDownDate = new Date(Date.now() + timeInMin * 60000).getTime();

    // Update the count down every 1 second
    const interval = setInterval(() => {

        const now = new Date().getTime();

        let distance = countDownDate - now;
        let negative = false;

        

        //* const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes: any = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();

        if(distance < 0) {
            negative = true;
            minutes = (minutes + 1).toString()
        } else minutes = minutes.toString()

        setter(minutes.replace('-', '').padStart(2, "0") + ':' + seconds.replace('-', '').padStart(2, "0"))

        if (negative) {
            document.querySelector('.timeWrapper')?.classList.add('red')            
        }
    }, 1000);
} 