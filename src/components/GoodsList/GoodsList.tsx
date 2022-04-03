import { useState } from 'react';
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
  const [isAlphabetSort, setAlphabetSort] = useState(false);
  const [isLengthSort, setLengthSort] = useState(false);

  const reverseSort = () => {
    setReverseSort(!isReverseSort);
  };

  const alphabetSort = () => {
    setAlphabetSort(!isAlphabetSort);
  };

  const lengthSort = () => {
    setLengthSort(!isLengthSort);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setReverseSort(false);
    setAlphabetSort(false);
    setLengthSort(false);
  };

  const sortGoods = (goodsArray: string[]): string[] => {
    if (isAlphabetSort) {
      return goodsArray.sort((a, b) => a.localeCompare(b));
    }

    if (isLengthSort) {
      return goodsArray.sort((a, b) => a.length - b.length);
    }

    if (isReverseSort) {
      return goodsArray.reverse();
    }

    return goodsArray;
  };

  const renderingGoods = sortGoods([...goods]);

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
