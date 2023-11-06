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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

type Goods = string[];

type Props = {
  sortField: string;
  isSorted: boolean;
};

function getPreparedGoods(
  goods: Goods,
  { sortField, isSorted }: Props,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isSorted) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isSorted });

  const resetFunc = () => {
    setSortField('');
    setIsSorted(false);
  };

  const toggleSort = () => {
    setIsSorted(!isSorted);
  };

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET })}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isSorted })}
          onClick={toggleSort}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', 'is-light',
            { 'is-hidden': !sortField })}
          onClick={resetFunc}
        >
          Reset
        </button>
      </div>

      {visibleGoods.map(good => (
        <ul key={good}>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};
