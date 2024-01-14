import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

enum SortField {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

type StateType = {
  sortField: string,
  isReversed: boolean,
};

type Func = (
  goods: string[],
  { sortField, isReversed }: StateType
) => string[];

const getPreparedGoods: Func = (goods: string[], { sortField, isReversed }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1[sortField] - good2[sortField];

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

export const App = () => {
  const [sortField, setSortField] = useState(SortField.Default);
  const [reversed, setReversed] = useState(false);

  const displayedGoods
    = getPreparedGoods(goodsFromServer, { sortField, isReversed: reversed });

  const reset = () => {
    setSortField(SortField.Default);
    setReversed(false);
  };

  const reverse = () => {
    setReversed(!reversed);
  };

  const sortByName = () => {
    setSortField(SortField.Alphabet);
  };

  const sortByLength = () => {
    setSortField(SortField.Length);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SortField.Alphabet },
          )}
          onClick={sortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SortField.Length },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !reversed },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
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
        {displayedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
