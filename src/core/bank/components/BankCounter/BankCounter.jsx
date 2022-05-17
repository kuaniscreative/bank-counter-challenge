import { useBehaviorSubjectValue } from "../../../../hooks/useBehaviorSubjectValue";
import BankRow from "../BankRow/BankRow";

function BankCounter(props) {
  const {
    counter
  } = props;

  const processing = useBehaviorSubjectValue(counter.processing$);
  const processed = useBehaviorSubjectValue(counter.processed$);

  return (
    <BankRow 
      counter={counter.name}
      processing={processing || 'idle'}
      processed={processed?.length ? processed.join(', ') : '-'}
    />
  )
}

export default BankCounter
