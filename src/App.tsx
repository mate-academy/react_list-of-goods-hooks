import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './Components/List/GoodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [toShow, setToShow] = useState<boolean>(false);
  const sortAlphabetically = () => {
    setGoods([...goods].sort((a: string, b: string) => a.localeCompare(b)));
    setToShow(true);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a: string, b: string) => a.length - b.length));
    setToShow(true);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
    setToShow(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={reverse}
        >
          Reverse
        </button>

        {toShow && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods([...goodsFromServer]);
              setToShow(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList vals={goods} />
    </div>
  );
};
