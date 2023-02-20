
type CallBack = (e: React.MouseEvent) => any;
type TapParams = { onSingleTap?: CallBack; onDoubleTap?: CallBack };

let DELTA_TIME_THRESHOLD_MS = 700;
let timerDelay: NodeJS.Timeout | null = null;
let target: EventTarget;

export function handelTap( e: React.MouseEvent, { onSingleTap, onDoubleTap }: TapParams) {
    if (timerDelay == null) {
        // First tap
        onSingleTap?.(e);

        timerDelay = setTimeout(() => {
            timerDelay = null;
        }, DELTA_TIME_THRESHOLD_MS);
    } else {
        // Second tap
        if (e.target === target) {
        onDoubleTap?.(e);
        }

        clearTimeout(timerDelay);
        timerDelay = null;
    }
    target = e.target;
}