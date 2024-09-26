import React, { useState } from 'react';
import cn from 'classnames';
import StateSetter from './types/StateSetter';
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

const sortingActions = {
  alphabetically: 'Alphabetically',
  length: 'Length',
};

function sortGoods(goods: string[], action: string, isReversed: boolean) {
  const renderedGoods = [...goods];

  renderedGoods.sort((good1, good2) => {
    switch (action) {
      case sortingActions.alphabetically:
        return good1.trim().localeCompare(good2.trim());
      case sortingActions.length:
        return good1.trim().length - good2.trim().length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    renderedGoods.reverse();
  }

  return renderedGoods;
}

function resetState<T extends unknown[]>(
  ...args: { [K in keyof T]: { setter: StateSetter<T[K]>; initialValue: T[K] } }
): void {
  args.forEach(({ setter, initialValue }) => setter(initialValue));
}

export const App: React.FC = () => {
  const [sortingAction, setSortingAction] = useState<string>('');
  const [reversed, setReversed] = useState<boolean>(false);

  const { alphabetically, length } = sortingActions;

  const handledGoods = sortGoods(goodsFromServer, sortingAction, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortingAction !== alphabetically,
          })}
          onClick={() => setSortingAction(alphabetically)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortingAction !== length,
          })}
          onClick={() => setSortingAction(length)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortingAction || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() =>
              resetState(
                { setter: setReversed, initialValue: false },
                { setter: setSortingAction, initialValue: '' },
              )
            }
          >
            Reset
          </button>
        )}{' '}
      </div>

      <ul>
        {handledGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
