import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [activeButton, setActiveButton] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState<boolean>(false);

  const handleSortAlphabetically = () => {
    setGoods([...goods].sort());
  };

  const handleSortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const handleReverseList = () => {
    setGoods([...goods].reverse());
  };

  const handleResetList = () => {
    setGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => {
            handleSortAlphabetically();
            setActiveButton(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${activeButton === SortType.Length ? '' : 'is-light'}`}
          onClick={() => {
            handleSortByLength();
            setActiveButton(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${reverse ? '' : 'is-light'}`}
          onClick={() => {
            handleReverseList();
            if (reverse) {
              setReverse(false);
            } else {
              setReverse(true);
            }
          }}
        >
          Reverse
        </button>

        {reverse || activeButton !== SortType.None ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              handleResetList();
              setActiveButton(SortType.None);
              setReverse(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
