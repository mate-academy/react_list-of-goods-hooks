import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
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
  enum SortType {
    SORT_ABC = 'Sort alphabetically',
    SORT_LENGTH = 'Sort by length',
  }

  const prepGoods = [...goodsFromServer];

  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  if (sortField === SortType.SORT_ABC) {
    prepGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SortType.SORT_LENGTH) {
    prepGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    prepGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.SORT_ABC,
          })}
          onClick={() => setSortField(SortType.SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.SORT_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={classNames('button is-light is-danger')}
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {prepGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
