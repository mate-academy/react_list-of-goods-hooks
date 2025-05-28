import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const originalGoodsRef = useRef([...goodsFromServer]);

  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortGoods = (items: string[], type: SortType): string[] => {
    const sorted = [...items];

    switch (type) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    return sorted;
  };

  const handleSort = (type: SortType) => {
    const base = [...originalGoodsRef.current];
    const sorted = sortGoods(base, type);

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortType(type);
  };

  const handleReverse = () => {
    const newReversed = !isReversed;
    const updatedGoods = [...goods].reverse();

    setGoods(updatedGoods);
    setIsReversed(newReversed);
  };

  const handleReset = () => {
    setGoods([...originalGoodsRef.current]);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isChanged = () => {
    return goods.join(',') !== originalGoodsRef.current.join(',');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={() => handleSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged() && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
