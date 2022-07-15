import React, { useState } from 'react';
import './App.css';

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

enum SortType {
  Alphabetic = 'alphabetic',
  Length = 'length',
  Default = 'default',
}

export const App: React.FC = () => {
  const goods: string[] = [...goodsFromServer];

  const [isVisible, setVisible] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const resetChanges = () => {
    setReversed(false);
    setSortBy(SortType.Default);
  };

  const reverseList = () => {
    setReversed(!isReversed);
  };

  if (isReversed) {
    goods.reverse();
  }

  switch (sortBy) {
    case SortType.Alphabetic:
      goods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.Length:
      goods.sort(
        (good1, good2) => (good1.length - good2.length),
      );
      break;

    default:
      break;
  }

  return (
    <div className="App">
      <div className="App__container">
        {!isVisible && (
          <button
            className="
              button
              is-success
              is-medium
            "
            type="button"
            onClick={() => setVisible(true)}
          >
            Start
          </button>
        )}

        {isVisible && (
          <div>
            <ul className="Goods">
              {goods.map(good => (
                <li className="Goods__item media" key={good}>
                  {good}
                </li>
              ))}
            </ul>

            <button
              className="
                button
                button-list
                is-link
              "
              type="button"
              onClick={() => setSortBy(SortType.Alphabetic)}
            >
              Sort alphabetically
            </button>

            <button
              className="
                button
                button-list
                is-info
              "
              type="button"
              onClick={() => setSortBy(SortType.Length)}
            >
              Sort by length
            </button>

            <button
              className="
                button
                button-list
                is-warning
              "
              type="button"
              onClick={reverseList}
            >
              Reverse
            </button>

            <button
              className="
                button
                button-list
                is-danger
              "
              type="button"
              onClick={resetChanges}
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
