import { FC } from 'react';

type Props = {
  goods: string[];
};

export const GoodsList: FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
