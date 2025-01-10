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

enum SortType {
  RESET_SORTING,
  ALPHABETICAL_SORTING,
  SORT_BY_LENGTH,
}

function prepareGoods(goods: string[], sortType: SortType, reversed: boolean) {
  const preparedGoods = [...goods];

  // eslint-disable-next-line default-case
  switch (sortType) {
    case SortType.RESET_SORTING:
      break;

    case SortType.ALPHABETICAL_SORTING:
      preparedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;

    case SortType.SORT_BY_LENGTH:
      preparedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;
  }

  return reversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.RESET_SORTING);

  const preparedGoods = prepareGoods(goodsFromServer, sortType, reversed);

  const reset = () => {
    setReversed(false);
    setSortType(SortType.RESET_SORTING);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.ALPHABETICAL_SORTING)}
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABETICAL_SORTING,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.SORT_BY_LENGTH)}
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {(sortType !== SortType.RESET_SORTING || reversed) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
