import { BehaviorSubject } from "rxjs";
import { Counter } from "./counter";

export class Bank {
  #idleQueue$;

  constructor({
    counterCount
  } = {}) {
    if (!counterCount) {
      throw Error('Should provide `counterCount` when instanciating Bank')
    }
    
    if (counterCount < 1) {
      throw Error('Counter count should be greater than 0!');
    }

    this.counters = [];
    this.nextTask$ = new BehaviorSubject(1);
    this.#idleQueue$ = new BehaviorSubject([]);
    this.taskQueue$ = new BehaviorSubject([]);

    for (let i = 0; i < counterCount; i++) {
      const newCounter = new Counter({
        onTaskDone: this.#reportIdle.bind(this)
      });

      this.counters.push(newCounter);
      this.#idleQueue$.next([...this.#idleQueue$.value, newCounter]);
    }

    this.#idleQueue$.subscribe(([firstIdleCounter, ...restCounter]) => {
      const taskQueue = [...this.taskQueue$.value];

      if (firstIdleCounter && taskQueue.length) {
        const [task] = taskQueue.splice(0, 1);

        firstIdleCounter.assign(task);
        this.#idleQueue$.next(restCounter);
        this.taskQueue$.next(taskQueue);
      }
    })
  }

  #reportIdle(counter) {
    if (counter.processing$.value === null) {
      this.#idleQueue$.next([...this.#idleQueue$.value, counter]);
    }
  }

  createNewTask() {
    const nextTask = this.nextTask$.value;
    const idleQueue = [...this.#idleQueue$.value];

    if (this.#idleQueue$.value.length) {
      const [firstIdleCounter] = idleQueue.splice(0, 1);

      firstIdleCounter.assign(nextTask);
      this.#idleQueue$.next(idleQueue);
    } else {
      this.taskQueue$.next([...this.taskQueue$.value, nextTask]);
    }

    this.nextTask$.next(nextTask + 1);
  }
}
