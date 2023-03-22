import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer = [
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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  function getReorderedGoods(goods: string[]) {
    const visibleGoods = [...goods];

    switch (sortType) {
      case SortType.ALPHABET:
        visibleGoods.sort((firstGood, secondGood) => (
          firstGood.localeCompare(secondGood)
        ));
        break;

      case SortType.LENGTH:
        visibleGoods.sort((firstGood, secondGood) => (
          firstGood.length - secondGood.length
        ));
        break;

      case SortType.NONE:
      default:
        break;
    }

    if (reversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  }

  const handleAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setReversed(!reversed);
  };

  const handleReset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const sortedGoods = getReorderedGoods(goodsFromServer);
  const isSorted = reversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => handleAlphabet()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => handleLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !reversed },
          )}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good" className="good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
