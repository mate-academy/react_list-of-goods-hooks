import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

type Goods = string[];

enum SortType {
  alf = 'Sort alphabetically',
  leng = 'Sort by length',
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

function getPreparedGoods(goods: Goods, sortField: SortType): Goods {
  const preparedGood = [...goods];

  if (sortField) {
    preparedGood.sort((good1, good2) => {
      switch (sortField) {
        case 'Sort alphabetically':
          return good1.localeCompare(good2);

        case 'Sort by length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return preparedGood;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState(false);
  let visibleGoods = getPreparedGoods(goodsFromServer, sortField as SortType);

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== 'Sort alphabetically',
          })}
          onClick={() => setSortField(SortType.alf)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'Sort by length',
          })}
          onClick={() => setSortField(SortType.leng)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(reversed || sortField !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
