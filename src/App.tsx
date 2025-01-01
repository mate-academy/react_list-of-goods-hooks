import React, { useState } from 'react';
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

const SORT_BY_ALPHABETICAL = 'alphabetical';
const SORT_BY_LENGTH = 'length';

type SortMethod = typeof SORT_BY_ALPHABETICAL | typeof SORT_BY_LENGTH | '';

export const App: React.FC = () => {
  function sortGoods(
    goods: string[],
    sortField: SortMethod,
    reverse: boolean,
  ): string[] {
    const changeGoods = [...goods];

    if (sortField) {
      changeGoods.sort((good1, good2) => {
        switch (sortField) {
          case SORT_BY_ALPHABETICAL:
            return good1.localeCompare(good2);

          case SORT_BY_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }

    if (reverse) {
      return changeGoods.reverse();
    }

    return changeGoods;
  }

  const [sortMethod, setSortMethod] = useState<SortMethod>('');
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const visibleGoods = sortGoods(goodsFromServer, sortMethod, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortMethod === SORT_BY_ALPHABETICAL ? 'is-info' : 'is-light'}`}
          onClick={() => setSortMethod(SORT_BY_ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortMethod === SORT_BY_LENGTH ? 'is-success' : 'is-light'}`}
          onClick={() => setSortMethod(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReverse ? 'is-warning' : 'is-light'}`}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortMethod || isReverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortMethod('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
