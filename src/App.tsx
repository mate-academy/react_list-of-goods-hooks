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

function getReorderedGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case 'ALPHABET':
        return good1.localeCompare(good2);

      case 'LENGTH':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('NONE');
  const [isReversed, setIsReversed] = useState(false);

  const handleClickSortByAlphabet = () => {
    setSortType('ALPHABET');
  };

  const handleClickSortByLength = () => {
    setSortType('LENGTH');
  };

  const handleClickReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleClickReset = () => {
    setSortType('NONE');
    setIsReversed(false);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'ALPHABET'
            ? 'is-light'
            : ''}`}
          onClick={handleClickSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'LENGTH'
            ? 'is-light'
            : ''
          }`}
          onClick={handleClickSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed
            ? 'is-light'
            : ''
          }`}
          onClick={handleClickReverse}
        >
          Reverse
        </button>

        {(sortType !== 'NONE' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClickReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
