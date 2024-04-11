import { Goods as GoodType } from './types/Goods';

export const Goods: React.FC<GoodType> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good: string) => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
