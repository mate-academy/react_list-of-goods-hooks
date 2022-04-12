import React, { useState } from 'react';

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

const App: React.FC<{}> = () => {
  const [jsx, setJsx] = useState<JSX.Element[]>([]);

  const showGoods = () => {
    setJsx(goodsFromServer.map(good => (
      <li>
        {good}
      </li>
    )));
  };

  const reverseGoods = () => {
    const jsxCopy = [...jsx];

    setJsx(jsxCopy.reverse());
  };

  const sortAlphabetically = () => {
    const goodsCopy = [...goodsFromServer];

    goodsCopy.sort(
      (a, b) => a.localeCompare(b),
    );

    setJsx(goodsCopy.map(good => (
      <li>
        {good}
      </li>
    )));
  };

  const reset = () => {
    showGoods();
  };

  const sortByNameLength = () => {
    const goodsCopy = [...goodsFromServer];

    goodsCopy.sort(
      (a, b) => a.length - b.length,
    );

    setJsx(goodsCopy.map(good => (
      <li>
        {good}
      </li>
    )));
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {
        jsx.length === 0
          ? <button type="button" onClick={showGoods}>Start</button>
          : (
            <div>
              <button type="button" onClick={reverseGoods}>
                Reverse
              </button>
              <button type="button" onClick={sortAlphabetically}>
                Sort alphabetically
              </button>
              <button type="button" onClick={reset}>Reset</button>
              <button type="button" onClick={sortByNameLength}>
                Sort by length
              </button>
              {jsx}
            </div>
          )
      }
    </div>
  );
};

export default App;
