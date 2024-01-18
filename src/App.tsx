import { useState } from 'react';
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

type PrepareGood = {
  sortField: SortBy;
  reverseField: boolean;
};

enum SortBy {
  SORT_FIELD_DEFAULT = '',
  SORT_FIELD_ALPHABETICALY = 'alpha',
  SORT_FIELD_LENGHT = 'lenght',
}

function getPrepearedGoods(
  goods: string[], { sortField, reverseField }: PrepareGood,
): string[] {
  let finalGoods = [...goods];

  finalGoods = finalGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortBy.SORT_FIELD_ALPHABETICALY:
        return good1.localeCompare(good2);

      case SortBy.SORT_FIELD_LENGHT:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverseField) {
    finalGoods.reverse();
  }

  return finalGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortBy>(SortBy.SORT_FIELD_DEFAULT);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  function reset() {
    setSortField(SortBy.SORT_FIELD_DEFAULT);
    setReverseField(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortBy.SORT_FIELD_ALPHABETICALY)}
          className={classNames('button is-info', {
            'is-light': sortField !== SortBy.SORT_FIELD_ALPHABETICALY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortBy.SORT_FIELD_LENGHT)}
          className={classNames('button is-success', {
            'is-light': sortField !== SortBy.SORT_FIELD_LENGHT,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseField(!reverseField)}
          className={classNames('button is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
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
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>

    </div>
  );
};
