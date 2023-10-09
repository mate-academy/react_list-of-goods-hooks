import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

type SortField = 'name' | 'length' | '';

interface PreparedGoodsOptions {
  sortField: SortField;
  reversed: boolean;
}

const goodsFromServer: string[] = [
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

function getPreparedArray(
  goods: string[],
  options: PreparedGoodsOptions,
): string[] {
  let preparedGoods = [...goods];

  if (options.sortField) {
    preparedGoods = preparedGoods.sort((good1, good2) => {
      switch (options.sortField) {
        case 'name':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (options.reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods
   = getPreparedArray(goodsFromServer, { sortField, reversed: isReversed });

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortField !== 'name' },
            )
          }
          onClick={() => setSortField('name')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-success',
              { 'is-light': sortField !== 'length' },
            )
          }
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => setIsReversed((current) => !current)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={classNames('button is-danger', { 'is-light': true })}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
