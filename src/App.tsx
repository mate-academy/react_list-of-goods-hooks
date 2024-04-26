import { useState, FC } from 'react';
import cn from 'classnames';
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

enum SortField {
  SORT_ALPHABET = 'alphabet',
  SORT_LENGTH = 'length',
  DEFAULT = '',
}

export const App: FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.DEFAULT);
  const [reversed, setReversed] = useState(false);

  let visibleGoods: string[] = [...goodsFromServer].sort(
    (good1: string, good2: string): number => {
      switch (sortField) {
        case SortField.SORT_ALPHABET:
          return good1.localeCompare(good2);

        case SortField.SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    },
  );

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setSortField(SortField.DEFAULT);
    setReversed(false);
  };

  const reverse = () => (reversed ? setReversed(false) : setReversed(true));

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortField !== SortField.SORT_ALPHABET,
          })}
          onClick={() => setSortField(SortField.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortField !== SortField.SORT_LENGTH,
          })}
          onClick={() => setSortField(SortField.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': !reversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(!!sortField.length || reversed) && (
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
