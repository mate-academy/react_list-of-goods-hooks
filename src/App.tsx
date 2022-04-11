import React, { useState } from 'react';
import './App.css';
import { GoodList } from './component/GoodsList';

type Options = {
  value: number,
  label: string,
};

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

const options: Options[] = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];

const App: React.FC = () => {
  const emtyArray: string[] = [];
  const [choosedLength, setChooseLength] = useState(1);
  const [goodList, setGoodList] = useState(emtyArray);
  const [hidden, setHidden] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [sort, setSort] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);

  const changeLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChooseLength(+event.target.value);
  };

  const startHandle = () => {
    setGoodList([...goodsFromServer]);
    setHidden(false);
  };

  const reverse = () => {
    setIsReversed(current => !current);
  };

  const sorted = () => {
    setSort(true);
    setSortByLength(false);
  };

  const sortedByLength = () => {
    setSortByLength(true);
    setSort(false);
  };

  const reset = () => {
    setSort(false);
    setSortByLength(false);
    setChooseLength(1);
    setIsReversed(false);
  };

  return (
    <div className="App">
      {goodList.length === 0 && (
        <button
          type="button"
          className="start-button"
          onClick={() => startHandle()}
        >
          START
        </button>
      )}

      {!hidden && (
        <>
          <div
            className="actions-buttons-block"
          >
            <select
              className="select"
              value={choosedLength}
              onChange={(e) => changeLength(e)}
            >
              {options.map(option => (
                <option
                  value={option.value}
                  key={option.label}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="reverse"
              onClick={() => reverse()}
            >
              Reverse
            </button>

            <button
              type="button"
              className="reset"
              onClick={() => reset()}
            >
              Reset all sort
            </button>
          </div>

          <div
            className="sort-buttons"
          >
            <button
              type="button"
              className="albSort"
              onClick={() => sorted()}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="lengthSort"
              onClick={() => sortedByLength()}
            >
              Sort by length
            </button>
          </div>
        </>

      )}

      <GoodList
        goods={goodList}
        isReversed={isReversed}
        sorted={sort}
        lengthSort={sortByLength}
        choosedLength={choosedLength}
      />
    </div>
  );
};

export default App;
