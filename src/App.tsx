import React, { useState } from 'react';
import cn from 'classnames';
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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      case 'Sort by length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  function pressReset() {
    setReverseField(false);
    setSortField('');
  }

  if (reverseField) {
    visibleGoods.reverse();
  }

  function pressReverse() {
    setReverseField(prev => !prev);
  }

  return (
    <div className="section content">
      <button
        type="button"
        className={cn('button', 'is-info', {
          'is-light': sortField !== 'Sort alphabetically',
        })}
        onClick={() => {
          setSortField('Sort alphabetically');
        }}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        className={cn('button', 'is-success', {
          'is-light': sortField !== 'Sort by length',
        })}
        onClick={() => {
          setSortField('Sort by length');
        }}
      >
        Sort by length
      </button>

      <button
        type="button"
        className={cn('button', 'is-warning', {
          'is-light': reverseField === false,
        })}
        onClick={() => {
          pressReverse();
        }}
      >
        Reverse
      </button>

      {(sortField !== '' || reverseField !== false) && (
        <button
          type="button"
          className={cn('button', 'is-danger', {
            'is-light': sortField === '' && reverseField === false,
          })}
          onClick={() => {
            pressReset();
          }}
        >
          Reset
        </button>
      )}

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
