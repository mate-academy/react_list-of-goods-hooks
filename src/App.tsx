import React, { useState } from 'react';
import './App.css';
import classNames from 'classnames';

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

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [showGoods, setShowGoods] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  const preparedGoods
    = getReorderedGoods(goodsFromServer, sortType, reverse);

  return (
    <div className="App">
      {(!showGoods
        && (
          <button
            type="button"
            className="button"
            onClick={() => (
              setShowGoods(true)
            )}
          >
            Start
          </button>
        )) || (
        <>
          <div className="buttons">
            <button
              type="button"
              className={classNames('button',
                { active: activeButton === 'alpha' })}
              onClick={() => {
                setSortType(1);
                setActiveButton('alpha');
              }}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className={classNames('button',
                { active: activeButton === 'length' })}
              onClick={() => {
                setSortType(2);
                setActiveButton('length');
              }}
            >
              Sort by length
            </button>
            <button
              type="button"
              className={classNames('button',
                { active: activeButton === 'reverse' })}
              onClick={() => {
                setReverse(!reverse);
                setActiveButton('reverse');
              }}
            >
              Reverse
            </button>
            <button
              type="button"
              className={classNames('button',
                { active: activeButton === 'reset' })}
              onClick={() => {
                setSortType(0);
                setReverse(false);
                setActiveButton('reset');
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
      )}
    </div>
  );
};
