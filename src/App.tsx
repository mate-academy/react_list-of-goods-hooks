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

const sortButtons = [
  'Sort alphabetically',
  'Sort by length',
  'Reverse',
  'Reset',
];

export const App: React.FC = () => {
  //const [goods, setGoods] = React.useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  let visibleGoods = [...goodsFromServer]; // .toSorted(/* ... */);

  if (sortField === sortButtons[0]) {
    visibleGoods = visibleGoods.sort();
  } else if (sortField === sortButtons[1]) {
    visibleGoods = visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === sortButtons[0]
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(sortButtons[0])}
        >
          {sortButtons[0]}
        </button>

        <button
          type="button"
          className={
            sortField === sortButtons[1]
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(sortButtons[1])}
        >
          {sortButtons[1]}
        </button>

        <button
          type="button"
          className={
            reverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReverse(!reverse)}
        >
          {sortButtons[2]}
        </button>

        {(sortField !== '' || reverse) && (
          <button
            type="button"
            className={
              sortField === sortButtons[3]
                ? 'button is-danger'
                : 'button is-danger is-light'
            }
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            {sortButtons[3]}
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good, index) => (
            <li key={index} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
