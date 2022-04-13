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
  const [goods, setGoods] = useState<string[]>([]);

  const reverseGoods = () => {
    const goodsCopy = [...goods];

    setGoods(goodsCopy.reverse());
  };

  const sortAlphabetically = () => {
    const goodsCopy = [...goodsFromServer];

    setGoods(goodsCopy.sort(
      (a, b) => a.localeCompare(b),
    ));
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  const sortByNameLength = () => {
    const goodsCopy = [...goodsFromServer];

    setGoods(goodsCopy.sort(
      (a, b) => a.length - b.length,
    ));
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {
        goods.length === 0
          ? <button type="button" onClick={reset}>Start</button>
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
              {goods.map(el => <li key={el}>{el}</li>)}
            </div>
          )
      }
    </div>
  );
};

export default App;
