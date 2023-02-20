
export function dragElement(element: HTMLImageElement) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        // otherwise, move the DIV from anywhere inside the DIV:
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e: MouseEvent) {
        element.style.cursor = "grabbing"
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
        // const {x, y} = element.getBoundingClientRect();

        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        

        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        element.style.cursor = "grab"
        document.onmouseup = null;
        document.onmousemove = null;
    }
}