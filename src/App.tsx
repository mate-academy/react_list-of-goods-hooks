import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import React from 'react';

enum SortType {
  Default,
  Alphabetical,
  Length,
}

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

export const App = () => {
  const [list, setList] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortedState, setSortedState] = useState(SortType.Default);

  function reset() {
    setList(goodsFromServer);
    setIsReversed(false);
    setSortedState(SortType.Default);
  }

  function sortedGoodsbyAlphabet(goods: string[]) {
    setSortedState(SortType.Alphabetical);

    const result = [...goods].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      return result.reverse();
    }

    return result;
  }

  function sortedGoodsbyLength(goods: string[]) {
    setSortedState(SortType.Length);
    if (isReversed) {
      return [...goods].sort((a, b) => b.length - a.length);
    }

    return [...goods].sort((a, b) => a.length - b.length);
  }

  function reversedGoods(goods: string[]) {
    setIsReversed(!isReversed);

    return [...goods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedState === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => setList(sortedGoodsbyAlphabet(list))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedState === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setList(sortedGoodsbyLength(list))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setList(reversedGoods(list))}
        >
          Reverse
        </button>

        {(sortedState !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {list.map(good => (
          // eslint-disable-next-line react/jsx-key
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
