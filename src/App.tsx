import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  SORT_LENGTH = 'LENGTH',
  SORT_ALPHABETICALLY = 'ALPHABETICALLY',
}

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

type T = {
  isReverse: boolean;
  sortField: string | null;
};

function getPreparedGoods(
  goods: string[],
  { isReverse, sortField }: T,
): string[] {
  const goodsClone = Array.from(goods);

  if (sortField) {
    switch (sortField) {
      case SortType.SORT_LENGTH:
        goodsClone.sort((good1, good2) => good1.length - good2.length);
        break;
      case SortType.SORT_ALPHABETICALLY:
        goodsClone.sort((good1, good2) => good1.localeCompare(good2));
        break;
      default:
        throw new Error('SortField Error!!');
    }
  }

  if (isReverse) {
    goodsClone.reverse();
  }

  return goodsClone;
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string | null>(null);

  const goods = getPreparedGoods(goodsFromServer, { isReverse, sortField });

  const handlerReset = () => {
    setIsReverse(false);
    setSortField(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
          type="button"
          className={classNames('button is-info ', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_LENGTH)}
          type="button"
          className={classNames('button is-success ', {
            'is-light': sortField !== SortType.SORT_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={classNames('button is-warning ', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            onClick={handlerReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
