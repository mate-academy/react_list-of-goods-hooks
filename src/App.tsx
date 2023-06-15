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
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
)
{
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => setSortType(SortType.ALPHABET);
  const sortByLength = () => setSortType(SortType.LENGTH);
  const reverse = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed }
  );

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              sortType === SortType.ALPHABET
                ? 'button is-success'
                : 'button is-success is-light'
            }
            onClick={sortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={
              sortType === SortType.LENGTH
                ? 'button is-success'
                : 'button is-success is-light'
            }
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={
              isReversed === true
                ? 'button is-success'
                : 'button is-success is-light'
            }
            onClick={reverse}
          >
            Reverse
          </button>

          {isReversed === false
          && sortType === SortType.NONE
            ? null
            : (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={reset}
              >
                Reset
              </button>
            )}
        </div>

        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </div>
    </>  
  );
};

export default App;
