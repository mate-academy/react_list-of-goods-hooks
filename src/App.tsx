import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Goods } from './Goods';

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

const filterNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const startBtnStyled = {
  mx: 'auto',
  width: '200px',
  height: '60px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

const mainBoxStyled = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  bgcolor: 'background.paper',
};

const App: React.FC = () => {
  const [showGoods, setShowGoods] = useState(false);
  const [sortBy, setSortBy] = useState('initial');
  const [isReversed, setIsReversed] = useState(false);
  const [filterLength, setFilterLength] = useState(1);

  return (
    <Box sx={mainBoxStyled}>
      {!showGoods && (
        <Button
          variant="contained"
          onClick={() => setShowGoods(true)}
          sx={startBtnStyled}
        >
          Start
        </Button>
      )}

      {showGoods && (
        <div className="content">
          <Goods
            goods={goodsFromServer}
            sortBy={sortBy}
            isReversed={isReversed}
            filterLength={filterLength}
          />

          <Box sx={{ width: '100%', display: 'grid', gap: '20px' }}>
            <Button
              variant="contained"
              onClick={() => setSortBy('alphabet')}
            >
              Sort alphabetically
            </Button>

            <Button
              variant="contained"
              onClick={() => setSortBy('length')}
            >
              Sort by length
            </Button>

            <Button
              variant="contained"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </Button>

            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => {
                setSortBy('initial');
                setFilterLength(1);
              }}
              color="error"
            >
              Reset
            </Button>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterLength}
                onChange={(e) => {
                  setFilterLength(+e.target.value);
                }}
              >
                {filterNumbers.map(num => (
                  <MenuItem
                    key={num}
                    value={num}
                  >
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default App;
