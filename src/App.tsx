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

const SORT_FIELD_ALPHABETICCALY = 'alphabeticcaly';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(
  goods: string[],
  sortField: string,
  reverse: boolean,
) {
  let newVisibleGoods = [...goods];

  if (sortField === SORT_FIELD_ALPHABETICCALY) {
    newVisibleGoods.sort();
  }

  if (sortField === SORT_FIELD_LENGTH) {
    newVisibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reverse) {
    return newVisibleGoods.reverse();
  }

  if (sortField === '') {
    newVisibleGoods = [...goods];
  }

  return newVisibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverce] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICCALY,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICCALY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reverse === false,
          })}
          onClick={() => setReverce(!reverse)}
        >
          Reverse
        </button>

        {(sortField !== '' || reverse === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverce(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
