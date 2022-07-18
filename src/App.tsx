import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import './App.scss';

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
  NONE = 'NONE',
  ALPABET = 'ALPABET',
  LENGTH = 'LENGTH',
  DEFAULT = 'DEFAULT',
}

export const App: React.FC = () => {
  const goods: string[] = [...goodsFromServer];

  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortBy] = useState<SortType>(SortType.DEFAULT);

  const reset = () => {
    setReversed(false);
    setSortBy(SortType.DEFAULT);
  };

  switch (sortType) {
    case SortType.LENGTH:
      goods.sort((a, b) => a.length - b.length);
      break;

    case SortType.ALPABET:
      goods.sort((a, b) => a.localeCompare(b));
      break;

    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="app">
      {isStarted
        ? (
          <>
            <h1 className="app__title">Goods</h1>

            <div className="buttons">
              <Button
                color="info"
                type="button"
                onClick={() => setReversed(!isReversed)}
                className="button"
              >
                Reverse
              </Button>

              <button
                type="button"
                onClick={() => setSortBy(SortType.ALPABET)}
                className="button"
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={() => setSortBy(SortType.LENGTH)}
                className="button"
              >
                Sort by length
              </button>

              <Button
                className="button"
                color="danger"
                type="button"
                onClick={reset}
              >
                Reset
              </Button>
            </div>

            <ul className="app__list">
              {goods.map(good => (
                <li
                  className="Goods__item"
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>

          </>
        )
        : (
          <Button
            color="primary"
            type="button"
            onClick={() => setIsStarted(!isStarted)}
            className="buttons__start"
          >
            Start
          </Button>
        )}
    </div>
  );
};
