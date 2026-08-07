import 'bulma/css/bulma.css';
import classNames from 'classnames';
import './App.scss';
import { useState } from 'react';

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
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

function getSortedGoods(goods: string[], sortMarker: SortType, reverseMarker: boolean) : string[] {
  const preparedGoods = [...goods];

  if (sortMarker !== SortType.None) {
    switch (sortMarker) {
      case SortType.Alphabet:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortType.Length:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  if (reverseMarker) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortMarker, setSortMarker] = useState(SortType.None);
  const [reverseMarker, setReverseMarker] = useState(false);
  const shownGoods = getSortedGoods(goodsFromServer, sortMarker, reverseMarker);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortMarker !== SortType.Alphabet,
          })}
          onClick={() => setSortMarker(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortMarker !== SortType.Length,
          })}
          onClick={() => setSortMarker(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reverseMarker === false,
          })}
          onClick={() => {
            setReverseMarker(!reverseMarker);
          }}
        >
          Reverse
        </button>

        {(sortMarker !== SortType.None || reverseMarker) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMarker(SortType.None);
              setReverseMarker(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {shownGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
