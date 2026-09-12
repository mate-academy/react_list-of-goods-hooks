import { useState } from 'react';
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

type SortType = 'alphabetically' | 'length' | null;

export const App = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortAlphabetically = (): void => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setSortType('alphabetically');
  };

  const sortByLength = (): void => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setSortType('length');
  };

  const reverseGoods = (): void => {
    setGoods([...goods].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = (): void => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  const isOriginalOrder = !isReversed && sortType === null;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === 'alphabetically' ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === 'length' ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
