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
}

type Props = {};

export const App: React.FC<Props> = () => {
  const [isAlphabeticaly, setIsAlphabeticaly] = useState(false);
  const [isLength, setIsLength] = useState(false);
  const [isReverse, setReverse] = useState(false);
  const [sortedType, setSortedType] = useState<SortType | null>(null);

  const sortGoods = (sortType: string | null): string[] => {
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

    if (isReverse) {
      newGoods = newGoods.reverse();
    }

    return newGoods;
  };

  const sortByAlphabetically = (): void => {
    setIsAlphabeticaly(true);
    setIsLength(false);
    setSortedType(SortType.Alphabetically);
  };

  const sortByLength = (): void => {
    setIsAlphabeticaly(false);
    setIsLength(true);
    setSortedType(SortType.Length);
  };

  const reverseGoods = (): void => {
    setReverse(!isReverse);
  };

  const reset = (): void => {
    setIsAlphabeticaly(false);
    setIsLength(false);
    setReverse(false);
    setSortedType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !isAlphabeticaly,
          })}
          onClick={sortByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !isLength,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(isAlphabeticaly || isLength || isReverse) && (
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
        {sortGoods(sortedType).map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
