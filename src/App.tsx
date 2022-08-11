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
  ALPHABET,
  LENGTH,
}

const getReorderedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
  charsLimit: number,
) => {
  let visibleGoods = [...goods];

  visibleGoods = visibleGoods.filter(good => good.length >= charsLimit);

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    case SortType.NONE:
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [startWork, setStartWork] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [charsLimit, setCharsLimit] = useState(1);

  const goods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
    charsLimit,
  );

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
    setCharsLimit(1);
  };

  return (
    <div className="App">
      {!startWork && (
        <button
          type="button"
          className="button is-link is-outlined is-large start"
          onClick={() => setStartWork(true)}
        >
          Start
        </button>
      )}

      {startWork && (
        <div className="box has-background-link-light contant">
          <div className="buttons">
            <button
              type="button"
              className="button is-link btn"
              onClick={() => setSortType(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-link btn"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <div className="select is-link salaction">
              <select
                className="has-background-link-light is-warning"
                onClick={(e) => setCharsLimit(+e.currentTarget.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setIsReversed(!isReversed)}
              className="button is-warning btn"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={reset}
              className="button is-danger btn"
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {goods.map(good => (
              <li key={good} className="Goods__item">
                {good}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
