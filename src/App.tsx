import React, { useState } from 'react';
import './App.css';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

enum SortType {
  NONE = 'none',
  ALPABET = 'string',
  LENGTH = 'number',
}

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

const wordLengthFromServer = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
  minLength: number,
) {
  const visibleGoods = [...goods].filter(good => good.length >= minLength);

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.NONE:
        return 0;

      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        throw new Error('unknown sort type in getReorderedGoods function');
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [minLength, setMinLength] = useState(1);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
    minLength,
  );

  const wordLengths = [...wordLengthFromServer];

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(current => !current);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
    setMinLength(1);
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setMinLength(+event.target.value);
  };

  return (
    <div className="App">
      {!isStarted ? (
        <div className="start-button__container">
          <Button
            variant="outlined"
            type="button"
            className="start-button"
            onClick={() => setIsStarted(true)}
          >
            Start
          </Button>
        </div>
      ) : (
        <>
          <div className="menu__controls">
            <Button
              variant="outlined"
              type="button"
              className="menu__button"
              onClick={() => handleSort(SortType.ALPABET)}
            >
              Sort alphabetically
            </Button>
            <Button
              variant="outlined"
              type="button"
              className="menu__button"
              onClick={() => handleSort(SortType.LENGTH)}
            >
              Sort by length
            </Button>
            <Button
              variant="outlined"
              type="button"
              className="menu__button"
              onClick={() => handleReverse()}
            >
              Reverse
            </Button>
            <Button
              variant="outlined"
              color="error"
              type="button"
              className="menu__button"
              onClick={() => handleReset()}
            >
              Reset
            </Button>
          </div>

          <div className="select-container">
            <FormControl fullWidth>
              <InputLabel id="length-select-label">Min length</InputLabel>
              <Select
                labelId="length-select-label"
                id="length-select"
                value={minLength}
                label="Age"
                onChange={event => handleSelectChange(event)}
              >
                {wordLengths.map(length => (
                  <MenuItem value={length}>{length}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <ul className="Goods">
            {visibleGoods.map((good => (
              <li
                className="Goods__item"
                key={good}
              >
                {good}
              </li>
            )))}
          </ul>
        </>
      )}
    </div>
  );
};
