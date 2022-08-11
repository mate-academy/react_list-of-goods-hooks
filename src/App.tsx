import React, { useState } from 'react';
import './App.css';
import { Button, ButtonGroup } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
  NONE = 'noSort',
  ALPHABET = 'alphabetSort',
  LENGTH = 'lengthSort',
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  // Not to mutate the original array
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
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

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleStart = () => (setIsStarted(true));
  const handleSortAlphabetically = () => (setSortType(SortType.ALPHABET));
  const handleSortLength = () => (setSortType(SortType.LENGTH));
  const handleReverse = () => (setIsReversed(value => !value));

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const reversedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted && (
        <Button
          type="button"
          onClick={handleStart}
        >
          Start
        </Button>
      )}

      {isStarted && (
        <>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
          >
            <Button
              type="button"
              onClick={handleSortAlphabetically}
              variant={sortType === 'alphabetSort'
                ? 'contained'
                : 'outlined'}
            >
              Sort alphabetically
            </Button>
            <Button
              type="button"
              onClick={handleSortLength}
              variant={sortType === 'lengthSort'
                ? 'contained'
                : 'outlined'}
            >
              Sort by length
            </Button>
            <Button
              type="button"
              onClick={handleReverse}
              variant={isReversed === true
                ? 'contained'
                : 'outlined'}
            >
              Reverse
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              color="error"
            >
              Reset
            </Button>
          </ButtonGroup>

          <List className="Goods">
            {reversedGoods.map(good => (
              <ListItem
                className="Goods__item"
                key={good}
              >
                {good}
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};
