import { Bank } from "./core/bank/bank";
import { useBehaviorSubjectValue } from "./hooks/useBehaviorSubjectValue";
import BankBoard from "./core/bank/components/BankBoard/BankBoard";
import Button from "./ui/Button/Button";
import 'modern-normalize';
import './global.scss';
import classes from './app.module.scss';

const bank = new Bank({
  counterCount: 4
});

function App() {

  const taskQueue = useBehaviorSubjectValue(bank.taskQueue$);
  const nextTask = useBehaviorSubjectValue(bank.nextTask$);

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <h1 className={classes.title}>
          Bank Counter
        </h1>
        <BankBoard counters={bank.counters}/>
      </div>
      <footer className={classes.footer}>
        <div>
          {`Waiting: ${taskQueue.length}`}
        </div>
        <Button 
          onClick={() => {
            bank.createNewTask();
          }}
        >
          {`NEXT: ${nextTask}`}
        </Button>
      </footer>
    </div>
  );
}

export default App;
