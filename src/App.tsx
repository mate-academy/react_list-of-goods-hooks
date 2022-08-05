import { FC, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

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

const preparedGoods = goodsFromServer.map(name => ({
  name,
  id: uuidv4(),
}));

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const start = () => setStarted(true);
  const sortByName = () => setSortType(SortType.ALPHABET);
  const sortByLength = () => setSortType(SortType.LENGTH);
  const reverse = () => setReversed(!isReversed);
  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const getReorderedGoods = () => {
    const visibleGoods = [...preparedGoods];

    if (sortType !== SortType.NONE) {
      visibleGoods.sort((a, b) => {
        switch (sortType) {
          case SortType.ALPHABET:
            return a.name.localeCompare(b.name);
          case SortType.LENGTH:
            return a.name.length - b.name.length;
          default:
            return 0;
        }
      });
    }

    return isReversed
      ? visibleGoods.reverse()
      : visibleGoods;
  };

  const visibleGoods = useMemo(getReorderedGoods, [isReversed, sortType]);

  return (
    <div className="App level is-flex-direction-column">
      {!isStarted && (
        <button
          type="button"
          className="button is-success level-item"
          onClick={start}
        >
          Start
        </button>
      )}

      {isStarted && (
        <div className="level-item is-flex-direction-column">
          <div>
            <button
              type="button"
              className="button is-primary m-2"
              onClick={sortByName}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-primary m-2"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-primary m-2"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-primary m-2"
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {visibleGoods.map(({ name, id }) => (
              <li className="Goods__item" key={id}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
