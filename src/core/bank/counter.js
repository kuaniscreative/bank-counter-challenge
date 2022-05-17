import { BehaviorSubject } from 'rxjs';
import { uniqueNamesGenerator, names } from 'unique-names-generator';
import { getRandomNumberBetween } from "../../utils/gerRandomNumberBetween";

export class Counter {
  #onTaskDone;

  constructor({
    speed, 
    onTaskDone 
  } = {}) {
    this.name = uniqueNamesGenerator({
      dictionaries: [names],
      length: 1,
    });
    this.speed = speed || getRandomNumberBetween(0.5, 1.5, 1);
    this.processing$ = new BehaviorSubject(null);
    this.processed$ = new BehaviorSubject([]);
    this.#onTaskDone = () => {
      onTaskDone(this)
    };
  }

  assign(task) {
    this.#process(task);
  }

  #process(task) {
    this.processing$.next(task);

    setTimeout(() => {
      this.processed$.next([...this.processed$.value, task]);
      this.processing$.next(null);

      this.#onTaskDone?.(this);
    }, this.speed * 1000)
  }
}
