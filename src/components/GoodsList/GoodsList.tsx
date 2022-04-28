import { useState, useMemo } from 'react';
import './GoodsList.scss';

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

export const GoodsList = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReverseSort, setReverseSort] = useState(false);
  const [sortBy, setSortBy] = useState('none');

  const reverseSort = () => {
    setReverseSort(!isReverseSort);
  };

  const alphabetSort = () => {
    setSortBy('alphabet');
  };

  const lengthSort = () => {
    setSortBy('length');
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setReverseSort(false);
    setSortBy('none');
  };

  const prepareGoods = (goodsArray: string[]) => {
    goodsArray.sort((a, b) => {
      switch (sortBy) {
        case 'alphabet':
          return a.localeCompare(b);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });

    if (isReverseSort) {
      return goodsArray.reverse();
    }

    return goodsArray;
  };

  const renderingGoods = useMemo(() => (prepareGoods([...goods])),
    [isReverseSort, sortBy]);

  return (
    <div className="goodsMenu">
      <div className="goodsMenu__buttons">
        <button
          type="button"
          onClick={reverseSort}
          className="goodsMenu__button goodsMenu__button--reverseSort"
        >
          Reverse
        </button>
        <button
          type="button"
          onClick={alphabetSort}
          className="goodsMenu__button goodsMenu__button--alphabetSort"
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={lengthSort}
          className="goodsMenu__button goodsMenu__button--lengthSort"
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={reset}
          className="goodsMenu__button goodsMenu__button--resetSort"
        >
          Reset sort
        </button>
      </div>
      <ul className="goodsMenu__list">
        {renderingGoods.map(good => (
          <li key={good} className="goodsMenu__item">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
