import React, { useCallback, useState } from 'react';
import GoodsList from './components/GoodsList/GoodsList';
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

const App: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const [products, setProducts] = useState(goodsFromServer);

  const goodsReverse = useCallback(
    () => {
      setProducts([...products.reverse()]);
    }, [],
  );

  const sortByAlphabetically = useCallback(
    () => {
      setProducts([...products].sort((prev, next) => prev.localeCompare(next)));
    }, [],
  );

  const sortByLength = useCallback(
    () => {
      setProducts([...products].sort((prev, next) => prev.length - next.length));
    }, [],
  );

  const resetGoods = useCallback(
    () => {
      setProducts(goodsFromServer);
    }, [],
  );

  const onSelectChanger = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setProducts(
        goodsFromServer.filter(good => good.length >= Number(event.target.value)),
      );
    }, [],
  );

  return (
    <div className="App">
      <div className="App__content">
        <h1 className="App__title">List of Goods</h1>
        {!showList && (
          <button
            type="button"
            className="App__button"
            onClick={() => setShowList(!showList)}
          >
            Start
          </button>
        )}

        {showList && (
          <>
            <div className="App__buttons">
              <button
                type="button"
                onClick={goodsReverse}
                className="App__button"
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={sortByAlphabetically}
                className="App__button"
              >
                By alphabet
              </button>

              <button
                type="button"
                onClick={sortByLength}
                className="App__button"
              >
                By length
              </button>

              <button
                type="button"
                onClick={resetGoods}
                className="App__button"
              >
                Reset
              </button>
            </div>

            <div className="App__select">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="App__select-label" htmlFor="goods">Good name length:</label>
              {' '}
              <select
                className="App__select-list"
                name="goods"
                id="goods"
                onChange={onSelectChanger}
              >
                {goodsFromServer.map(
                  (number, i) => (
                    <option value={(i + 1).toString()} key={number}>
                      {i + 1}
                    </option>
                  ),
                )}
              </select>
            </div>

            {showList && <GoodsList goods={products} />}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
