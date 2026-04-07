import { STATES } from '../state/state';

export type StateValue = (typeof STATES)[keyof typeof STATES];
