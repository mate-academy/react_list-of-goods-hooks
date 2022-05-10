import React, { useState } from 'react';
import { GoodsList } from './GoodsList';

import './App.scss';

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
  const [isVisible, setVisible] = useState(true);
  const [goods] = useState(goodsFromServer);
  const [isReversed, setReversed] = useState(false);
  const [sortProp, setSortProp] = useState(SortBy.none);
  const [minLen, setMinLen] = useState(1);

  if (!isVisible) {
    return (
      <div className="App">
        <button
          type="button"
          onClick={() => setVisible(true)}
        >
          Start
        </button>
      </div>
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
      <div className="App__buttonsSection">
        <input
          className="App__checkbox"
          type="checkbox"
          id="reverseToggler"
          checked={isReversed}
          onChange={() => setReversed(
            (reversedValue) => !reversedValue,
          )}
        />

        <label
          className="App__button App__toggler"
          htmlFor="reverseToggler"
        >
          Reverse
        </label>

        <button
          className="App__button"
          type="button"
          onClick={() => setSortProp(SortBy.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          className="App__button"
          type="button"
          onClick={() => setSortProp(SortBy.nameLength)}
        >
          Sort by length
        </button>

        <select
          className="App__dropdown"
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
          className="App__button"
          type="button"
          onClick={() => {
            setMinLen(1);
            setReversed(false);
            setSortProp(SortBy.none);
          }}
        >
          Reset
        </button>
      </div>

      <div className="App__goodsList">
        <GoodsList goods={visibleGoods} />
      </div>
    </div>
  );
};

export default App;
