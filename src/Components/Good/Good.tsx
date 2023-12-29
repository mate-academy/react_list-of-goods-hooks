import { GoodType } from '../../Types/GoodType';

export type PropsGood = {
  good: GoodType;
};

export const Good: React.FC<PropsGood> = ({ good }) => {
  return (
    <li data-cy="Good">{good}</li>
  );
};
