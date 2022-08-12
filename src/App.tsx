import React, { useState } from 'react';
import './App.css';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';

const goodsFromServer: string[] = [
  'Dumplings',
  'CsectedValuesot',
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

interface Good {
  name: string,
  id: string,
}

const preparedGoods = [...goodsFromServer].map(good => ({
  name: good,
  id: uuidv4(),
}));

const getReorderedGoods = (
  goods: Good[],
  sortType: SortType,
  isReversed: boolean,
  charsLimit: number,
) => {
  const visibleGoods = [...goods]
    .filter(good => good.name.length >= charsLimit);

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => good1.name.localeCompare(good2.name));
      break;

    case SortType.LENGTH:
      visibleGoods.sort(
        (good1, good2) => good1.name.length - good2.name.length,
      );
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

let sectedValues = new Array(10);

sectedValues = [...sectedValues].map((num, i) => {
  let n = num;

  n = i + 1;

  return n;
});

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [startWork, setStartWork] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [charsLimit, setCharsLimit] = useState(1);

  const goods = getReorderedGoods(
    preparedGoods,
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
              className={cn(
                'button is-link btn', {
                  'is-inverted': sortType === SortType.ALPHABET,
                },
              )}
              onClick={() => setSortType(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className={cn(
                'button is-link btn', {
                  'is-inverted': sortType === SortType.LENGTH,
                },
              )}
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => setIsReversed(!isReversed)}
              className={cn('button is-link  btn', {
                'is-inverted': isReversed === true,
              })}
            >
              Reverse
            </button>

            <div className="select is-link salaction">
              <select
                className="has-background-link-light is-warning"
                value={charsLimit}
                onChange={(e) => setCharsLimit(+e.currentTarget.value)}
              >
                {sectedValues.map(num => (
                  <option value={num} key={num}>{num}</option>

                ))}
              </select>
            </div>

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
              <li key={good.id} className="Goods__item">
                {good.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
