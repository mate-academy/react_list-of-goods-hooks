import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';

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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

// eslint-disable-next-line max-len
function getReorderedGoods(goods: string[], sortType: SortType, isReversed: boolean) {
  const visibleGoods = [...goods].sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isGoodsVisible, setIsGoodsVisible] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [reverse, setReverse] = useState(false);
  const preparedGoods
    = getReorderedGoods(goodsFromServer, sortType, reverse);

  return (
    <div className="App">
      {(!isGoodsVisible && (
        <button
          type="button"
          className="button"
          onClick={() => (
            setIsGoodsVisible(true)
          )}
        >
          Start
        </button>
      ))}

      {(isGoodsVisible && (
        <>
          <div className="buttons">
            <button
              type="button"
              className={cn('button',
                { active: sortType === SortType.ALPHABET })}
              onClick={() => {
                setSortType(SortType.ALPHABET);
              }}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className={cn('button',
                { active: sortType === SortType.LENGTH })}
              onClick={() => {
                setSortType(SortType.LENGTH);
              }}
            >
              Sort by length
            </button>
            <button
              type="button"
              className={cn('button', { active: reverse })}
              onClick={() => {
                setReverse(!reverse);
              }}
            >
              Reverse
            </button>
            <button
              type="button"
              className="button"
              onClick={() => {
                setSortType(SortType.NONE);
                setReverse(false);
              }}
            >
              Reset
            </button>
          </div>
          <ul className="Goods">
            {preparedGoods.map(good => (
              <li key={good} className="Goods__item">{good}</li>
            ))}
          </ul>
        </>
      ))}
    </div>
  );
};
