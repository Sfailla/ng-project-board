import { Observable } from 'rxjs/internal/Observable'
import { map } from 'rxjs/internal/operators/map'

export type SetSignals<T> = (state: T) => void

export const getDataAndSetSignals = <S>(observable: Observable<S>, setSignalsFn: SetSignals<S>) => {
  return observable.pipe(map(data => setSignalsFn(data)))
}
