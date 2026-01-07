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

function getPreparedGoods(sortField: SortType): string[] {
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

  return copiedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [reversed, setReversed] = useState<boolean>(false);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => {
            setGoods(getPreparedGoods(SortType.Alphabet));
            setSortField(SortType.Alphabet);
            setReversed(false);
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
            setGoods(getPreparedGoods(SortType.Length));
            setSortField(SortType.Length);
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setGoods([...goods].reverse());
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSortField(SortType.None);
              setReversed(false);
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
