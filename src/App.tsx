import React, { useReducer } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

// --- Початкові дані ---
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

// --- Типи для Reducer ---
type SortType = 'alphabet' | 'length' | 'reverse' | null;

interface State {
  goods: string[];
  activeSort: SortType;
}

type Action =
  | { type: 'SORT_ALPHABET' }
  | { type: 'SORT_LENGTH' }
  | { type: 'REVERSE' }
  | { type: 'RESET' };

// --- Початковий стан ---
const initialState: State = {
  goods: [...goodsFromServer],
  activeSort: null,
};

// --- Reducer ---
const goodsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SORT_ALPHABET':
      return {
        goods: [...goodsFromServer].sort(),
        activeSort: 'alphabet',
      };

    case 'SORT_LENGTH':
      return {
        // Сортування від найдовшого до найкоротшого
        goods: [...goodsFromServer].sort((a, b) => b.length - a.length),
        activeSort: 'length',
      };

    case 'REVERSE':
      return {
        // Реверсуємо поточний стан (для збереження порядку після попереднього сортування)
        goods: [...state.goods].reverse(),
        activeSort: 'reverse',
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

// --- Компонент App ---
export const App: React.FC = () => {
  const [state, dispatch] = useReducer(goodsReducer, initialState);

  const isResetVisible = state.activeSort !== null;

  const getButtonClass = (buttonType: SortType) => {
    // Якщо поточний тип сортування збігається з типом кнопки, робимо її активною ('is-warning')
    if (state.activeSort === buttonType) return 'button is-warning';

    // Якщо активна кнопка 'reverse', вона не може бути 'is-warning' сама по собі,
    // але не повинна мати клас 'is-light'
    if (state.activeSort === 'reverse') return 'button';

    return 'button is-light';
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass('alphabet')}
          onClick={() => dispatch({ type: 'SORT_ALPHABET' })}
          data-cy="SortAlphabet"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass('length')}
          onClick={() => dispatch({ type: 'SORT_LENGTH' })}
          data-cy="SortLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass('reverse')}
          onClick={() => dispatch({ type: 'REVERSE' })}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => dispatch({ type: 'RESET' })}
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
