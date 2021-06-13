import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'
import { IRootState } from './interfaces'

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector