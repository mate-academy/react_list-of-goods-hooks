import { FC } from 'react';

interface Props {
  good: string;
}

const GoodsItem: FC<Props> = ({ good }) => {
  return (
    <li key={good} data-cy="Good">
      {good}
    </li>
  );
};

export default GoodsItem;
