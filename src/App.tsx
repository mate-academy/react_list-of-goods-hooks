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

let activeButtons: string[] = [];

export const App: React.FC = () => {
  const [showGoods, setShowGoods] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [reverse, setReverse] = useState(false);
  const preparedGoods
    = getReorderedGoods(goodsFromServer, sortType, reverse);

  const setActiveButton = (addElement: string, removeElements = false) => {
    if (removeElements) {
      activeButtons = [];
    }

    if (!activeButtons.includes(addElement)) {
      activeButtons.push(addElement);
    } else if (addElement === 'reverse' && activeButtons.includes(addElement)) {
      const index = activeButtons.indexOf(addElement);

      activeButtons.splice(index, 1);
    }
  };

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
                { active: activeButtons.includes('alpha') })}
              onClick={() => {
                setSortType(1);
                setActiveButton('alpha', true);
              }}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className={classNames('button',
                { active: activeButtons.includes('length') })}
              onClick={() => {
                setSortType(2);
                setActiveButton('length', true);
              }}
            >
              Sort by length
            </button>
            <button
              type="button"
              className={classNames('button',
                { active: activeButtons.includes('reverse') })}
              onClick={() => {
                setReverse(!reverse);
                setActiveButton('reverse');
              }}
            >
              Reverse
            </button>
            <button
              type="button"
              className="button"
              onClick={() => {
                setSortType(0);
                setReverse(false);
                setActiveButton('', true);
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
