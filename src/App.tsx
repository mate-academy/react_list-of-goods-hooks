import { useState, useEffect } from 'react';
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
enum SortType {
  CONST_STATE_BY_LENGTH = 'byLength',
  CONST_STATE_BY_ALPHABET = 'byAlphabet',
}

function prepareTodos(
  data: string[],
  sortBy: SortType | null,
  isReversed:boolean,
) {
  let todos : string[] = [...data];

  if (sortBy === SortType.CONST_STATE_BY_LENGTH) {
    todos.sort((a, b) => a.length - b.length);
  } else if (sortBy === SortType.CONST_STATE_BY_ALPHABET) {
    todos.sort((a, b) => a.localeCompare(b));
  }

  if (isReversed) {
    todos = todos.reverse();
  }

  return todos;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [sortStateReverse, setSortStateReverse] = useState(false);
  const [todos, setTodos] = useState(goodsFromServer);

  useEffect(() => {
    const preparedTodos = prepareTodos(
      goodsFromServer,
      sortBy,
      sortStateReverse,
    );

    setTodos(preparedTodos);
  }, [sortBy, sortStateReverse]);

  function toggleReverse() {
    setSortStateReverse(!sortStateReverse);
  }

  function reset() {
    setSortBy(null);
    setSortStateReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.CONST_STATE_BY_ALPHABET,
          })}
          onClick={() => setSortBy(SortType.CONST_STATE_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.CONST_STATE_BY_LENGTH,
          })}
          onClick={() => setSortBy(SortType.CONST_STATE_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortStateReverse,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortBy || sortStateReverse) && (
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
        {todos.map((todo, index) => {
          const key = index;

          return (
            <li key={key} data-cy="Good">
              {todo}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
