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
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);

  const visibleGoods = [...goodsFromServer];

  if (sortType !== SortType.None) {
    visibleGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return a.localeCompare(b);
        case SortType.ByLength:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => {
            setSortType(prev =>
              // eslint-disable-next-line max-len
              prev === SortType.Alphabetically
                ? SortType.None
                : SortType.Alphabetically,
            );
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => {
            setSortType(prev =>
              prev === SortType.ByLength ? SortType.None : SortType.ByLength,
            );
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.None);
              setReversed(false);
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
