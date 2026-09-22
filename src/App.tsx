import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';

import './App.scss';
import { SortType } from './types/SortType';

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
];

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NOT_SELECTED);
  const [reversed, setReversed] = useState(false);

  let goodsSorted: string[] = [...goodsFromServer].sort(
    (good1: string, good2: string) => {
      switch (sortType) {
        case SortType.ALPHABETICAL:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    },
  );

  if (reversed) {
    goodsSorted = goodsSorted.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABETICAL,
          })}
          onClick={() => setSortType(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortType !== SortType.NOT_SELECTED) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.NOT_SELECTED);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsSorted.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
