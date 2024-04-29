import { Good } from '../types/Good';

type Props = {
  visibleGoods: Good[];
};

export const ListOfGoods: React.FC<Props> = ({ visibleGoods }) => {
  return (
    <ul>
      {visibleGoods.map(good => (
        <li key={good.id} data-cy="Good">
          {good.name}
        </li>
      ))}
    </ul>
  );
};
