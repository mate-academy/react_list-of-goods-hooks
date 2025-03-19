import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

export const goodsFromServer: string[] = [
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

enum SortType {
  None = '',
  Alphabetical = 'alphabetical',
  Length = 'length',
  Reverse = 'reverse',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [activeButton, setActiveButton] = useState<SortType>(SortType.None);

  const sortAlphabetically = (): void => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
    setActiveButton(SortType.Alphabetical);
  };

  const sortByLength = (): void => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setActiveButton(SortType.Length);
  };

  const reverseOrder = (): void => {
    setGoods([...goods].reverse());
    setActiveButton(
      activeButton === SortType.Reverse ? SortType.None : SortType.Reverse,
    );
  };

  const resetGoodsOrder = (): void => {
    setGoods([...goodsFromServer]);
    setActiveButton(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.Alphabetical ? 'is-primary' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === SortType.Length ? 'is-primary' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === SortType.Reverse ? 'is-primary' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {goods.join() !== goodsFromServer.join() && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoodsOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((item: string) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
