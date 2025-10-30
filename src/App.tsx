import 'bulma/css/bulma.css';
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

enum Field {
  Length = 'length',
  Alphabet = 'alphabet',
  None = 'none',
}

function getPreparedGoods(goods: string[], sortField: Field) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case Field.Length:
          return good1.length - good2.length;

        case Field.Alphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<Field>(Field.None);
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sort = (field: Field) => {
    setSortField(field);
    const visibleGoods = getPreparedGoods(goodsFromServer, field);

    setGoods(isReversed ? [...visibleGoods].reverse() : visibleGoods);
  };

  const reverse = () => {
    const newReversed = !isReversed;

    setIsReversed(newReversed);

    let prepared = sortField
      ? getPreparedGoods(goodsFromServer, sortField)
      : [...goodsFromServer];

    if (newReversed) {
      prepared = [...prepared].reverse();
    }

    setGoods(prepared);
  };

  const reset = () => {
    setSortField(Field.None);
    setGoods(goodsFromServer);
    setIsReversed(false);
  };

  const isOriginalOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === Field.Alphabet ? '' : 'is-light'}`}
          onClick={() => sort(Field.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === Field.Length ? '' : 'is-light'}`}
          onClick={() => sort(Field.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
