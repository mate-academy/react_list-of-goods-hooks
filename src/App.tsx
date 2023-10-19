import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

type SortField = 'alph' | 'length' | '';

const SORT_FIELD_ALPH = 'alph';
const SORT_FIELD_LENTGTH = 'length';

function getPreparedGoods(
  goods: string[],
  sortField: SortField,
  reverse: boolean,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPH:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SORT_FIELD_LENTGTH:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        preparedGoods = [...preparedGoods];
    }
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [reverseField, setReverseField] = useState(false);
  const sortedGods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );
  const resetReverse = () => {
    if (reverseField || sortField !== '') {
      return true;
    }

    return false;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPH },
          )}
          onClick={() => setSortField(SORT_FIELD_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_LENTGTH },
          )}
          onClick={() => setSortField(SORT_FIELD_LENTGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': !reverseField },
          )}
          onClick={() => {
            setReverseField(current => !current);
          }}
        >
          Reverse
        </button>

        {resetReverse()
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setReverseField(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGods.map(good => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
