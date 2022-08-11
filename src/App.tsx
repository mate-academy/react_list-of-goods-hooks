import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { v4 as uuidv4 } from 'uuid';

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

  visibleGoods.sort((g1: string, g2: string) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;

      case SortType.NONE:
        return 0;

      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const start = () => setIsStarted(true);
  const sortAlphabet = () => setSortType(SortType.ALPHABET);
  const sortLength = () => setSortType(SortType.LENGTH);
  const reverse = () => setIsReversed(current => !current);
  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {isStarted
        ? (
          <>
            <Button
              type="button"
              variant="outlined"
              onClick={sortAlphabet}
            >
              Sort alphabetically
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={sortLength}
            >
              Sort by length
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={reverse}
            >
              Reverse
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={reset}
            >
              Reset
            </Button>

            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
              className="Goods"
            >
              {visibleGoods.map(good => (
                <ListItem
                  key={uuidv4()}
                  className="Goods__item"
                >
                  <ListItemText primary={good} />
                </ListItem>
              ))}
            </List>
          </>
        )

        : (
          <Button
            type="button"
            variant="outlined"
            onClick={start}
          >
            Start
          </Button>
        )}
    </div>
  );
};
