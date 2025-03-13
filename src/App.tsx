import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer: Good[] = [
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

type Good = string;

type SortingParams = {
  sortBy: SortBy;
  isReversed: boolean;
};

enum SortBy {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function prepareGoods(
  goods: Good[],
  { sortBy, isReversed }: SortingParams,
): Good[] {
  const preparedGoods: Good[] = [...goods];

  preparedGoods.sort((goodA: Good, goodB: Good) => {
    switch (sortBy) {
      case SortBy.Alphabet:
        return goodA.localeCompare(goodB);
      case SortBy.Length:
        return goodA.length - goodB.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortBy.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods: Good[] = prepareGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  function reset() {
    setIsReversed(false);
    setSortBy(SortBy.None);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortBy !== SortBy.Alphabet })}`}
          onClick={() => setSortBy(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortBy !== SortBy.Length })}`}
          onClick={() => setSortBy(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': isReversed === false })}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SortBy.None || isReversed) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
