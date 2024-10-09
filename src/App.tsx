import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './GoodsList/GoodsList';
import { Good } from './types/Good';

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
  'Garlic',
];

enum SortType {
  Alphabetically,
  ByLenght,
  Revers,
  Reset,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);

  const showGoodsList = () => {
    setGoods([...goodsFromServer]);
  };

  const handleClick = (sortType: SortType) => {
    switch (sortType) {
      case SortType.Alphabetically:
        return setGoods([...goods].sort((a, b) => a.localeCompare(b)));
      case SortType.ByLenght:
        return setGoods([...goods].sort((a, b) => a.length - b.length));
      case SortType.Revers:
        return setGoods([...goods].reverse());
      case SortType.Reset:
        return setGoods([...goodsFromServer]);

      default:
        return 0;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'button--start', {
            hover: goods.length !== 0,
          })}
          onClick={showGoodsList}
        >
          Select
        </button>

        <button
          type="button"
          className="button is-info is-light"
          onClick={() => handleClick(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => handleClick(SortType.ByLenght)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => handleClick(SortType.Revers)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => handleClick(SortType.Reset)}
        >
          Reset
        </button>
      </div>

      <GoodsList goods={[...goods]} />
    </div>
  );
};
