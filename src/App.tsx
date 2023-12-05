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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

const getReorderedGoods = (
  goods: string[], { sortType, isReversed }: ReorderOptions,
) => {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  visibleGoods.sort((good1, good2) => {
    if (sortType === SortType.ALPHABET) {
      return good1.localeCompare(good2);
    }

    if (sortType === SortType.LENGTH) {
      return good1.length - good2.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const goods = getReorderedGoods(
    [...goodsFromServer], { sortType, isReversed },
  );

  const sort = (text: SortType) => {
    setSortType(text);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = (text: SortType) => {
    setSortType(text);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // className="button is-info is-light"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => sort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => sort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={reverse}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || isReversed)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset(SortType.NONE)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map((good) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
