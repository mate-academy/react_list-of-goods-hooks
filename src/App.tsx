import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  DEFAULT = 'default',
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  let goods = [...goodsFromServer];

  function SortList(list: string[], field: SortType) {
    list.sort((good1, good2) => {
      switch (field) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  function reverseList() {
    goods = goods.toReversed();
  }

  function reset() {
    goods = [...goodsFromServer];
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  }

  SortList(goods, sortField);
  if (isReversed) {
    reverseList();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.ALPHABETICALLY && 'is-light'}`}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.LENGTH && 'is-light'}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed !== true && 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortField !== SortType.DEFAULT || isReversed !== false ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
