import { FC, useState } from 'react';
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

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    case SortType.NONE:
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: FC = () => {
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const isStart = () => setStart(true);

  const sortByName = () => setSortType(SortType.ALPHABET);

  const sortByLength = () => setSortType(SortType.LENGTH);

  const reversed = () => setReverse(current => !current);

  const reset = () => {
    setReverse(false);
    setSortType(SortType.NONE);
  };

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {!isStarted
        ? (
          <button className="start" type="button" onClick={isStart}>
            Start
          </button>
        )
        : (
          <div className="App__list">
            <button type="button" onClick={sortByName}>
              Sort alphabetically
            </button>

            <button type="button" onClick={sortByLength}>
              Sort by length
            </button>

            <button type="button" onClick={reversed}>
              Reverse
            </button>

            <button className="reset" type="button" onClick={reset}>
              Reset
            </button>

            <ul className="Goods">
              {goods.map(good => (
                <li className="Goods__item" key={good}>{good}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
