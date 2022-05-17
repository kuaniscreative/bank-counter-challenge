import clsx from 'clsx';
import classes from './bankRow.module.scss';

function BankRow(props) {
  const {
    isHeader,
    counter,
    processing,
    processed,
  } = props;

  return (
    <div className={clsx(
      classes.root,
      isHeader && classes['root--is-header']
    )}>
      <div className={classes.cell}>
        {isHeader ? 'Counter' : counter}
      </div>
      <div className={classes.cell}>
        {isHeader ? 'Processing' : processing}
      </div>
      <div className={classes.cell}>
        {isHeader ? 'Processed' : processed}
      </div>
    </div>
  )
}

export default BankRow
