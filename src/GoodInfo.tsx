import { Good } from './Good';

interface GoodProp {
  good: Good;
}

export const GoodInfo = ({ good }: GoodProp) => <li data-cy="Good">{good}</li>;
