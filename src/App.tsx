import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function getSortedGoods(goods: string[], sortField: string, reversed: boolean) {
  let sortedGoods: string[] = [...goods];

  if (sortField === SortType.Alphabetically) {
    sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SortType.Length) {
    sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, sortField, reversed);
  const isSorted = sortField !== '' || reversed;

  const handleClick = (field: string, reversedStatus = false) => {
    setSortField(field);
    setReversed(reversedStatus);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => {
            handleClick(SortType.Alphabetically, false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => {
            handleClick(SortType.Length, false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              handleClick('', false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
