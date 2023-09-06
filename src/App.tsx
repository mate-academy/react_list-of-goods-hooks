import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

export const App: React.FC = () => {
  const [
    sortedGoods,
    setSortedGoods,
  ] = useState(goodsFromServer);
  const [isVisibleReser, setIsVisibleReser] = useState(false);

  enum SortType {
    Alphabet = 'alphabet',
    Length = 'length',
    Reverse = 'reverse',
  }

  function handleSort(filter: string) {
    let sorted: string[] = [];

    if (filter === SortType.Alphabet) {
      sorted = [...sortedGoods].sort();
    }

    if (filter === SortType.Length) {
      sorted = [...sortedGoods].sort((a, b) => a.length - b.length);
    }

    if (filter === SortType.Reverse) {
      sorted = [...sortedGoods].reverse();
    }

    setSortedGoods(sorted);
    setIsVisibleReser(true);
  }

  const handleButtonSortAlphabetically = () => {
    handleSort(SortType.Alphabet);
  };

  const handleButtonSortByLength = () => {
    handleSort(SortType.Length);
  };

  const handleButtonReverse = () => {
    handleSort(SortType.Reverse);
  };

  const handleButtonReset = () => {
    setSortedGoods(goodsFromServer);
    setIsVisibleReser(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={handleButtonSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={handleButtonSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={handleButtonReverse}
        >
          Reverse
        </button>
        {isVisibleReser && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleButtonReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods
          .map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
