import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { ListItem, ListItemText } from '@mui/material';

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

export const App: React.FC = () => {
  const initialGoods = goodsFromServer;
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const sortAlphabetically = () => {
    const sortedByAlphabet: string[] = [...initialGoods].sort();

    setGoods(sortedByAlphabet);
  };

  const sortByLength = () => {
    const sortedByLength: string[]
      = [...initialGoods].sort((a, b) => a.length - b.length);

    setGoods(sortedByLength);
  };

  const reverse = () => {
    const reversed: string[] = [...goods].reverse();

    setGoods(reversed);
  };

  const reset = () => {
    setGoods(initialGoods);
  };

  const start = () => {
    setIsStarted(true);
  };

  return (
    <div className="App">
      {!isStarted
        ? (
          <Button
            variant="outlined"
            size="large"
            onClick={start}
            className="button"
          >
            Start
          </Button>
        )
        : (
          <div>
            <Button
              variant="outlined"
              size="large"
              onClick={sortAlphabetically}
              className="button"
            >
              Sort alphabetically
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={sortByLength}
              className="button"
            >
              Sort by length
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={reverse}
              className="button"
            >
              Reverse
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={reset}
              className="button"
            >
              Reset
            </Button>

            <ListItem className="Goods">
              {goods.map(good => (
                <ListItemText key={good} className="Goods__item">
                  {good}
                </ListItemText>
              ))}
            </ListItem>
          </div>
        )}
    </div>
  );
};
