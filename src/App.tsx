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
  let visibleGoods = [...goods];

  switch (sortType) {
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => {
        return good1.length - good2.length;
      });
      break;

    case SortType.ALPABET:
      visibleGoods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });
      break;

    case SortType.NONE:
      visibleGoods = [...goodsFromServer];
      break;

    default:
      throw new Error('Type is not supported');
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reorderedArr = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  const isOrderSame = !(sortType === SortType.NONE && !isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.ALPABET)}
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.LENGTH)}
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(current => !current)}
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {isOrderSame && (
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
        <ul>
          {reorderedArr.map((item: string) => (
            <li key={item} data-cy="Good">{item}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
