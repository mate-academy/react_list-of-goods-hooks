import React, { useState } from 'react';
import './App.scss';
import classNames from 'classnames';

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

enum SortBy {
  Name = 'name',
  Length = 'length',
}

const App: React.FC = () => {
  const [isGoodsListVisible, setIsGoodsListVisible] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortBy | null>(null);

  let visibleGoods: string[] = [...goodsFromServer];

  switch (sortBy) {
    case SortBy.Name:
      visibleGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
      );
      break;

    case SortBy.Length:
      visibleGoods.sort(
        (good1, good2) => good1.length - good2.length,
      );
      break;

    default:
      visibleGoods = [...goodsFromServer];
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App level">
      <button
        type="button"
        className={classNames(
          'button is-light is-outlined', 'level-item', {
            'App__hidden-button': isGoodsListVisible,
          },
        )}
        onClick={() => setIsGoodsListVisible(true)}
      >
        Start
      </button>
      {isGoodsListVisible && (
        <div className="level-item">
          <ul>
            {visibleGoods.map(good => (
              <li
                key={good}
                className="subtitle is-4 level-item"
              >
                {good}
              </li>
            ))}
          </ul>
          <div className="buttons">
            <button
              type="button"
              className="button is-link is-rounded"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-success is-rounded"
              onClick={() => setSortBy(SortBy.Name)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-info is-rounded"
              onClick={() => setSortBy(SortBy.Length)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-danger is-rounded"
              onClick={() => setSortBy(null)}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
