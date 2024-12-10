import { TPropsGood } from '../../types';

export const Good: React.FC<TPropsGood> = ({ good }) => {
  return <li data-cy="Good">{good.name}</li>;
};
