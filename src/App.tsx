import { useEffect, useState } from 'react';
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

export const initialState = {
  sortedGoods: [...goodsFromServer],
  buttonSortAplha: { 'is-light': true, 'button is-info': true },
  buttonSortLength: {
    'is-light': true,
    'button is-info is-success': true,
  },
  buttonReverse: { button: true, 'is-warning': true, 'is-light': true },
  buttonRestart: false,
};

export enum SortType {
  ALPHA = 'alpha',
  LENGTH = 'length',
  REVERSE = 'reverse',
  DEFAULT = 'default',
  NONE = 'none',
}

export function updateState(
  state: typeof initialState,
  action: SortType,
): typeof initialState {
  switch (action) {
    case SortType.ALPHA:
      {
        const sorted = state.buttonReverse['is-light']
          ? [...state.sortedGoods].sort((a, b) => a.localeCompare(b))
          : [...state.sortedGoods].sort((a, b) => b.localeCompare(a));

        return {
          ...state,
          sortedGoods: [...sorted],
          buttonSortAplha: {
            ...state.buttonSortAplha,
            'is-light': false,
          },
          buttonSortLength: {
            ...state.buttonSortLength,
            'is-light': true,
          },
          buttonRestart: true,
        };
      }

      break;
    case SortType.LENGTH:
      {
        let sorted = [...state.sortedGoods].sort((a, b) => a.length - b.length);

        if (!state.buttonReverse['is-light']) {
          sorted = [...state.sortedGoods].sort((a, b) => b.length - a.length);
        }

        return {
          ...state,
          sortedGoods: [...sorted],
          buttonSortAplha: { ...state.buttonSortAplha, 'is-light': true },
          buttonSortLength: {
            ...state.buttonSortLength,
            'is-light': false,
          },
          buttonRestart: true,
        };
      }

      break;
    case SortType.REVERSE:
      {
        return {
          ...state,
          sortedGoods: [...state.sortedGoods.reverse()],
          buttonReverse: {
            button: true,
            'is-warning': true,
            'is-light': !state.buttonReverse['is-light'],
          },
          buttonRestart:
            !state.buttonSortAplha['is-light'] ||
            !state.buttonSortLength['is-light'] ||
            !state.buttonRestart,
        };
      }

      break;
    default:
      return {
        ...initialState,
        sortedGoods: [...goodsFromServer],
      };
      break;
  }
}

export const App: React.FC = () => {
  const [action, setAction] = useState(SortType.DEFAULT);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (SortType.NONE !== action) {
      setState(updateState(state, action));
    }
  }, [action]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(state.buttonSortAplha)}
          onClick={() => setAction(SortType.ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(state.buttonSortLength)}
          onClick={() => setAction(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(state.buttonReverse)}
          onClick={() => {
            setState(updateState(state, SortType.REVERSE));
            setAction(SortType.NONE);
          }}
        >
          Reverse
        </button>

        {state.buttonRestart && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setAction(SortType.DEFAULT)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {state.sortedGoods.map(good => {
            return (
              <li key={good} data-cy="Good">
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
