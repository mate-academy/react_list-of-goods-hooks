import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  ALPHABET,
  LENGTH,
  NONE,
}

function getReorderedGoods(sortType: SortType, isReversed: boolean) {
  const goodsCopy = [...goodsFromServer];

  switch (sortType) {
    case SortType.ALPHABET:
      goodsCopy.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      goodsCopy.sort((a, b) => a.length - b.length);
      break;
  }

  return isReversed ? goodsCopy.reverse() : goodsCopy;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const goods = getReorderedGoods(sortType, isReversed);

  const alphabetButtonHandler = () => setSortType(SortType.ALPHABET);
  const lengthButtonHandler = () => setSortType(SortType.LENGTH);
  const reverseButtonHandler = () => setIsReversed(!isReversed);
  const resetButtonHandler = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isResetButtonActive = sortType !== SortType.NONE || isReversed;

  const getCssLightClass = (buttonType: string) => {
    let isActiveCssClass = false;

    switch (buttonType) {
      case 'alphabet':
        isActiveCssClass = sortType !== SortType.ALPHABET;
        break;
      case 'length':
        isActiveCssClass = sortType !== SortType.LENGTH;
        break;
      case 'reverse':
        isActiveCssClass = !isReversed;
    }

    return isActiveCssClass ? 'is-light' : '';
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${getCssLightClass('alphabet')}`}
          onClick={alphabetButtonHandler}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${getCssLightClass('length')}`}
          onClick={lengthButtonHandler}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${getCssLightClass('reverse')}`}
          onClick={reverseButtonHandler}
        >
          Reverse
        </button>

        {isResetButtonActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetButtonHandler}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
