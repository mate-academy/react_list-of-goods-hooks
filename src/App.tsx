import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  Default = '',
  Length = 'LENGTH',
  Alphabet = 'ALPHABET',
}

interface FilterParams {
  sortField: SortType | '';
  isReversed: boolean;
}

function getPreperedGoods({ sortField, isReversed }: FilterParams): string[] {
  let preperedGoods = [...goodsFromServer];

  const sortGoodsByAlphabet = (): void => {
    preperedGoods = preperedGoods.sort((good1, good2) =>
      good1.localeCompare(good2),
    );
  };

  const sortGoodsByLength = (): void => {
    preperedGoods = preperedGoods.sort(
      (good1, good2) => good1.length - good2.length,
    );
  };

  if (sortField) {
    switch (sortField) {
      case SortType.Alphabet:
        sortGoodsByAlphabet();
        break;

      case SortType.Length:
        sortGoodsByLength();
        break;

      default:
        return preperedGoods;
    }
  }

  if (isReversed) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreperedGoods({ sortField, isReversed });
  const isResetActive = sortField || isReversed;

  const resetSortHandler = (): void => {
    setsortField(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SortType.Alphabet)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SortType.Length)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {isResetActive && (
          <button
            onClick={resetSortHandler}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
