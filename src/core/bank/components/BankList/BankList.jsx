import clsx from 'clsx';
import classes from './bankList.module.scss';

function BankList(props) {
  const {
    children,
    className,
  } = props;

  return (
    <div className={clsx(
      classes.root,
      className,
    )}>
      {children}
    </div>
  )
}

export default BankList
