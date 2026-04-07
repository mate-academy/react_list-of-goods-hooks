import { Good } from '../../types/Good';

type Props = {
  list: Good[];
};

export const GoodList: React.FC<Props> = ({ list }) => (
  <ul>
    {list.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
