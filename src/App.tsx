import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

type Goods = string[];

enum SortType {
  alph = 'Sort alphabetically',
  len = 'Sort by length',
  none = '',
}

export const goodsFromServer: Goods = [
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

function prepareGoods(goods: Goods, sortType: SortType): Goods {
  let preparedGoods = [...goods];

  if (sortType !== SortType.none) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.alph:
          return good1.localeCompare(good2);

        case SortType.len:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [isReversed, setReversed] = useState(false);
  let visibleGoods = prepareGoods(goodsFromServer, sortField);

  if (isReversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.alph,
          })}
          onClick={() => setSortField(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.len,
          })}
          onClick={() => setSortField(SortType.len)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortField !== SortType.none) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.none);
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
