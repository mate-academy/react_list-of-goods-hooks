import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

const FIELD_ALPHABETIC = 'alphabetically';
const FIELD_LENGTH = 'length';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (orderBy: string, reverse = false) => {
    const preparedGoods = [...goodsFromServer];

    switch (orderBy) {
      case FIELD_ALPHABETIC:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case FIELD_LENGTH:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }

    if (reverse) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const handleSortAlphabetically = () => {
    const sorted = getSortedGoods(FIELD_ALPHABETIC, isReversed);

    setGoods(sorted);
    setSortBy(FIELD_ALPHABETIC);
  };

  const handleSortByLength = () => {
    const sorted = getSortedGoods(FIELD_LENGTH, isReversed);

    setGoods(sorted);
    setSortBy(FIELD_LENGTH);
  };

  const handleReverse = () => {
    const reversed = [...goods].reverse();

    setGoods(reversed);
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortBy('');
    setIsReversed(false);
  };

  const isInitial =
    goods.every((item, index) => item === goodsFromServer[index]) &&
    !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== FIELD_ALPHABETIC ? 'is-light' : ''}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== FIELD_LENGTH ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitial && (
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
