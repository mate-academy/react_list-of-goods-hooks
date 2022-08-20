import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
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
}

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(true);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(
    goodsFromServer, sortType, isReversed,
  );

  return (
    <div className="App">
      {isStarted && (
        <Button
          variant="contained"
          size="small"
          type="button"
          onClick={() => setStarted(false)}
        >
          Start
        </Button>
      )}

      {!isStarted && (
        <>
          <div className="Buttons">
            <Button
              variant={sortType === 1
                ? 'contained'
                : 'outlined'}
              type="button"
              size="small"
              onClick={() => setSortType(SortType.ALPABET)}
            >
              Sort alphabetically
            </Button>

            <Button
              variant={sortType === 2
                ? 'contained'
                : 'outlined'}
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </Button>

            <Button
              variant={isReversed
                ? 'contained'
                : 'outlined'}
              type="button"
              size="small"
              onClick={() => setReversed(!isReversed)}
            >
              Reverse
            </Button>

            <Button
              variant="outlined"
              color="warning"
              type="button"
              size="small"
              onClick={() => {
                setSortType(SortType.NONE);
                setReversed(false);
              }}
            >
              Reset
            </Button>
          </div>

          <List className="Goods">
            {visibleGoods.map(good => (
              <>
                <ListItem
                  disablePadding
                  key={good}
                  className="Goods__item"
                >
                  <ListItemText
                    primary={good}
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </>
      )}
    </div>
  );
};
