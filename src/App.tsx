import React, { ChangeEvent, useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import './App.scss';

const goodsFromServer = [
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

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
  selected: number,
) {
  const visibleGoods = [...goods].filter(good => good.length <= selected);

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [selected, setSelected] = useState(1);

  const minLengthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const resetToDefault = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
    setSelected(1);
  };

  const groupByLength = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(+e.target.value);
  };

  const goodsList = () => getReorderedGoods(
    goodsFromServer, sortType, isReversed, selected,
  );

  useEffect(() => {
    goodsList();
  });

  return (
    <div className="App">
      {!isStarted && (
        <button
          className="
            App__start-button
            button
            is-primary"
          type="button"
          onClick={() => setIsStarted(true)}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div className="App__list list">
          <div className="list__options options">
            <button
              className="
                options__button
                button
                is-info"
              type="button"
              onClick={() => setSortType(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>

            <button
              className="
                options__button
                button
                is-success"
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              className="
                options__button
                button
                is-warning"
              type="button"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>

            <button
              className="
                options__button
                button
                is-danger"
              type="button"
              onClick={() => resetToDefault()}
            >
              Reset
            </button>

            <div className="
              options__select
              select
              is-link"
            >
              <select
                name="minLength"
                className="select is-link"
                value={selected}
                onChange={(e) => groupByLength(e)}
              >
                {minLengthList.map(length => (
                  <option
                    key={length}
                    value={length}
                  >
                    {length}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ul className="list__goods content">
            {goodsList().map((good) => (
              <li
                className="list__goods-item"
                key={good}
              >
                {good}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
