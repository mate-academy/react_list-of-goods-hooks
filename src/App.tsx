import 'bulma/css/bulma.css';
import './App.scss';
import { useMemo, useState } from 'react';

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
  Default = 'Default',
  Alphabet = 'Alphabet',
  Reverse = 'Reverse',
  ByLength = 'ByLength',
}

const sortList = (
  items: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] => {
  const newItems = [...items];

  switch (sortType) {
    case SortType.Alphabet:
      newItems.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.ByLength:
      newItems.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    newItems.reverse();
  }

  return newItems;
};

export const App = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const goods = useMemo(
    () => sortList(goodsFromServer, sortType, isReversed),
    [sortType, isReversed],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(sortType !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
