import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { GoodList } from './Components/GoodList/GoodList';
import { SortType } from './Types/SortType';

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

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: { sortField: SortType; isReversed: boolean },
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.SORT_FIELD_NAME:
        return good1.localeCompare(good2);
      case SortType.SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const prevIsReversed = !isReversed;
  const visibleGoods: string[] = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          id="name"
          className={classNames('button is-info', {
            'is-light': !(sortField === SortType.SORT_FIELD_NAME),
          })}
          onClick={() => setSortField(SortType.SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          id="length"
          className={classNames('button is-success', {
            'is-light': !(sortField === SortType.SORT_FIELD_LENGTH),
          })}
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          id="reverse"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevIsReversed)}
        >
          Reverse
        </button>

        {(sortField !== SortType.default || isReversed) && (
          <button
            type="button"
            id="reset"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
