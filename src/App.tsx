import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classes from 'classnames';
import { v4 as uuidv4 } from 'uuid';

type Good = {
  good: string;
  id: string;
};

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

const goodsWithKeys: Good[] = goodsFromServer.map((elem) => {
  return {
    good: elem,
    id: uuidv4(),
  };
});

enum SortType {
  Length = 'Length',
  Alphabetically = 'Alphabetically',
}

interface SortParams {
  sortParam: SortType | '';
  isReversed: boolean;
}

const getPreparedGoods = (
  goods: Good[],
  { sortParam, isReversed }: SortParams,
): Good[] => {
  const preparedGoods = [...goods];

  if (sortParam) {
    preparedGoods.sort(({ good: firstGood }, { good: secondGood }) => {
      switch (sortParam) {
        case SortType.Alphabetically:
          return firstGood.localeCompare(secondGood);

        case SortType.Length:
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortParam, setSortParam] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);
  const preparedGoods = getPreparedGoods(
    goodsWithKeys,
    { sortParam, isReversed },
  );

  const handleResetSorting = () => {
    setIsReversed(false);
    setSortParam('');
  };

  const isSorted = (sortParam || isReversed);

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

        {isSorted
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => handleResetSorting()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good.good}
          </li>
        ))}
      </ul>
    </div>
  );
};
