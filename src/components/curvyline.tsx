import { useEffect } from 'react';
import s from './curvyline.module.scss';

export default function CurvyLine() {
    useEffect(() => {
        makeSquiggle("squiggle", "follow", 16, 8);
    }, [])
    

    return (
        <div className={`${s.container} curvyLine`}>
            <svg >
                <path className={`${s.follow}`} id="follow" d="M 0 100, L 510000, 0"/>
                <path className={`${s.squiggle}`} id="squiggle" d="M0,0"/>
            </svg>
        </div>
    )
}

function makeSquiggle(squigglePathId: any, followPathId: any, squiggleStep: number, squiggleAmplitude: number)
{
    var followPath = document.getElementById(followPathId) as any
    var pathLen = followPath.getTotalLength();

    // Adjust step so that there are a whole number of steps along the path
    var numSteps = Math.round(pathLen / squiggleStep);

    var pos = followPath.getPointAtLength(0);
    var newPath = "M" + [pos.x, pos.y].join(',');
    var side = -1;
    for (var i=1; i<=numSteps; i++)
    {
        var last = pos;
        var pos = followPath.getPointAtLength(i * pathLen / numSteps);

        // Find a point halfway between last and pos. Then find the point that is
        // perpendicular to that line segment, and is squiggleAmplitude away from
        // it on the side of the line designated by 'side' (-1 or +1).
        // This point will be the control point of the quadratic curve forming the
        // squiggle step.
        
        // The vector from the last point to this one
        var vector = {x: (pos.x - last.x), y: (pos.y - last.y)};
        // The length of this vector
        var vectorLen = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        var half = {x: (last.x + vector.x/2),
                    y: (last.y + vector.y/2)};
        // The vector that is perpendicular to 'vector'
        var perpVector = {x: -(squiggleAmplitude * vector.y / vectorLen),
                        y: (squiggleAmplitude * vector.x / vectorLen)};
        // No calculate the control point position
        var controlPoint = {x: (half.x + perpVector.x * side),
                            y: (half.y + perpVector.y * side)};
        newPath += ("Q" + [controlPoint.x, controlPoint.y, pos.x, pos.y].join(','));
        // Switch the side (for next step)
        side = -side;
    }
    var squigglePath = document.getElementById(squigglePathId);
    squigglePath?.setAttribute("d", newPath);
}

