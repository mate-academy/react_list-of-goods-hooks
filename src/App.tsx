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

enum SortByName {
  Default = '',
  Abc = 'abc',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: { sortField: SortByName; reverse: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField === SortByName.Abc) {
        return good1.localeCompare(good2);
      }

      if (sortField === SortByName.Length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortName, setSortName] = useState<SortByName>(SortByName.Default);
  const [reverse, setReverse] = useState(false);

  const newGoods = getPreparedGoods(goodsFromServer, {
    sortField: sortName,
    reverse,
  });

  const reset = () => {
    setSortName(SortByName.Default);
    setReverse(false);
  };

  const handleReverse = () => {
    setReverse(!reverse);
  };

  const handleSortByName = () => {
    setSortName(SortByName.Abc);
  };

  const handleSortByLength = () => {
    setSortName(SortByName.Length);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortByName}
          type="button"
          className={`button is-info ${sortName !== SortByName.Abc && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={`button is-success ${sortName !== SortByName.Length && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortName || reverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {newGoods.map(el => (
            <li data-cy="Good" key={el}>
              {el}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
