import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';
import 'bulma/css/bulma.min.css';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isVisible, setIsVisible] = useState(false);

  const reverse = () => {
    setGoods(prevState => [...prevState].reverse());
  };

  const sortAlphabetically = () => {
    setGoods(prevState => [...prevState]
      .sort((a, b) => a.localeCompare(b)));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  const sortByLength = () => {
    setGoods(prevState => [...prevState]
      .sort((a, b) => a.length - b.length));
  };

  const showStart = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <div className="app">
      {
        !isVisible
          ? (
            <div className="button-block">
              <button
                type="button"
                onClick={showStart}
                className="button is-success is-focused box"
              >
                Start
              </button>
            </div>
          )
          : (

            <div className="block app-container">
              <div className="app-list has-text-centered">
                <GoodsList goods={goods} />

                <div className="button-container">
                  <button
                    type="button"
                    onClick={reverse}
                    className="mgr-small button is-success is-focused mr-5"
                  >
                    Reverse
                  </button>

                  <button
                    type="button"
                    onClick={sortAlphabetically}
                    className="button is-success is-focused mgr-small mr-5"
                  >
                    Sort alphabetically
                  </button>

                  <button
                    type="button"
                    onClick={reset}
                    className="button is-success is-focused mr-5"
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={sortByLength}
                    className="button is-success is-focused mr-5"
                  >
                    Sort by length
                  </button>

                </div>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default App;
