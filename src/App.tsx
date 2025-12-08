import React, { useReducer } from 'react';
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

export enum SortType {
  None,
  Alphabet,
  Length,
  Reverse,
}

export enum ActionType {
  SortAlphabet,
  SortLength,
  Reverse,
  Reset,
}

type State = {
  goods: string[];
  activeSort: SortType;
};

type Action = {
  type: ActionType;
};

const NOT_ACTIVE_CLASS = 'is-light';

const initialState: State = {
  goods: [...goodsFromServer],
  activeSort: SortType.None,
};

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

const handleGoodsState = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SortAlphabet:
      return {
        goods: [...goodsFromServer].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())),
        activeSort: SortType.Alphabet,
      };

    case ActionType.SortLength:
      return {
        goods: [...goodsFromServer].sort((a, b) => {
          const lenDiff = b.length - a.length;
          if (lenDiff !== 0) return lenDiff;
          return a.toLowerCase().localeCompare(b.toLowerCase());
        }),
        activeSort: SortType.Length,
      };

    case ActionType.Reverse:
      let nextSort = state.activeSort;

      if (state.activeSort === SortType.None) {
        nextSort = SortType.Reverse;
      } else if (state.activeSort === SortType.Reverse) {
        nextSort = SortType.None;
      }

      return {
        goods: [...state.goods].reverse(),
        activeSort: nextSort,
      };

    case ActionType.Reset:
      return initialState;

    default:
      return state;
  }
};


export const App: React.FC = () => {
  const [state, dispatch] = useReducer(handleGoodsState, initialState);

  const getButtonClass = (buttonType: SortType) => {
    if (buttonType === SortType.Reverse) {
        const isReversedFromInitial = arraysEqual(state.goods, [...goodsFromServer].reverse());

        if (state.activeSort === SortType.Reverse || isReversedFromInitial) {
            return 'button is-warning';
        }
    }

    return state.activeSort === buttonType ? 'button is-warning' : `button ${NOT_ACTIVE_CLASS}`;
  };

  const isResetVisible = state.activeSort !== SortType.None;

  return (
    <div className="section content">
      <h1 className="title">Goods List</h1>

      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.Alphabet)}
          onClick={() => dispatch({ type: ActionType.SortAlphabet })}
          data-cy="SortAlphabet"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Length)}
          onClick={() => dispatch({ type: ActionType.SortLength })}
          data-cy="SortLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.Reverse)}
          onClick={() => dispatch({ type: ActionType.Reverse })}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => dispatch({ type: ActionType.Reset })}
            data-cy="Reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {state.goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
