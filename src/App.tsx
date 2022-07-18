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

  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const resetChanges = () => {
    setIsReversed(false);
    setSortBy(SortType.Default);
  };

  const reverseList = () => {
    setIsReversed(!isReversed);
  };

  if (isReversed) {
    goods.reverse();
  }

  switch (sortBy) {
    case SortType.Alphabetic:
      goods.sort((goodItem1, goodItem2) => goodItem1.localeCompare(goodItem2));
      break;

    case SortType.Length:
      goods.sort(
        (goodItem1, goodItem2) => (goodItem1.length - goodItem2.length),
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
            onClick={() => setIsVisible(true)}
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
              Alphabetically sort
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
