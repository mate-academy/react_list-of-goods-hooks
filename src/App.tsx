import React, { useState } from 'react';
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
  const [listVisible, setListVisible] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  const findIndexOfName = (currentName: string): number => (
    goodsFromServer.findIndex(name => name === currentName)
  );

  return (
    <div className="conteiner">
      <div className="app">
        {!listVisible ? (
          <button
            className="button is-danger is-large"
            type="button"
            onClick={() => setListVisible(!listVisible)}
          >
            Start
          </button>
        ) : (
          <div className="app__listConteiner">
            <h1 className="app__title">Goods:</h1>

            <ul
              className="app__list"
            >
              {visibleGoods.map(good => (
                <li
                  className="app__list-item"
                  key={good}
                >
                  {`${findIndexOfName(good) + 1} - ${good}`}
                </li>
              ))}
            </ul>

            <button
              className="button is-primary"
              type="button"
              onClick={() => (setVisibleGoods(
                (prevVisibleGoods) => [...prevVisibleGoods].reverse(),
              ))}
            >
              Reverse
            </button>
            <button
              className="button is-primary"
              type="button"
              onClick={() => (setVisibleGoods(
                (prevVisibleGoods) => [...prevVisibleGoods].sort(
                  (a, b) => a.localeCompare(b),
                ),
              ))}
            >
              Sort alphabetically
            </button>
            <button
              className="button is-primary"
              type="button"
              onClick={() => (setVisibleGoods(
                (prevVisibleGoods) => [...prevVisibleGoods].sort(
                  (a, b) => a.length - b.length,
                ),
              ))}
            >
              Sort by length
            </button>

            <button
              className="button is-warning"
              type="button"
              onClick={() => setVisibleGoods([...goodsFromServer])}
            >
              Reset
            </button>
            {listVisible && (
              <button
                className="button is-danger"
                type="button"
                onClick={() => setListVisible(!listVisible)}
              >
                Hide list
              </button>
            )}
          </div>

        )}
      </div>
    </div>
  );
};

export default App;
