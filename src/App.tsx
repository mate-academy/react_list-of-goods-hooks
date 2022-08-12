import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';

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
  LENGTH,
  ALPHABET,
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

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {!isStarted
        ? (
          <Button
            variant="contained"
            onClick={() => setStarted(true)}
          >
            Start
          </Button>
        )
        : (
          <>
            <Button
              variant={
                sortType === SortType.ALPHABET ? ('contained') : ('outlined')
              }
              onClick={() => setSortType(sortType === SortType.ALPHABET
                ? (SortType.NONE)
                : (SortType.ALPHABET))}
            >
              Sort alphabetically
            </Button>

            <Button
              variant={
                sortType === SortType.LENGTH ? ('contained') : ('outlined')
              }
              onClick={() => setSortType(sortType === SortType.LENGTH
                ? (SortType.NONE)
                : (SortType.LENGTH))}
            >
              Sort by length
            </Button>

            <Button
              variant={
                isReversed ? ('contained') : ('outlined')
              }
              onClick={() => setReverse(!isReversed)}
            >
              Reverse
            </Button>

            <Button
              variant="outlined"
              onClick={() => {
                setSortType(SortType.NONE);
                setReverse(false);
              }}
            >
              Reset
            </Button>

            <ul className="Goods">
              {goods.map((good) => (
                <li
                  className="Goods__item"
                  key={good}
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
