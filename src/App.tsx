import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
  alphabet = 'alphabet',
  length = 'length',
}

function getSortedGoods(
  initialGoods: string[],
  sortField: string,
  isReversed: boolean,
) {
  let goods = [...initialGoods];

  if (sortField) {
    switch (sortField) {
      case SortType.alphabet: {
        goods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      }

      case SortType.length: {
        goods.sort((good1, good2) => good1.length - good2.length);
        break;
      }

      default:
        break;
    }
  }

  if (isReversed) {
    goods = goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverseFlag, setReverseFlag] = useState(false);

  const resetSortFilters = () => {
    setSortField('');
    setReverseFlag(false);
  };

  const filteredGoods = getSortedGoods(goodsFromServer, sortField, reverseFlag);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.alphabet)}
          className={classNames('button is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={classNames('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() =>
            reverseFlag ? setReverseFlag(false) : setReverseFlag(true)
          }
          className={classNames('button is-warning', {
            'is-light': reverseFlag === false,
          })}
        >
          Reverse
        </button>

        {sortField !== '' || reverseFlag ? (
          <button
            type="button"
            onClick={resetSortFilters}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {filteredGoods.map(goodName => (
          <li key={goodName} data-cy="Good">
            {goodName}
          </li>
        ))}
      </ul>
    </div>
  );
};
