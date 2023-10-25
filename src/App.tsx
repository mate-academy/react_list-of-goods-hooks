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
  alphabet = 'alphabet',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortBy: string,
  reverseStatus: boolean,
):string[] {
  const preperedGoods = [...goods];

  if (sortBy) {
    preperedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.alphabet:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseStatus) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [reverseStatus, setReverseStatus] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, reverseStatus);

  const reset = () => {
    setSortBy('');
    setReverseStatus(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SortType.alphabet)}
          className={classNames('button is-info', {
            'is-light': sortBy !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SortType.length)}
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseStatus(!reverseStatus)}
          className={classNames('button is-warning', {
            'is-light': !reverseStatus,
          })}
        >
          Reverse
        </button>

        {(sortBy !== '' || reverseStatus) && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
