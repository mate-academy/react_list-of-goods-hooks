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
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

const renderGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const initialValues = [...goods];

  switch (sortType) {
    case 'alphabet':
      initialValues.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      initialValues.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    initialValues.reverse();
  }

  return initialValues;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [reverse, setReverse] = useState(false);

  const goods = renderGoods(goodsFromServer, sortType, reverse);

  const reset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !reverse },
          )}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => <li key={good} data-cy="Good">{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
