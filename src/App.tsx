import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import classNames from 'classnames';
import { Goods } from './components/Goods';

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

// eslint-disable-next-line @typescript-eslint/naming-convention
enum Sort_By {
  length = 'length',
  alphabet = 'alphabetically',
}

function getPreparedGoods(
  goods: string[],
  sortType: Sort_By,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (!sortType && isReversed) {
    return preparedGoods.reverse();
  }

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case Sort_By.alphabet:
          return isReversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        case Sort_By.length:
          return isReversed
            ? good2.length - good1.length
            : good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField as Sort_By,
    isReversed,
  );

  function reset() {
    setSortField('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            sortField === Sort_By.alphabet ? '' : 'is-light')}
          onClick={() => setSortField(Sort_By.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-info',
            sortField === Sort_By.length ? '' : 'is-light')}
          onClick={() => setSortField(Sort_By.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            isReversed ? '' : 'is-light')}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>
      <Goods goods={visibleGoods} />
    </div>
  );
};
