import ch from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer: string[] = [
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
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sortBy, setSortBy] = useState<SortField>(SortField.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const itemsToDisplay = isReversed
    ? [...visibleGoods].reverse()
    : visibleGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={ch('button', 'is-info', {
            'is-light': sortBy !== SortField.Alphabet,
          })}
          onClick={() => {
            const sortedAlphabet = [...goodsFromServer].sort((a, b) => {
              return a.localeCompare(b);
            });

            setVisibleGoods(sortedAlphabet);
            setSortBy(SortField.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={ch('button', 'is-success', {
            'is-light': sortBy !== SortField.Length,
          })}
          onClick={() => {
            const sortedLength = [...goodsFromServer].sort(
              (a, b) => a.length - b.length,
            );

            setVisibleGoods(sortedLength);
            setSortBy(SortField.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={ch('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SortField.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setVisibleGoods(goodsFromServer);
              setSortBy(SortField.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {itemsToDisplay.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
