import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode}
      mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === 'dark'
          ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
    },
  }),
  [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

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

function orderedGoods(
  goods: string[],
  isReversed: boolean,
  sortType: SortType,
) {
  const goodsOnPage = [...goods];

  goodsOnPage.sort((first, second) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return first.localeCompare(second);

      case SortType.LENGTH:
        return first.length - second.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsOnPage.reverse();
  }

  return goodsOnPage;
}

export const App: React.FC = () => {
  const [isReversed, setIsREversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleSortedAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortedLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setIsREversed(element => !element);
  };

  const handleReset = () => {
    setIsREversed(false);
    setSortType(SortType.NONE);
  };

  const goodsOnPage = orderedGoods(goodsFromServer, isReversed, sortType);

  const isResetVisible = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <ToggleColorMode />
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleSortedAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortedLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goodsOnPage.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
