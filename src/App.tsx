import React, { useMemo, useState } from 'react';
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
  None = 'None',
  Alphabet = 'Alphabet',
  Length = 'Length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const copy = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabet:
        copy.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        copy.sort((a, b) => a.length - b.length);
        break;

      case SortType.None:
      default:
        break;
    }

    if (isReversed) {
      copy.reverse();
    }

    return copy;
  }, [sortType, isReversed]);

  // const isDefaultState = sortType === SortType.None && !isReversed;

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const handleSortAlphabet = () => setSortType(SortType.Alphabet);
  const handleSortLength = () => setSortType(SortType.Length);
  const handleReverse = () => setIsReversed(prev => !prev);

  const alphabetBtnClass =
    `button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`.trim();

  const lengthBtnClass =
    `button is-success ${sortType === SortType.Length ? '' : 'is-light'}`.trim();

  const reverseBtnClass =
    `button is-warning ${isReversed ? '' : 'is-light'}`.trim();

  const resetBtnClass = 'button is-danger';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetBtnClass}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthBtnClass}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseBtnClass}
          onClick={handleReverse}
        >
          Reverse
        </button>

        <button type="button" className={resetBtnClass} onClick={handleReset}>
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
