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
  NAME = 'name',
  LENGTH = 'length',
  NONE = 'none',
}

function sortArray(
  goods: string[],
  howSort: SortType,
  isReversed: boolean,
) {
  const array = [...goods];

  array.sort((value1, value2) => {
    switch (howSort) {
      case SortType.NAME:
        return value1.localeCompare(value2);

      case SortType.LENGTH:
        return value1.length - value2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    array.reverse();
  }

  return array;
}

export const App: React.FC = () => {
  const [sort, setSort] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = sortArray(
    goodsFromServer,
    sort,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === SortType.NAME ? null : 'is-light'}`}
          onClick={() => setSort(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort === SortType.LENGTH ? null : 'is-light'}`}
          onClick={() => setSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === true ? null : 'is-light'}`}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {sort !== SortType.NONE || (isReversed && (
          <button
            type="button"
            className={`button is-danger ${sort !== SortType.NONE || isReversed ? null : 'is-light'}`}
            onClick={() => {
              setSort(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ))}

      </div>

      <ul>
        {visibleGoods.map(word => (
          <li data-cy="Good" key={word}>{word}</li>
        ))}
      </ul>
    </div>
  );
};
