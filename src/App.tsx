import React, { useState } from 'react';
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

const lengths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

enum SortBy {
  None = 'none',
  Name = 'name',
  Length = 'length',
}

const App: React.FC = () => {
  const [goods] = useState([...goodsFromServer]);
  const [isStarted, setStart] = useState(false);
  const [isReversed, reverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.None);
  const [length, setLength] = useState(1);

  const prepareList = (
    goodsArray: string[],
    selectedLength: number,
    sortType: string,
  ) => {
    const preparedList = [...goodsArray].filter(good => (
      good.length >= selectedLength));

    switch (sortType) {
      case SortBy.Name:
        preparedList.sort((good1, good2) => (
          (good1.toLowerCase()).localeCompare(good2.toLowerCase())
        ));
        break;

      case SortBy.Length:
        preparedList.sort((good1, good2) => (
          good1.length - good2.length
        ));
        break;

      default:
        break;
    }

    if (isReversed) {
      preparedList.reverse();
    }

    return preparedList;
  };

  const visibleGoods = prepareList(goods, length, sortBy);

  return (
    <div className="App container.is-widescreen has-text-centered">
      <h1 className="title is-1">Goods</h1>
      {!isStarted && (
        <button
          type="button"
          className="button is-success"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div className="mt-6">
          <div className="is-flex is-justify-content-center mt-5">
            <button
              type="button"
              className="button is-info mx-4"
              onClick={() => reverse(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-info mx-4"
              onClick={() => setSortBy(SortBy.Name)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-info mx-4"
              onClick={() => setSortBy(SortBy.Length)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-info mx-4"
              onClick={() => {
                reverse(false);
                setSortBy(SortBy.None);
                setLength(1);
              }}
            >
              Reset
            </button>

            <select
              name="length"
              value={length}
              onChange={(event) => setLength(+event.target.value)}
            >
              {lengths.map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <h2 className="title is-2">Goods List:</h2>

          <ul>
            {visibleGoods.map(good => (
              <li key={good} className="is-size-4">
                {good}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
