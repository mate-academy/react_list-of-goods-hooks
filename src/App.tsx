import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

export enum SortType {
  SORT_BY_ALPHABET = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [selectedSort, setSelectedSort] = useState<SortType | null>(null);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  function sorting(sortingType: SortType | null): void {
    let sortedGoods: string[] = [...goodsFromServer];

    switch (sortingType) {
      case SortType.SORT_BY_ALPHABET:
        sortedGoods = [...goods].sort((good1, good2) =>
          good1.localeCompare(good2),
        );
        break;
      case SortType.SORT_BY_LENGTH:
        sortedGoods.sort((good1, good2) => {
          if (good1.length === good2.length) {
            return good1.localeCompare(good2);
          }

          return good1.length - good2.length;
        });
        break;
      default:
        return;
    }

    if (isReverse) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSelectedSort(sortingType);
  }

  function reversing(): void {
    setIsReverse((previousReverse: boolean) => !previousReverse);
    setGoods((previousGoods: string[]) => [...previousGoods].reverse());
  }

  function reset(): void {
    setGoods(goodsFromServer);
    setSelectedSort(null);
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => sorting(SortType.SORT_BY_ALPHABET)}
          className={classNames('button', 'is-info', {
            'is-light': selectedSort !== SortType.SORT_BY_ALPHABET,
          })}
        >
          {SortType.SORT_BY_ALPHABET}
        </button>

        <button
          type="button"
          onClick={() => sorting(SortType.SORT_BY_LENGTH)}
          className={classNames('button', 'is-success', {
            'is-light': selectedSort !== SortType.SORT_BY_LENGTH,
          })}
        >
          {SortType.SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          onClick={reversing}
          className={classNames('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(selectedSort || isReverse) && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
