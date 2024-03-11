import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
import './App.scss';

enum SortType {
  default = '',
  alphabetically = 'name',
  length = 'length',
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

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.alphabetically:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.length:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  function handleClick() {
    setSortField(SortType.default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.alphabetically)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            onClick={handleClick}
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
