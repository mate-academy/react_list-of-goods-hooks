import React, { useState } from 'react';
import './App.scss';
import Start from './image/Start.png';
import SortAlphabetic from './image/SortAlphabetic.png';
import SortLength from './image/SortLength.png';
import Reset from './image/reset.png';
import Reverse from './image/reverse.png';

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
  const [isShown, setIsShown] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const show = () => {
    setIsShown((current) => !current);
  };

  const reverse = () => {
    setGoods((current) => [...current].reverse());
  };

  const sortedByAlphabetic = () => {
    setGoods((current) => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const sortedByLength = () => {
    setGoods((current) => [...current].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="sortList">
      {!isShown && (
        <button
          type="button"
          onClick={show}
          className="sortList__button"
        >
          <img
            src={Start}
            alt="StartImage"
          />
        </button>
      )}
      {
        isShown && (
          <>
            <div className="sortList__list">
              <ul className="goodsList">
                {goods.map(good => (
                  <li key={good} className="goods__item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sortList__buttons">
              <button
                type="button"
                onClick={sortedByAlphabetic}
                className="sortList__button--sort"
              >
                <img
                  src={SortAlphabetic}
                  alt="SortAlphabetic"
                  className="sortList__image"
                />
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={sortedByLength}
                className="sortList__button--sort"
              >
                <img src={SortLength} alt="SortAlphabetic" />
                Sort by length
              </button>

              <button
                type="button"
                onClick={reset}
                className="sortList__button--sort"
              >
                <img src={Reset} alt="Reset" />
                Reset
              </button>

              <button
                onClick={reverse}
                type="button"
                className="sortList__button--sort"
              >
                <img src={Reverse} alt="Reverse" />
                Reverse
              </button>
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;
