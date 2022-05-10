import React, { useState } from 'react';
import { GoodsList } from './GoodsList';

import './App.css';

const goodsFromServer: string[] = [
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

enum SortBy {
  none,
  alphabet,
  nameLength,
}

const App: React.FC = () => {
  const [isVisible, setVisible] = useState(false);
  const [goods] = useState(goodsFromServer);
  const [isReversed, setReversed] = useState(false);
  const [sortProp, setSortProp] = useState(SortBy.none);
  const [minLen, setMinLen] = useState(1);

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
      >
        Start
      </button>
    );
  }

  const visibleGoods = goods.filter(({ length }) => length >= minLen);

  switch (sortProp) {
    case SortBy.alphabet: {
      visibleGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
      );

      break;
    }

    case SortBy.nameLength: {
      visibleGoods.sort(
        ({ length: len1 }, { length: len2 }) => len1 - len2,
      );

      break;
    }

    case SortBy.none:
    default: {
      break;
    }
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <input
        type="checkbox"
        id="reverseToggler"
        checked={isReversed}
        onChange={() => setReversed(
          (reversedValue) => !reversedValue,
        )}
      />

      <label htmlFor="reverseToggler">
        Reverse
      </label>

      <button
        type="button"
        onClick={() => setSortProp(SortBy.alphabet)}
      >
        Sort alphabetically
      </button>

      <button
        type="button"
        onClick={() => setSortProp(SortBy.nameLength)}
      >
        Sort by length
      </button>

      <select
        onChange={
          ({ target: option }) => setMinLen(Number(option.value))
        }
      >
        {
          (new Array(10))
            .fill(null)
            .map((_, index) => (
              <option
                value={index + 1}
                // eslint-disable-next-line
                key={index + 1}
                selected={index + 1 === minLen}
              >
                {`${index + 1}+ letters`}
              </option>
            ))
        }
      </select>

      <button
        type="button"
        onClick={() => {
          setMinLen(1);
          setReversed(false);
          setSortProp(SortBy.none);
        }}
      >
        Reset
      </button>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};

export default App;
