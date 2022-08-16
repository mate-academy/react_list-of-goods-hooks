import React, { useState } from 'react';
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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;
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
  const [isStarted, setStart] = useState(false);
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App has-text-centered">

      {!isStarted && (
        <button
          type="button"
          className="button is-success "
          onClick={() => {
            setStart(true);
          }}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <div className="button  level-item ">
            <button
              type="button"
              className="button is-link"
              onClick={() => {
                setType(SortType.ALPABET);
              }}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-success"
              onClick={() => {
                setType(SortType.LENGTH);
              }}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-warning"
              onClick={() => {
                setReverse(rev => !rev);
              }}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-danger"
              onClick={() => {
                setType(SortType.NONE);
                setReverse(false);
              }}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {goods.map(good => (
              <li
                key={good}
                className="Goods__item has-text-centered "
              >
                {good}

              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
