import { FC } from 'react';

type Props = {
  goods: string[];
};

export const Goods: FC<Props> = ({ goods }) => (
  <ul>
    {goods.map((good) => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
