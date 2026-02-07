/* eslint-disable */

import { useState } from 'react';
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
  Default = 'default',
  SortAlphabeticaly = 'sortAlphabeticaly',
  SortByLength = 'sortByLength',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false)

  const sortAlphabeticaly = () => {
    let sortedGoods = [...goodsFromServer].sort((good1, good2) => good1.localeCompare(good2));

    if(isReversed) {
      sortedGoods = sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(SortType.SortAlphabeticaly);
  };

  const sortByLength = () => {
    let sortedGoods = [...goodsFromServer].sort((good1, good2) => good1.length - good2.length);

    if(isReversed) {
      sortedGoods = sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(SortType.SortByLength);
  };

  const listReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const listReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const isNotChanged = goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className='App'>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={`button is-info ${sortType !== SortType.SortAlphabeticaly ? 'is-light' : ''}`}
            onClick={sortAlphabeticaly}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-success ${sortType !== SortType.SortByLength ? 'is-light' : ''}`}
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button is-warning ${!isReversed  ? 'is-light' : ''}`}
            onClick={listReverse}
          >
            Reverse
          </button>

          {!isNotChanged && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={listReset}
            >
              Reset
            </button>
          )}

        </div>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </div>
    </div>
  )
};
