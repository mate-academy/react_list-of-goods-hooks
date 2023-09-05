import { useState } from 'react';
import cn from 'classnames';

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

enum SortField {
  DEFAULT = '',
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
}

interface ISort {
  sortField: SortField;
  isReversed: boolean;
}

function getPreparedGood(
  goods: string[],
  {
    sortField,
    isReversed,
  }: ISort,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortField.ALPHABETICALLY:
        preparedGoods.sort((item1, item2) => item1.localeCompare(item2));
        break;
      case SortField.LENGTH:
        preparedGoods.sort((item1, item2) => item1.length - item2.length);
        break;
      default:
        return preparedGoods;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortField.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGood(goodsFromServer,
    { sortField, isReversed });

  const isVisibleReset = isReversed || sortField;

  const onResetClicked = () => {
    setIsReversed(false);
    setSortField(SortField.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            {
              'is-light': sortField !== SortField.ALPHABETICALLY,
            },
          )}
          onClick={() => setSortField(SortField.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            {
              'is-light': sortField !== SortField.LENGTH,
            },
          )}
          onClick={() => setSortField(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isVisibleReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              onResetClicked();
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">{item}</li>
        ))}
      </ul>
    </div>
  );
};
