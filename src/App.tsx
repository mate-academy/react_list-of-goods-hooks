import 'bulma/css/bulma.css';
import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

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

enum SortType {
  Alphabetically = 'isAlphabeticaly',
  Length = 'isLength',
  None = '',
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortedType, setSortedType] = useState<SortType>(SortType.None);

  const sortGoods = (sortType: SortType): string[] => {
    let newGoods: string[] = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetically:
        newGoods = newGoods
          .sort((good1, good2) => good1.localeCompare(good2));

        break;

      case SortType.Length:
        newGoods = newGoods
          .sort((good1, good2) => good1.length - good2.length);

        break;

      default:
        newGoods = [...newGoods];
    }

    if (isReversed) {
      newGoods = newGoods.reverse();
    }

    return newGoods;
  };

  const sortByAlphabetically = (): void => {
    setSortedType(SortType.Alphabetically);
  };

  const sortByLength = (): void => {
    setSortedType(SortType.Length);
  };

  const reverseGoods = (): void => {
    setIsReversed(!isReversed);
  };

  const reset = (): void => {
    setIsReversed(false);
    setSortedType(SortType.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortedType !== SortType.Alphabetically,
          })}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortedType !== SortType.Length,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {sortedType !== SortType.None && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods(sortedType).map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
