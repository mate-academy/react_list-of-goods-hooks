import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './Components/GoodsList/GoodsList';

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

const App: React.FC = () => {
  const [startList, setListVisibility] = useState(false);
  const [reverseList, setListOrder] = useState(false);
  const [sortBy, setSortMethod] = useState('default');
  const [length, setLength] = useState('default');

  const showList = () => {
    setListVisibility(current => !current);
  };

  const makeListReversed = () => {
    setListOrder(current => !current);
  };

  const sortAlphabetically = () => {
    setSortMethod('letters');
  };

  const sortByLength = () => {
    setSortMethod('length');
  };

  const resetList = () => {
    setListOrder(false);
    setSortMethod('default');
    setLength('default');
  };

  const filterByLength = (event: {
    target: { value: any }
  }) => {
    setLength(event.target.value);
  };

  const seletct = (selectSize: number) => {
    const options = Array(selectSize);

    for (let i = 1; i <= selectSize; i += 1) {
      options[i - 1] = (
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <select
        name="select"
        id="select"
        onChange={filterByLength}
      >
        {options}
      </select>
    );
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {!startList
      && (
        <button type="button" onClick={showList}>
          Start
        </button>
      )}
      {startList
        && (
          <>
            <button type="button" onClick={makeListReversed}>
              Reverse
            </button>
            <button type="button" onClick={sortAlphabetically}>
              Sort alphabetically
            </button>
            <button type="button" onClick={sortByLength}>
              Sort by length
            </button>
            <button type="button" onClick={resetList}>
              reset
            </button>
            <form action="get">
              Filetr by item length:
              {' '}
              {seletct(10)}
            </form>
            <GoodsList
              goods={goodsFromServer}
              reversed={reverseList}
              sortBy={sortBy}
              length={length}
            />
          </>
        )}
    </div>
  );
};

export default App;
