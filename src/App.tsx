import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Defoult,
  Name,
  Length,
}

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

const SORT_FIELD_NAME: SortType = SortType.Name;
const SORT_FIELD_LENGTH: SortType = SortType.Length;

function getPrepareGoods(goods: string[], sortField: SortType, reverse: boolean) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState(SortType.Defoult);
  const [reverse, setReverse] = React.useState(false);
  const renderGoods = getPrepareGoods(goodsFromServer, sortField, reverse);

  function getReset() {
    setReverse(false);
    setSortField(SortType.Defoult);
  }


  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === SortType.Name
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortField === SortType.Length
            ? 'button is-success'
            : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverse
            ? 'button is-warning'
            : 'button is-warning is-light'
          }
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse || sortField !== SortType.Defoult) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => getReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}

      </ul>
    </div>
  );
};
