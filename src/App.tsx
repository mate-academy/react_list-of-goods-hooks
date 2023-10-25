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
  STATE_BY_LENGTH = 'byLength',
  STATE_BY_ALPHABET = 'byAlphabet',
}

function prepareTodos(
  data: string[],
  sortBy: SortType | null,
  isReversed:boolean,
) {
  let todos : string[] = [...data];

  switch (sortBy) {
    case SortType.STATE_BY_LENGTH:
      todos.sort((a, b) => a.length - b.length);
      break;
    case SortType.STATE_BY_ALPHABET:
      todos.sort((a, b) => a.localeCompare(b));
      break;
    default:
      break;
  }

  if (isReversed) {
    todos = todos.reverse();
  }

  return todos;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [sortStateReverse, isReversed] = useState(false);
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
    isReversed(!sortStateReverse);
  }

  function reset() {
    setSortBy(null);
    isReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.STATE_BY_ALPHABET,
          })}
          onClick={() => setSortBy(SortType.STATE_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.STATE_BY_LENGTH,
          })}
          onClick={() => setSortBy(SortType.STATE_BY_LENGTH)}
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
        {todos.map((todo, index) => (
          <li key={Number(index)} data-cy="Good">
            {todo}
          </li>
        ))}
      </ul>
    </div>
  );
};
