import BankCounter from "../BankCounter/BankCounter";
import BankList from "../BankList/BankList";
import BankRow from "../BankRow/BankRow";
import classes from './bankBoard.module.scss';

function BankBoard(props) {
  const {
    counters,
  } = props;

  return (
    <div className={classes.root}>
      <BankList>
        <BankRow isHeader />
        {counters.map((counter) => (
          <BankCounter 
            key={counter.name} 
            counter={counter} 
          />
        ))}
      </BankList>
    </div>
  )
}

export default BankBoard
