export function ripple(element : any, color?: string) {
    element.onmousedown = function(e: any) {
    
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        const w = this.offsetWidth;
        
        const ripple = document.createElement('p') as any; 
        
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top  = y + 'px';
        ripple.style.setProperty('--scale', w);
        if(color) ripple.style.color = color
    
        this.appendChild(ripple);
    
        setTimeout(() => {
            ripple.parentNode.removeChild(ripple);
        }, 500);
    }
}