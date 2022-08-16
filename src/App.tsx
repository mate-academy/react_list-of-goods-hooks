import React, { useState } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Button } from '@mui/material';
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

  if (sortType !== SortType.NONE) {
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
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, Start] = useState(false);
  const [isReversed, Reverse] = useState(false);
  const [sortType, TypeSort] = useState(SortType.NONE);

  const handlerStart = () => Start(true);
  const handlerReverse = () => Reverse(current => !current);
  const handlerSortByAlpha = () => TypeSort(SortType.ALPHABET);
  const handlerSortByLength = () => TypeSort(SortType.LENGTH);
  const handlerSetDefault = () => {
    TypeSort(SortType.NONE);
    Reverse(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted && (
        <Button
          variant="contained"
          color="secondary"
          type="button"
          className="btn"
          onClick={handlerStart}
        >
          Start
        </Button>
      )}

      {isStarted && (
        <>
          <ButtonGroup
            size="large"
            aria-label="large button group"
            color="secondary"
          >
            <Button
              type="button"
              className="btn"
              variant={sortType === SortType.ALPHABET
                ? 'outlined'
                : 'contained'}
              onClick={() => {
                handlerSortByAlpha();
              }}
            >
              Sort alphabetically
            </Button>

            <Button
              type="button"
              className="btn"
              variant={sortType === SortType.LENGTH
                ? 'outlined'
                : 'contained'}
              onClick={() => {
                handlerSortByLength();
              }}
            >
              Sort by length
            </Button>

            <Button
              type="button"
              className="btn"
              variant={isReversed
                ? 'outlined'
                : 'contained'}
              onClick={() => {
                handlerReverse();
              }}
            >
              Reverse
            </Button>

            <Button
              type="button"
              variant="contained"
              className="btn"
              onClick={() => {
                handlerSetDefault();
              }}
            >
              Reset
            </Button>
          </ButtonGroup>
          <ul className="Goods">
            {goods.map(good => {
              return (
                <li
                  className="Goods__item"
                  key={good}
                >
                  {good}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
