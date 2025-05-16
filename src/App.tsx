import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  NAME,
  LENGTH,
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType | null,
  reversed: boolean,
): string[] {
  let preparedGoods = [...goods];

  if (sortType !== null) {
    preparedGoods = preparedGoods.toSorted((good1, good2) => {
      switch (sortType) {
        case SortType.NAME:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return reversed ? preparedGoods.toReversed() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [reversed, setReversed] = useState(false);
  const preparedGoods = getPreparedGoods(goodsFromServer, sortType, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.NAME,
          })}
          onClick={() => setSortType(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortType !== null || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(null);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
