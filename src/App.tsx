import { useState } from 'react';
import cn from 'classnames';
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

function getPrepareGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
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

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Defoult);
  const [isReversed, setIsReversed] = useState(false);
  const renderGoods = getPrepareGoods(goodsFromServer, sortField, isReversed);

  function getReset() {
    setIsReversed(false);
    setSortField(SortType.Defoult);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light':
              sortField !== SortType.Name,
          })}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light':
              sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortField !== SortType.Defoult) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={getReset}
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
