import classNames from 'classnames';
import React, { useState } from 'react';
import './App.scss';

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
  const [isClicked, setStart] = useState(false);
  const [sortBy, setSortby] = useState('');
  const [reverse, setReverse] = useState(false);
  const [selectLength, setSelectLength] = useState(1);

  const reset = () => {
    setSortby('');
    setReverse(false);
    setSelectLength(1);
  };

  const filteredGoods = goodsFromServer
    .filter(value => value.length >= selectLength);

  filteredGoods.sort((item1, item2) => {
    switch (sortBy) {
      case 'ASC':
        return item1.localeCompare(item2);

      case 'NameLength':
        return item1.replaceAll(' ', '').length
          - item2.replaceAll(' ', '').length;

      default:
        return 0;
    }
  });

  if (reverse) {
    filteredGoods.reverse();
  }

  return (
    <div className="App">
      <h1>
        Goods
      </h1>

      <button
        type="button"
        className={classNames(
          'button__start',
          { hidden: isClicked },
        )}
        onClick={() => setStart(true)}
      >
        Start
      </button>
      {isClicked
        ? (
          <>
            <div className="list">
              <ul>
                {filteredGoods.map(good => (
                  <li key={good}>
                    {good}
                  </li>
                ))}
              </ul>
            </div>

            <div className="button">
              <button
                type="button"
                className="button__option"
                onClick={() => setSortby('ASC')}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className="button__option"
                onClick={() => setSortby('NameLength')}
              >
                Sort by name length
              </button>

              <button
                type="button"
                className="button__option"
                onClick={() => setReverse(!reverse)}
              >
                Reverse
              </button>

              <form>
                <label
                  className="button__form"
                  htmlFor="selectLength"
                >
                  Filter by name length:
                  {' '}
                  <input
                    type="number"
                    min={1}
                    max={goodsFromServer.length}
                    name="selectLength"
                    id="selectLength"
                    value={selectLength}
                    onChange={(event) => {
                      setSelectLength(+event.target.value);
                    }}
                  />
                </label>
              </form>

              <button
                className="button__option button__option__reset"
                type="button"
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </>
        )
        : null}
    </div>
  );
};

export default App;
