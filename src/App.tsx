import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export function reorderGoods(
  goods: string[], sortType: number, isReversed: boolean,
) {
  const visibleGoods = [...goods];

  try {
    visibleGoods.sort((good1, good2): number => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          throw new Error('No filter was choosen');
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

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

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [changed, setChanged] = useState(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => {
            setSortType(SortType.ALPHABET);
            setChanged(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            setSortType(SortType.LENGTH);
            setChanged(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !reversed },
          )}
          onClick={() => {
            setReversed(current => !current);
          }}
        >
          Reverse
        </button>

        {(reversed || changed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortType(SortType.NONE);
              setChanged(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderGoods(
            goodsFromServer,
            sortType,
            reversed,
          ).map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
