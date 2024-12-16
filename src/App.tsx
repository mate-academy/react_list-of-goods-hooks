import { useState } from 'react';
import cn from 'classnames';
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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPrepareGoods(
  goods: string[],
  { sortType, reverse }: { sortType: string; reverse: boolean },
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortType === SORT_FIELD_ALPHABET) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SORT_FIELD_LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortType,
    reverse,
  });

  const handleSort = (type: string) => {
    setSortType(type);
  };

  const reset = () => {
    setSortType('');
    setReverse(false);
  };

  const isSorted = sortType !== '' || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortType !== SORT_FIELD_ALPHABET })}`}
          onClick={() => handleSort(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': sortType !== SORT_FIELD_LENGTH })}`}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${cn({ 'is-light': !reverse })}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
