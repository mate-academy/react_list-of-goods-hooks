import React, { useState } from 'react';
import classNames from 'classnames';
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
  NONE,
  ALPHABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.NONE:
      return visibleGoods;

    case SortType.ALPHABET:
      return [...visibleGoods].sort((good1, good2) => {
        return good1.localeCompare(good2);
      });

    case SortType.LENGTH:
      return [...visibleGoods].sort((good1, good2) => {
        return good1.length - good2.length;
      });

    default:
      break;
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getReorderedGoods(goodsFromServer, sortType);

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => setSortType(() => SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(() => SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(() => !isReversed)}
        >
          Reverse
        </button>

        { (sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(() => SortType.NONE);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => {
            return (
              <li
                data-cy="Good"
                key={good}
              >
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
