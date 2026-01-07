import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  None = 'None',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(sortField: SortType, isReversed: boolean): string[] {
  const copiedGoods = [...goodsFromServer];

  if (sortField !== SortType.None) {
    copiedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => {
            setGoods(getPreparedGoods(SortType.Alphabet, isReversed));
            setSortField(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => {
            setGoods(getPreparedGoods(SortType.Length, isReversed));
            setSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
            setGoods(getPreparedGoods(sortField, !isReversed));
          }}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSortField(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
