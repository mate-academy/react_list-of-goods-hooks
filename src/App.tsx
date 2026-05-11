import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum Fields {
  alphabet = 'alphabet',
  length = 'length',
}

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

const SORT_FIELD_ALPHABET: Fields = Fields.alphabet;
const SORT_FIELD_LENGTH: Fields = Fields.length;

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const getPreparedGoods = () => {
    const preparedGoods = [...goodsFromServer];

    if (sortField === SORT_FIELD_ALPHABET) {
      preparedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortField === SORT_FIELD_LENGTH) {
      preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  };

  const goods = getPreparedGoods();

  // Определение видимости кнопки Reset
  const isResetVisible = sortField !== '' || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(prevState => !prevState)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
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
