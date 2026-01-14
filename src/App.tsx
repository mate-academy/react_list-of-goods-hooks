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
  Length = 'length',
}

function getPreparedGoods(sortField: SortType, reversed: boolean): string[] {
  const preparedGoods = [...goodsFromServer];

  if (sortField !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            sortField !== SortType.Alphabetically && 'is-light',
          )}
          onClick={() => {
            setVisibleGoods(
              getPreparedGoods(SortType.Alphabetically, reversed),
            );
            setSortField(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            sortField !== SortType.Length && 'is-light',
          )}
          onClick={() => {
            setVisibleGoods(getPreparedGoods(SortType.Length, reversed));
            setSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', !reversed && 'is-light')}
          onClick={() => {
            setReversed(!reversed);
            setVisibleGoods(getPreparedGoods(sortField, !reversed));
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setVisibleGoods(goodsFromServer);
              setSortField(SortType.None);
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
