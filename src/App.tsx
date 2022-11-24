import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  NONE,
  ALPABET,
  LENGTH,
}
type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case (SortType.ALPABET): {
      visibleGoods.sort((first, second) => first.localeCompare(second));
      break;
    }

    case (SortType.LENGTH): {
      visibleGoods.sort((first, second) => first.length - second.length);
      break;
    }

    default:
      break;
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const resetButtonRules = sortType !== SortType.NONE || isReversed;
  const alphabetButtonRules = sortType !== SortType.ALPABET;
  const lengthButtonRules = sortType !== SortType.LENGTH;

  const preparedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },

  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'button is-info is-light': alphabetButtonRules },
          )}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'button is-success is-light': lengthButtonRules },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'button is-warning is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {resetButtonRules && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>

    </div>
  );
};
