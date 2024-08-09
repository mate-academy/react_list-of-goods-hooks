import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import { GoodList } from './components/GoodList/GoodList';
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

const ALPHABET = 'alphabetically';
const LENGTH = 'by-length';

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = () => {
    switch (sortBy) {
      case ALPHABET:
        return [...goodsFromServer].sort((good1, good2) =>
          good1.localeCompare(good2),
        );

      case LENGTH:
        return [...goodsFromServer].sort((a, b) => a.length - b.length);

      default:
        return [...goodsFromServer];
    }
  };

  const sorted = visibleGoods();

  if (reverse) {
    sorted.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== ALPHABET,
          })}
          onClick={() => setSortBy(ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== LENGTH,
          })}
          onClick={() => setSortBy(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortBy !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={sorted} />
    </div>
  );
};
