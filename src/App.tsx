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

enum SortType {
  NAME = 'alphabetically',
  LEN = 'length',
}

function getPreparedGoods(goods:string[],
  sortField: string, isReversed: boolean):string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.NAME:
          return good1.localeCompare(good2);
        case SortType.LEN:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

function isLight(sortField:string, SORT_FIELD:string):string {
  if (sortField === SORT_FIELD) {
    return '';
  }

  return 'is-light';
}

export const App:React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);
  const [isReset, setReset] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.NAME);
            setReset(true);
          }}
          type="button"
          className={`button is-info ${isLight(sortField, SortType.NAME)}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.LEN);
            setReset(true);
          }}
          type="button"
          className={`button is-info ${isLight(sortField, SortType.LEN)}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReversed(!isReversed);
            setSortField(sortField);
            setReset(!isReversed || sortField !== '');
          }}
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {
          isReset ? (
            <button
              onClick={() => {
                setSortField('');
                setReset(false);
                setReversed(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          ) : ''
        }

      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
