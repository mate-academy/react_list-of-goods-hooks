import { useState } from 'react';
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

enum SortType {
  abc = 'alphabetically',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
) {
  const praparedGoods = [...goods];

  if (sortField) {
    praparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.length:
          return good1.length - good2.length;

        case SortType.abc:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    praparedGoods.reverse();
  }

  return praparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const handleResetClick = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.abc)}
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SortType.abc },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SortType.length },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReverse(!isReversed);
          }}
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            onClick={handleResetClick}
            className={cn('button is-danger', { 'is-light': sortField })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
