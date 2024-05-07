import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { useState, FC } from 'react';

enum SortField {
  SORT_ALPHABET = 'alphabet',
  SORT_LENGTH = 'length',
  DEFAULT = '',
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

export const App: FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortField.SORT_ALPHABET:
        return good1.localeCompare(good2);
      case SortField.SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  function reset() {
    setSortField(SortField.DEFAULT);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortField.SORT_ALPHABET,
          })}
          onClick={() => setSortField(SortField.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortField.SORT_LENGTH,
          })}
          onClick={() => setSortField(SortField.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
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
