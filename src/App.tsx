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

enum SortProperties {
  LENGTH = 'length',
  ALPHABETICAL = 'alphabetical',
  DEFAULT = '',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<SortProperties>(
    SortProperties.DEFAULT,
  );

  const sortByAlphabet = () => {
    setGoods(prevGoods => {
      const sorted = [...prevGoods].sort((a, b) => a.localeCompare(b));

      return isReversed ? sorted.reverse() : sorted;
    });
    setActiveSort(SortProperties.ALPHABETICAL);
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setActiveSort(SortProperties.LENGTH);
  };

  const reversed = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setActiveSort(SortProperties.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === SortProperties.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === SortProperties.LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reversed}
        >
          Reverse
        </button>

        {(activeSort || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
