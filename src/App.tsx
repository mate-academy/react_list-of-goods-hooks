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

enum SortType {
  alphabetically,
  length,
}

function sortList(
  someList: string[],
  params: SortType | '',
  reversed: boolean,
) {
  const preperedList = [...someList];

  switch (params) {
    case SortType.alphabetically:
      preperedList.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.length:
      preperedList.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reversed) {
    preperedList.reverse();
  }

  return preperedList;
}

export const App: React.FC = () => {
  const [filterParams, setFilterParams] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState(false);

  const visiblegoods = sortList(goodsFromServer, filterParams, reversed);

  const reset = () => {
    setFilterParams('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': filterParams !== SortType.alphabetically,
          })}
          onClick={() => setFilterParams(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': filterParams !== SortType.length,
          })}
          onClick={() => setFilterParams(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="ReverseButton"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(filterParams !== '' || reversed) && (
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
          {visiblegoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
