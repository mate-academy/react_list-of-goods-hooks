import { useState } from 'react';
import './App.scss';
import { GoodList } from './component/GoodsList/GoodList';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App = () => {
  const [goods, setGoods] = useState<string[]>([]);
  const [isStart, setStart] = useState(false);
  const lengthGoods = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGoods(goodsFromServer
      .filter(good => good.length >= +event.currentTarget.value));
  };

  const resetGoods = () => {
    const defaulSelect = document.getElementById('defaultValue');

    setGoods(goodsFromServer);
    if (defaulSelect) {
      defaulSelect.setAttribute('selected', '');
      defaulSelect.removeAttribute('selected');
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">
        GOODS
      </h1>
      <div className="app__show">
        {!isStart
          ? (
            <button
              type="button"
              className="button"
              onClick={() => {
                setGoods(goodsFromServer);
                setStart(true);
              }}
            >
              Start
            </button>
          )
          : (
            <>
              <GoodList goods={goods} />
              <div className="buttons">
                <button
                  type="button"
                  className="button"
                  onClick={() => setGoods([...goods]
                    .sort((a, b) => a.localeCompare(b)))}
                >
                  Sort alphabetically
                </button>

                <button
                  type="button"
                  className="button"
                  onClick={() => setGoods([...goods]
                    .sort((a, b) => a.length - b.length))}
                >
                  Sort by length
                </button>

                <button
                  type="button"
                  className="button"
                  onClick={() => setGoods([...goods].reverse())}
                >
                  Reverse
                </button>

                <button
                  type="button"
                  className="button"
                  onClick={resetGoods}
                >
                  Reset
                </button>
              </div>
              <div className="select">
                <select
                  name="goods"
                  onChange={lengthGoods}
                >
                  <option value="1" id="defaultValue">1</option>
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
            </>
          )}
      </div>
    </div>
  );
};
