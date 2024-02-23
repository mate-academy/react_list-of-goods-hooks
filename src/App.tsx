import React, { useState } from 'react';
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

enum SortType {
  Alphabetically = 'sortAlphabet',
  Lengthly = 'sortLength',
  None = '',
}

function action(
  initialValue: string[],
  howToSotr: SortType,
  reverse: boolean,
): string[] {
  const sortedGoods = [...initialValue];

  switch (howToSotr) {
    case SortType.Alphabetically:
      sortedGoods.sort((el1, el2) => el1.localeCompare(el2));
      break;
    case SortType.Lengthly:
      sortedGoods.sort((el1, el2) => el1.length - el2.length);
      break;
    default:
      break;
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const toRender = action(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={(): void => setSortField(SortType.Alphabetically)}
          type="button"
          className={`button is-info ${sortField !== SortType.Alphabetically && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={(): void => setSortField(SortType.Lengthly)}
          type="button"
          className={`button is-success ${sortField !== SortType.Lengthly && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={(): void => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || isReversed) && (
          <button
            onClick={(): void => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {toRender.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
