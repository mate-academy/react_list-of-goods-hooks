import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classnames from 'classnames';

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

enum Sort {
  Default = '',
  Length = 'length',
  Alphabet = 'name',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case Sort.Alphabet:
          return a.localeCompare(b);
        case Sort.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isResetButtonVisible = Boolean(isReversed || sortField);

  const setDefaultSort = (): void => {
    setSortField(Sort.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames('button', 'is-info', {
            'is-light': sortField !== Sort.Alphabet,
          })}
          onClick={() => setSortField(Sort.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success', {
            'is-light': sortField !== Sort.Length,
          })}
          onClick={() => setSortField(Sort.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            onClick={() => setDefaultSort()}
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
