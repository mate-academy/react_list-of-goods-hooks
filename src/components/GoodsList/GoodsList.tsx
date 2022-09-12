import { useState } from 'react';
import { GoodInfo } from '../GoodsInfo/GoodInfo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const GoodsList: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState('none');

  const goods = [...goodsFromServer];

  goods.sort((product1, product2) => {
    switch (sortType) {
      case 'alph':
        return product1.localeCompare(product2);
      case 'length':
        return product1.length - product2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  const reverse = () => {
    setReversed(!isReversed);
  };

  const reset = () => {
    setReversed(false);
    setSortType('none');
  };

  const sortAlph = () => {
    setReversed(false);
    setSortType('alph');
  };

  const sortLength = () => {
    setReversed(false);
    setSortType('length');
  };

  return (
    <>
      <button
        type="button"
        onClick={sortAlph}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={sortLength}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={reverse}
      >
        Reverse
      </button>

      <button
        type="button"
        onClick={reset}
      >
        Reset
      </button>

      <ul className="Goods">
        {goods.map(good => (
          <GoodInfo good={good} key={good} />
        ))}
      </ul>
    </>
  );
};
