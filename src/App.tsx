import React, { RefObject, useState } from 'react';
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
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [reversed, setReversed] = useState(false);
  const buttonInfo = React.createRef() as RefObject<HTMLButtonElement>;
  const buttonSuccess = React.createRef() as RefObject<HTMLButtonElement>;
  const buttonWarning = React.createRef() as RefObject<HTMLButtonElement>;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          ref={buttonInfo}
          className="button is-info is-light"
          onClick={(event) => {
            setVisibleGoods(() => {
              const alphabeticalGoods = [...visibleGoods];

              return alphabeticalGoods.sort((a, b) => a.localeCompare(b));
            });
            event.currentTarget.classList.remove('is-light');
            buttonSuccess.current?.classList.add('is-light');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          ref={buttonSuccess}
          id="sor-length-button"
          className="button is-success is-light"
          onClick={(event) => {
            setVisibleGoods(() => {
              const lengthGoods = [...visibleGoods];

              return lengthGoods.sort((a, b) => a.length - b.length);
            });
            event.currentTarget.classList.remove('is-light');
            buttonInfo.current?.classList.add('is-light');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          ref={buttonWarning}
          className="button is-warning is-light"
          onClick={(event) => {
            setReversed(!reversed);
            event.currentTarget.classList.toggle('is-light');
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setReversed(false);
            buttonSuccess.current?.classList.add('is-light');
            buttonInfo.current?.classList.add('is-light');
            buttonWarning.current?.classList.add('is-light');
            setVisibleGoods([...goodsFromServer]);
          }}
        >
          Reset
        </button>
      </div>

      {reversed
        ? (
          <ul>
            {[...visibleGoods].reverse().map((good) => (
              <li key={good}>{good}</li>
            ))}
          </ul>
        )
        : (
          <ul>
            {[...visibleGoods].map((good) => (
              <li key={good}>{good}</li>
            ))}
          </ul>
        )}
    </div>
  );
};
