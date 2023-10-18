import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classes from 'classnames';

type Good = {
  good: string;
  id: number;
};

export const goodsFromServer :string[] = [
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

const goodsWithKeys :Good[] = goodsFromServer.map((elem, index) => {
  return {
    good: elem,
    id: index,
  };
});

enum SortType {
  Length = 'Length',
  Alphabetically = 'Alphabetically',
}

interface SortParams {
  sortParam : string;
  isReversed: boolean;
}

const getPreparedGoods = (
  goods: Good[],
  { sortParam, isReversed } :SortParams,
) :Good[] => {
  const prepareGoods = [...goods];

  if (sortParam) {
    prepareGoods.sort((good1, good2) => {
      switch (sortParam) {
        case SortType.Alphabetically:
          return good1.good.localeCompare(good2.good);

        case SortType.Length:
          return good1.good.length - good2.good.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App: React.FC = () => {
  const [sortParam, setSortParam] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const reparedGoods = getPreparedGoods(
    goodsWithKeys,
    { sortParam, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classes(
            'button',
            'is-info',
            { 'is-light': sortParam !== SortType.Alphabetically },
          )}
          onClick={() => setSortParam(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classes(
            'button',
            'is-success',
            { 'is-light': sortParam !== SortType.Length },
          )}
          onClick={() => setSortParam(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classes(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortParam || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversed(false);
                setSortParam('');
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {reparedGoods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good.good}
          </li>
        ))}
      </ul>
    </div>
  );
};
