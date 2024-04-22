import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  Alphabetically,
  ByLength,
}

type GoodProps = {
  good: string;
};

const Good: React.FC<GoodProps> = ({ good }) => <li data-cy="Good">{good}</li>;

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: { sortField: SortType | null; reversed: boolean },
) {
  const preparedGoods = [...goods];

  if (sortField !== null) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);
        case SortType.ByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType | null>(null);
  const [reversed, setReversed] = useState<boolean>(false);
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);

  const handleSort = (field: SortType) => {
    setSortField(field);
    setVisibleGoods(
      getPreparedGoods(goodsFromServer, {
        sortField: field,
        reversed,
      }),
    );
  };

  const handleReverse = () => {
    setReversed(!reversed);
    setVisibleGoods(
      getPreparedGoods(goodsFromServer, { sortField, reversed: !reversed }),
    );
  };

  const handleReset = () => {
    setSortField(null);
    setReversed(false);
    setVisibleGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortField !== SortType.Alphabetically })}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${cn({ 'is-light': sortField !== SortType.ByLength })}`}
          onClick={() => handleSort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${cn({ 'is-light': !reversed })}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField !== null || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <Good good={good} key={good} />
        ))}
      </ul>
    </div>
  );
};
