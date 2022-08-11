/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './App.css';

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
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  // eslint-disable-next-line
  let [isStarted, start] = useState(false);
  const [isReversed, makeReverse] = useState(false);
  const [sortType, sortByType] = useState(SortType.NONE);

  const reverse = () => {
    makeReverse(!isReversed);
  };

  const sortByAlpabet = () => {
    sortByType(SortType.ALPABET);
  };

  const sortByLength = () => {
    sortByType(SortType.LENGTH);
  };

  const reset = () => {
    sortByType(SortType.NONE);
    makeReverse(false);
  };

  const renderList = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <Stack direction="row" spacing={2}>
      <div className="App">
        {!isStarted && (
          <Button
            variant="outlined"
            type="button"
            onClick={() => {
              start(isStarted = true);
            }}
          >
            Start
          </Button>
        )}

        {isStarted && (
          <>
            <Button
              className="button"
              type="button"
              variant="contained"
              onClick={sortByAlpabet}
            >
              Sort alphabetically
            </Button>
            <Button
              className="button"
              type="button"
              variant="contained"
              onClick={sortByLength}
            >
              Sort by length
            </Button>
            <Button
              className="button"
              variant="contained"
              type="button"
              onClick={reverse}
            >
              Reverse
            </Button>
            <Button
              variant="outlined"
              color="error"
              type="button"
              onClick={reset}
            >
              Reset
            </Button>
            <ul className="Goods">
              {renderList.map(good => (
                <li key={good} className="goods">
                  {good}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Stack>
  );
};
