import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/internal/operators/map'

export type SetSignals<T extends object> = (state: T) => void

export const getDataAndSetSignals = <T extends Observable<object>, S extends object>(
  observable: T,
  setSignalsFn: SetSignals<S>
) => {
  return observable.pipe(map(data => setSignalsFn(data as S)))
}
