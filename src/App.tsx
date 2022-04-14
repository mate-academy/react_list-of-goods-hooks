import React, { useState } from 'react';
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
  const goods = [...goodsFromServer];
  const [showList, setShowList] = useState(false);
  const [products, setProducts] = useState(goods);

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
                onClick={() => setProducts(initialGoods => (
                  [...initialGoods].reverse()
                ))}
                className="App__button"
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={() => setProducts(initialGoods => (
                  [...initialGoods].sort((prev, next) => prev.localeCompare(next))
                ))}
                className="App__button"
              >
                By alphabet
              </button>

              <button
                type="button"
                onClick={() => setProducts(initialGoods => (
                  [...initialGoods].sort((prev, next) => (prev.length - next.length))
                ))}
                className="App__button"
              >
                By length
              </button>

              <button
                type="button"
                onClick={() => setProducts(goods)}
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
                onChange={(event) => setProducts(initialGoods => (
                  [...initialGoods].filter(good => (good.length >= Number(event.target.value)))
                ))}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
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
