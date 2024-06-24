import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState<boolean>(false);
  const [isSortedByLength, setIsSortedByLength] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortAlphabetically = (goods: string[]): string[] => ([...goods].sort((a, b) => a.localeCompare(b)));

  const sortByLength = (goods: string[]): string[] => ([...goods].sort((a, b) => a.length - b.length));

  const reverseOrder = (goods: string[]): string[] => ([...goods].reverse());

  const reset = (): void => {
    setIsSortedAlphabetically(false);
    setIsSortedByLength(false);
    setIsReversed(false);
  };

  const isResetVisible: boolean = isSortedAlphabetically || isSortedByLength || isReversed;

  const getVisibleGoods = (): string[] => {
    let visibleGoods: string[] = [...goodsFromServer];

    if (isSortedAlphabetically) {
      visibleGoods = sortAlphabetically(visibleGoods);
    }

    if (isSortedByLength) {
      visibleGoods = sortByLength(visibleGoods);
    }

    if (isReversed) {
      visibleGoods = reverseOrder(visibleGoods);
    }

    return visibleGoods;
  };

  const handleSortByLengthClick = (): void => {
    setIsSortedByLength(true);
    setIsSortedAlphabetically(false);
  };

  const handleSortAlphabetically = (): void => {
    setIsSortedByLength(false);
    setIsSortedAlphabetically(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortedAlphabetically ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortedByLength ? '' : 'is-light'}`}
          onClick={handleSortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {getVisibleGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
