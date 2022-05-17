import { useMemo, useSyncExternalStore } from "react";

export function useBehaviorSubjectValue(subject$) {
  const subscription = useMemo(
    () => ({
      getCurrentValue: () => subject$.value,
      subscribe: callback => {
        const subscription = subject$.subscribe(callback);
        return () => subscription.unsubscribe();
      }
    }),
    [subject$] 
  );
  return useSyncExternalStore(subscription.subscribe, subscription.getCurrentValue);
}
