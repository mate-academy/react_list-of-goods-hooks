import './App.scss';
import 'bulma/css/bulma.css';

import React, { useState } from 'react';
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

enum SORT {
  ALPHABET = 'a-to-z',
  LENGTH = 'length',
  DEFAULT = '',
}

interface Params {
  sortType: SORT
  isReverse: boolean
}

const prepareGoods = (goods: string[], {
  sortType,
  isReverse,
}: Params) => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((item1, item2) => {
      switch (sortType) {
        case SORT.ALPHABET:
          return item1.localeCompare(item2);
        case SORT.LENGTH:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SORT>(SORT.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);
  const preparedGoods = prepareGoods(goodsFromServer, {
    sortType,
    isReverse,
  });

  const reset = () => {
    setSortType(SORT.DEFAULT);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT.ALPHABET,
          })}
          onClick={() => setSortType(SORT.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT.LENGTH,
          })}
          onClick={() => setSortType(SORT.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {
          sortType !== SORT.DEFAULT || isReverse
            ? (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={reset}
              >
                Reset
              </button>
            )
            : null
        }
      </div>

      <ul>
        {
          preparedGoods.map(item => <li data-cy="Good" key={item}>{item}</li>)
        }
      </ul>
    </div>
  );
};
