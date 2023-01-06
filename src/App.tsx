import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export const goodsFromServer = [
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

type Props = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: Props,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((productName1, productName2) => (
        productName1.localeCompare(productName2)
      ));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((product1, product2) => (
        product1.length - product2.length
      ));
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
  const [sortType, setSorting] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const goodsReverse = () => {
    setReverse(current => !current);
  };

  const sortByAlphabet = () => {
    setSorting(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSorting(SortType.LENGTH);
  };

  const resetButton = () => {
    setReverse(false);
    setSorting(SortType.NONE);
  };

  const preparedGoods = (
    getReorderedGoods(goodsFromServer, { isReversed, sortType })
  );

  return (
    <>
      <div className="container">
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              mt: 30,
              mx: 'auto',
              width: 665,
              height: 500,
            },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              backgroundColor: 'text.disabled',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start',
              fontSize: 24,
              fontWeight: 'bold',
            }}
          >
            <div className="section content">
              <div className="buttons">
                <Button
                  variant="contained"
                  type="button"
                  className={sortType === SortType.ALPHABET
                    ? 'button is-info'
                    : 'button is-info is-light'}
                  onClick={sortByAlphabet}
                >
                  Sort alphabetically
                </Button>

                <Button
                  variant="contained"
                  type="button"
                  className={sortType === SortType.LENGTH
                    ? 'button is-success'
                    : 'button is-success is-light'}
                  onClick={sortByLength}
                >
                  Sort by length
                </Button>

                <Button
                  variant="contained"
                  type="button"
                  className={isReversed
                    ? 'button is-warning'
                    : 'button is-warning is-light'}
                  onClick={goodsReverse}
                >
                  Reverse
                </Button>

                {(sortType !== SortType.NONE || isReversed)
                  && (
                    <Button
                      variant="outlined"
                      color="error"
                      type="button"
                      className="button is-danger"
                      onClick={resetButton}
                    >
                      Reset
                    </Button>
                  )}
              </div>
              <div className="list">
                <ul>
                  {preparedGoods.map(product => (
                    <li data-cy="Good" key={product}>
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </>
  );
};
