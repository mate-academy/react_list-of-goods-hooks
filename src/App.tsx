import React, { useState } from 'react';
// import { useEffect } from 'react';
import './App.css';

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

enum SortGoodsBy {
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, updateGoods] = useState([...goodsFromServer]);
  const [areGoodsShowed, showGoods] = useState(false);

  const sortGoods = (sortBy: string) => {
    const sortedGoods = [...goods].sort((g1, g2) => {
      switch (sortBy) {
        case SortGoodsBy.Alphabet:
          return g1.localeCompare(g2);

        case SortGoodsBy.Length:
          return g1.length - g2.length;

        default:
          return 0;
      }
    });

    return updateGoods(sortedGoods);
  };

  return (
    <div className="App">
      {!areGoodsShowed ? (
        <button type="button" onClick={() => showGoods(true)}>
          Start
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => sortGoods(SortGoodsBy.Alphabet)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => sortGoods(SortGoodsBy.Length)}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => updateGoods([...goods].reverse())}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => updateGoods([...goodsFromServer])}
          >
            Reset
          </button>

          {areGoodsShowed && (
            <ul className="Goods">
              {goods.map(item => (
                <li key={item} className="Goods__item">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
