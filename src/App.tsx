import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [alphaSorted, setAlphaSorted] = useState([...goodsFromServer]);
  const [buttonHighted, buttonHightedState] = useState({
    alphaHighlighted: false,
    lengthHighlighted: false,
    reverseHighlighted: false,
    resetHidden: true,
  });

  const highlight = (id: keyof typeof buttonHighted) => {
    switch (id) {
      case 'lengthHighlighted':
        buttonHightedState({ ...buttonHighted, alphaHighlighted: false });
        break;
      case 'alphaHighlighted':
        buttonHightedState({ ...buttonHighted, lengthHighlighted: false });
        break;
      default:
        break;
    }

    buttonHightedState(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
    buttonHightedState({ ...buttonHighted, resetHidden: false });
  };

  const sortByAlphabet = () => {
    highlight('alphaHighlighted');
    setAlphaSorted(current => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    highlight('lengthHighlighted');
    setAlphaSorted(current => [...current].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setAlphaSorted([...goodsFromServer]);
    buttonHightedState({ ...buttonHighted, resetHidden: true });
  };

  const reverse = () => {
    highlight('reverseHighlighted');
    setAlphaSorted(current => [...current].reverse());
  };

  return (
    <div className='section content'>
      <div className='buttons'>
        <button
          id='alphaButton'
          type='button'
          className={`button is-info ${!buttonHighted.alphaHighlighted ? 'is-light' : ''}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          id='numberButton'
          type='button'
          className={`button is-info ${!buttonHighted.lengthHighlighted ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          id='reverseButton'
          type='button'
          className={`button is-info ${!buttonHighted.reverseHighlighted ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        <button
          id='resetButton'
          type='button'
          style={{
            display: buttonHighted.resetHidden ? 'none' : 'block',
          }}
          className='button is-danger is-light'
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {alphaSorted.map(good => (
            <li key={good} data-cy='Good'>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
