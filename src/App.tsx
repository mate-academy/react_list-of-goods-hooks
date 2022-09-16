import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  NONE,
  ALPABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(0);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const handlerSortAlphabet = () => setSortType(SortType.ALPABET);
  const handlersortLength = () => setSortType(SortType.LENGTH);
  const handlerReversed = () => setReversed(!isReversed);
  const handlerReset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info',
            { 'is-light': sortType !== SortType.ALPABET })}
          onClick={handlerSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={handlersortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info',
            { 'is-light': isReversed === false })}
          onClick={handlerReversed}
        >
          Reverse
        </button>

        {(isReversed === true || sortType !== SortType.NONE)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={handlerReset}
              >
                Reset
              </button>
            )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
