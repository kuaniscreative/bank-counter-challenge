import clsx from 'clsx';
import classes from './button.module.scss';

function Button(props) {
  const {
    children,
    className,
    onClick
  } = props;

  return (
    <button 
      className={clsx(
        classes.root,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
