import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  Reset = 'reset',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  function getVisibleGoods() {
    let sorted = [...goodsFromServer];

    if (sortBy === SortType.Alphabet) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === SortType.Length) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  }

  function handleSort(type: SortType) {
    if (type === SortType.Reset) {
      setSortBy('');
      setIsReversed(false);
    } else {
      setSortBy(type);
    }
  }

  function toggleReverse() {
    setIsReversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SortType.Alphabet ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
          <button
            type="button"
            className={`button is-danger ${sortBy !== SortType.Reset ? 'is-light' : ''}`}
            onClick={() => handleSort(SortType.Reset)}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={getVisibleGoods()} />
    </div>
  );
};
