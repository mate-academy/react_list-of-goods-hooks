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
  DEFAULT = 'DEFAULT',
  ALPHABETICAL = 'ALPHABETICAL',
  LENGTH = 'LENGTH',
}
export const App: React.FC = () => {
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState<string[]>(initialGoods);
  const [sortType, setSortType] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (type: SortType) => {
    let sortedGoods = [...initialGoods];

    switch (type) {
      case SortType.ALPHABETICAL:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.LENGTH:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        sortedGoods = initialGoods;
        break;
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(type);
  };

  const toggleReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods([...initialGoods]);
    setSortType(SortType.DEFAULT);
    setIsReversed(false);
  };

  const isInitialOrder = goods.every(
    (good, index) => good === initialGoods[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABETICAL ? '' : 'is-light'}`}
          onClick={() => sortGoods(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => sortGoods(SortType.LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>
        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
