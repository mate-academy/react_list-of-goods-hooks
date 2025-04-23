import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cl from 'classnames';

import './App.scss';
import { FilterParams } from './types/FilterParams';
import { SortType } from './types/SortType';

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

type Good = string;

function getPrepearedGoods(
  goodsFS: Good[],
  { sortField, reversed }: FilterParams,
) {
  let goods = [...goodsFS];

  goods = goods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    goods = goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [reversed, setReversed] = useState<boolean>(false);

  const preparedGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const resetClick = () => {
    setSortField(SortType.DEFAULT);
    if (reversed) {
      setReversed(!reversed);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cl('button', 'is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cl('button', 'is-warning', {
            'is-light': reversed === false,
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
            className="button is-danger is-light"
            onClick={resetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
