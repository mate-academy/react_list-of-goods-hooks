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
  Alphabet = 'alphabet',
  Length = 'length',
}

enum HighlightType {
  notHighlighted = 'is-light',
  highlighted = '',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [activeSort, setActiveSort] = useState<SortType | null>(null);

  const sortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
      return good1.localeCompare(good2);
    });

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setActiveSort(SortType.Alphabet);
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setActiveSort(SortType.Length);
  };

  const reverseList = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const resetList = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setActiveSort(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === SortType.Alphabet ? HighlightType.highlighted : HighlightType.notHighlighted}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === SortType.Length ? HighlightType.highlighted : HighlightType.notHighlighted}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? HighlightType.highlighted : HighlightType.notHighlighted}`}
          onClick={reverseList}
        >
          Reverse
        </button>

        {JSON.stringify(goods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
