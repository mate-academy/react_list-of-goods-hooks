import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const sortByLength = 'length';
const sortByABC = 'abc';

type SortField = '' | typeof sortByLength | typeof sortByABC;

const getSortGoods = (
  goods: string[],
  sortField: SortField,
  isReversed: boolean,
): string[] => {
  const preparedList = [...goods];

  if (sortField) {
    preparedList.sort((a, b) => {
      switch (sortField) {
        case sortByLength:
          return a.length - b.length;
        case sortByABC:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedList.reverse();
  }

  return preparedList;
};

const resetClick = (
  setSortField: React.Dispatch<React.SetStateAction<SortField>>,
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  setSortField('');
  setIsReversed(false);
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const finalGoods = getSortGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== sortByABC,
          })}
          onClick={() => setSortField(sortByABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== sortByLength,
          })}
          onClick={() => setSortField(sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => resetClick(setSortField, setIsReversed)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {finalGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
