import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { FC, useState } from 'react';

type Good = string;
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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

const getPreparedGoods = (
  sortField: SortType | '',
  isReversed: boolean,
): Good[] => {
  const preparedGoods = [...goodsFromServer];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.Length:
          return a.length - b.length;
        case SortType.Alphabet:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== SortType.Alphabet },
            'button is-info',
          )}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortField !== SortType.Length },
            'button is-info',
          )}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({ 'is-light': isReversed === false }, 'button is-info')}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
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
