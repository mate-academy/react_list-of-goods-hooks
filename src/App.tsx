import React, { useState } from 'react';
import './App.css';
import { Goodslist } from './components/Goodslist';

const goodsFromServer: string[] = [
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

const App: React.FC = () => {
  const [isAppStarted, setIsAppStarted] = useState(false);

  const handleAppStarted = () => {
    setIsAppStarted(true);
  };

  return (
    <div className="App">
      {(!isAppStarted
        ? (
          <div className="columns  card">
            <div className="
              column
              is-half
              is-offset-one-quarter
              content is-large"
            >
              <h1 className="
                contnet
                is-large
                has-text-centered"
              >
                List of goods
              </h1>
              <button
                className="
                  button
                  is-large
                  is-fullwidth
                  is-responsive
                  is-primary"
                type="button"
                onClick={() => handleAppStarted()}
              >
                Start
              </button>
            </div>

          </div>
        )
        : <Goodslist goods={goodsFromServer} />
      )}
    </div>
  );
};

export default App;
