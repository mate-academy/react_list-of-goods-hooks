import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

enum SortType {
  Alphabetically = 'alphabetically',
  ByLength = 'length',
  Default = 'null',
}

interface SortField {
  text: string;
  value: SortType;
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

const sortFieldsArray: SortField[] = [
  {
    text: 'Sort alphabetically',
    value: SortType.Alphabetically
  },
  {
    text: 'Sort by length',
    value: SortType.ByLength
  }
];

function getSortGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ByLength:
          return good1.length - good2.length;
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getSortGoods(goodsFromServer, sortField, isReversed);

  const handleReset = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {sortFieldsArray.map(({ text, value }) => (
          <button
            type="button"
            key={value}
            className={classNames('button', {
              'is-info': value === 'alphabetically',
              'is-success': value === 'length',
              'is-light': value !== sortField,
            })}
            onClick={() => setSortField(value)}
          >
            {text}
          </button>
        ))}
        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {(sortField !== SortType.Default || isReversed) && (
          <button
            type="button"
            className='button is-danger is-light'
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
