import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

enum SortType {
  Alphabetically = 'Sort alphabetically',
  Length = 'Sort by length',
  Reverse = 'Reverse',
  Reset = 'Reset',
}

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

const defaultState = {
  alphabetically: false,
  length: false,
  reverse: false,
};

export const App = (): JSX.Element => {
  const [sortedProducts, setSortedProducts] = useState(goodsFromServer);
  const [actionState, setActionState] = useState(defaultState);

  const sortByLetters = (): void => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setSortedProducts(actionState.reverse ? sorted.reverse() : sorted);
    setActionState(prevState => ({
      ...prevState,
      alphabetically: true,
      length: false,
    }));
  };

  const sortbyLength = (): void => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setSortedProducts(actionState.reverse ? sorted.reverse() : sorted);
    setActionState(prevState => ({
      ...prevState,
      alphabetically: false,
      length: true,
    }));
  };

  const handleReverseClick = (): void => {
    const reversedProducts = [...sortedProducts].reverse();

    setSortedProducts(reversedProducts);
    setActionState(prevState => ({
      ...prevState,
      reverse: !prevState.reverse,
    }));
  };

  const handleResetClick = (): void => {
    setSortedProducts(goodsFromServer);
    setActionState(defaultState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByLetters}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': !actionState.alphabetically,
          })}
        >
          {SortType.Alphabetically}
        </button>

        <button
          onClick={sortbyLength}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': !actionState.length,
          })}
        >
          {SortType.Length}
        </button>

        <button
          onClick={handleReverseClick}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !actionState.reverse,
          })}
        >
          {SortType.Reverse}
        </button>

        {
          // eslint-disable-next-line operator-linebreak
          (actionState.alphabetically ||
            // eslint-disable-next-line operator-linebreak
            actionState.length ||
            actionState.reverse) && (
            <button
              onClick={handleResetClick}
              type="button"
              className="button is-danger is-light"
            >
              {SortType.Reset}
            </button>
          )
        }
      </div>

      <ul>
        {sortedProducts.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
