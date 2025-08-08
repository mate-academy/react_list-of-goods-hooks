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
  SORT_ALPHABETICALLY = 'alphabetically',
  SORT_LENGTH = 'length',
}

function getSortedList(
  list: string[],
  sortBy: SortType | '',
  isReverse: boolean,
) {
  const sortedList = [...list];

  sortedList.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.SORT_ALPHABETICALLY:
        return good1.localeCompare(good2);

      case SortType.SORT_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReverse) {
    sortedList.reverse();
  }

  return sortedList;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverse, setReverse] = useState(false);

  const preparedList = getSortedList(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.SORT_ALPHABETICALLY ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.SORT_LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${reverse !== true ? 'is-light' : ''} is-warning`}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedList.map(el => (
          <li data-cy="Good" key={el}>
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
