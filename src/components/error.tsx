import s from './error.module.scss';
import Button from './button';

export default function Error() {
    return (
        <div className={`${s.wrapper}`}>
            <span className={`${s.emoji}`}>⊙⁠﹏⁠⊙</span>
            <span className={`${s.title}`}>OOPS...</span>
            <span className={`${s.subTitle}`}>Something went wrong.</span>
            <span className={`${s.solution}`}>Try refreshing the page.</span>
            <span className={`${s.compliment}`}>If the error continues please contact us.</span>
            <Button click={() => window.location.reload()} text='Refresh' icon='refresh'/>
        </div>
    )
}
