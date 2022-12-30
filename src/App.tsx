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

export const App: React.FC = () => {
  const goods = [...goodsFromServer];
  const [sortType, setSortType] = useState('none');
  const [isReversed, setReverse] = useState(false);

  const sortByAlphabet = () => {
    setSortType('alphabet');
  };

  const sortByLength = () => {
    setSortType('length');
  };

  const changeReversState = () => {
    setReverse(!isReversed);
  };

  const reseting = () => {
    setSortType('none');
    setReverse(false);
  };

  switch (sortType) {
    case 'alphabet':
      goods.sort((g1, g2) => g1.localeCompare(g2));
      break;

    case 'length':
      goods.sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'alphabet' && 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'length' && 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={changeReversState}
        >
          Reverse
        </button>

        {(sortType !== 'none' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reseting}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
