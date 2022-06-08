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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const resetGoods = [...goodsFromServer];
  const [isVisible, setIsVisible] = useState(false);

  const sortAlhabet = (products: string[]) => (
    setGoods([...products].sort((good1: string, good2: string) => (
      good1.localeCompare(good2)))));

  const sortLength = (products: string[]) => (
    setGoods([...products].sort((good1: string, good2: string) => (
      good1.length - good2.length))));

  return (
    <div
      className="
    uk-flex-center
    uk-flex-column
    uk-flex-center@s
    uk-flex-center@l
    uk-flex"
    >
      <div className="
      good
      uk-margin-auto
      uk-width-large
      uk-card"
      >
        <h1 className="
        good__title
        uk-align-center
        uk-text-bold
        uk-text-center"
        >
          List of Goods
        </h1>
        {!isVisible && (
          <button
            type="button"
            className="
            good__start
            uk-align-center
            uk-button
            uk-button-primary
            uk-width-medium"
            onClick={() => {
              setIsVisible(true);
            }}
          >
            Start
          </button>
        )}
        {isVisible && (
          <>
            <ul className="
            good__list
            uk-align-center
            uk-list
            uk-text-center"
            >
              {goods.map(good => (
                <li className={`good__item good__${good.toLowerCase()} uk-text-bold`}>
                  {good}
                </li>
              ))}
            </ul>
            <div className="container uk-width-medium uk-align-center">
              <button
                type="button"
                className="
                good__reverse
                uk-button
                uk-button-secondary
                uk-width-medium
                uk-margin-small"
                onClick={() => {
                  setGoods([...goods].reverse());
                }}
              >
                Reverse
              </button>
              <button
                type="button"
                className="
                good__sort-alphbet
                uk-button
                uk-button-secondary
                uk-width-medium
                uk-margin-small"
                onClick={() => sortAlhabet(goods)}
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                className="
                good__reset
                uk-button
                uk-button-secondary
                uk-width-medium
                uk-margin-small"
                onClick={() => setGoods(resetGoods)}
              >
                Reset
              </button>
              <button
                type="button"
                className="
                good__sort-length
                uk-button
                uk-button-secondary
                uk-width-medium
                uk-margin-small"
                onClick={() => sortLength(goods)}
              >
                Sort by length
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
