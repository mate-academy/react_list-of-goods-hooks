import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

enum SortField {
  LENGTH,
  NAME,
  NON,
}

function sortGoods(goods: string[], query: SortField) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (query) {
      case SortField.LENGTH:
        return good1.length - good2.length;

      case SortField.NAME:
        return good1.localeCompare(good2);
      case SortField.NON:
      default:
        return 0;
    }
  });

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.NON);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortField);

  if (isReversed) {
    visibleGoods.reverse();
  }

  const resetButton = sortField !== SortField.NON || isReversed;

  function handleResetClick() {
    setSortField(SortField.NON);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortField.NAME })}
          onClick={() => setSortField(SortField.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SortField.LENGTH })}
          onClick={() => setSortField(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {resetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleResetClick()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
