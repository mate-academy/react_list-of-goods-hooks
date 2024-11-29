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

enum SortType {
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const sortByAlphabet = (): void => {
    const sortedGoodsByAlphabet = [...visibleGoods].sort((good1, good2) => {
      return isReversed
        ? good2.localeCompare(good1)
        : good1.localeCompare(good2);
    });

    setVisibleGoods(sortedGoodsByAlphabet);
    setSortField(SortType.ALPHABET);
  };

  const sortByLength = (): void => {
    const sortedGoodsByLength = [...visibleGoods].sort((good1, good2) => {
      return isReversed
        ? good2.length - good1.length
        : good1.length - good2.length;
    });

    setVisibleGoods(sortedGoodsByLength);
    setSortField(SortType.LENGTH);
  };

  const reverse = (): void => {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const isInInitialOrder = (): boolean => {
    return visibleGoods.every((good, index) => good === goodsFromServer[index]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isInInitialOrder() && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
