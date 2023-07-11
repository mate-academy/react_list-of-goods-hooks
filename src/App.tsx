import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

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

enum SortFields {
  NONE = '',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

const getSortedGoods = (
  goods: string[],
  sortField: SortFields,
  isReversed: boolean,
) => {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFields.ALPHABET:
          return good1.localeCompare(good2);
        case SortFields.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

type GoodListProps = {
  goods: string[],
};

export const GoodList: React.FC<GoodListProps> = ({ goods }) => (
  <ul>
    {goods.map(
      good => (
        <li
          data-cy="Good"
          key={good}
        >
          {good}
        </li>
      ),
    )}
  </ul>
);

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortFields.NONE);
  const [reversedList, setReversedList] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, sortField, reversedList);

  const onReset = () => {
    setSortField(SortFields.NONE);
    setReversedList(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SortFields.ALPHABET },
            )
          }
          onClick={() => setSortField(SortFields.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SortFields.LENGTH },
            )
          }
          onClick={() => setSortField(SortFields.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !reversedList },
            )
          }
          onClick={() => setReversedList(!reversedList)}
        >
          Reverse
        </button>

        {(sortField.length > 0 || reversedList) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
