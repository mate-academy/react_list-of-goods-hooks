import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
  ALPHABETICALLY = 'alp',
  BY_LENGTH = 'lng',
}

interface SortingParams {
  sortCondition: SortType | '',
  reverseGoods: boolean,
}

function sortGoods(
  goods: string[],
  {
    sortCondition,
    reverseGoods,
  } : SortingParams,
): string[] {
  const sortedGoods = [...goods];

  if (sortCondition) {
    sortedGoods.sort((good1, good2) => {
      switch (sortCondition) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortCondition, setSortCondition] = useState<SortType | ''>('');
  const [reverseGoods, setReverseGoods] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, {
    sortCondition,
    reverseGoods,
  });

  const isResetButtonIsVisible = sortCondition || reverseGoods;

  function handleReverse() {
    setReverseGoods(prev => !prev);
  }

  function handleReset() {
    setSortCondition('');
    setReverseGoods(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortCondition(SortType.ALPHABETICALLY)}
          className={classNames('button is-warning', {
            'is-light': sortCondition !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortCondition(SortType.BY_LENGTH)}
          className={classNames('button is-success', {
            'is-light': sortCondition !== SortType.BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={classNames('button is-warning', {
            'is-light': !reverseGoods,
          })}
        >
          Reverse
        </button>

        {isResetButtonIsVisible && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
