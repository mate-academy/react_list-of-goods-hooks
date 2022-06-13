/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './App.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { orange } from '@mui/material/colors';
import { ListItemText } from '@mui/material';

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

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);

  return (
    <div className="App">
      <h1>Goods</h1>
      <Box sx={{ m: 2 }}>
        Goods available: {goodsFromServer.length}
      </Box>
      <br />
      {isVisible === false && (
        <Button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          Start
        </Button>
      )}

      {isVisible && (
        <Box sx={{ ms: 1, mb: 0 }}>
          <List>
            {visibleGoods.map((good: string) => (
              <ListItem sx={{ pt: 0 }} key={good}>
                <ListItemText>{good}</ListItemText>
              </ListItem>
            ))}
          </List>
          <ButtonGroup sx={{ color: orange[500] }}>
            <Button
              onClick={() => setVisibleGoods([...visibleGoods].reverse())}
            >
              Reverse
            </Button>
            <Button
              onClick={() => setVisibleGoods([...visibleGoods].sort(
                (good1, good2) => good1.localeCompare(good2),
              ))}
            >
              Sort alphabetically
            </Button>
            <Button
              onClick={() => setVisibleGoods([...goodsFromServer])}
            >
              Reset
            </Button>
            <Button
              onClick={() => setVisibleGoods([...visibleGoods].sort(
                (good1, good2) => (good1.length - good2.length),
              ))}
            >
              Sort by Length
            </Button>
          </ButtonGroup>

        </Box>
      )}
    </div>
  );
};

export default App;
