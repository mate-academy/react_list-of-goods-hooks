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
  Original = 'original',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Original);

  const [isReversed, setIsReversed] = useState<boolean>(false);

  const displayedGoods: string[] = [...goodsFromServer];

  const sortedGoods: string[] = [...displayedGoods];

  if (sortType === SortType.Alphabet) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    sortedGoods.sort((a, b) => {
      if (b.length === a.length) {
        return a.localeCompare(b);
      }

      return a.length - b.length;
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  const handleAlphabetSort = () => {
    setSortType(SortType.Alphabet);
    setIsReversed(false);
  };

  const handleLengthSort = () => {
    setSortType(SortType.Length);
    setIsReversed(false);
  };

  const handleReverseSort = () => {
    setIsReversed(prev => !prev);
  };

  const handleResetList = () => {
    setSortType(SortType.Original);
    setIsReversed(false);
  };

  let alphabetBtnClass = 'button is-info is-light';
  let lengthBtnClass = 'button is-success is-light';
  let reverseBtnClass = 'button is-warning is-light';
  const resetBtnClass = 'button is-danger is-light';

  if (sortType === SortType.Alphabet) {
    alphabetBtnClass = 'button is-info';
  }

  if (sortType === SortType.Length) {
    lengthBtnClass = 'button is-success';
  }

  if (isReversed) {
    reverseBtnClass = 'button is-warning';
  }

  const showReset = sortType !== SortType.Original || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetBtnClass}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthBtnClass}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseBtnClass}
          onClick={handleReverseSort}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className={resetBtnClass}
            onClick={handleResetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
