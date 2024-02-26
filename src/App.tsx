import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

enum SortTypes {
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortTypes | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortButtons = (sortedType: SortTypes) => {
    setSortType(sortedType);

    setGoods(g => {
      const visibleGoods = [...g];

      visibleGoods.sort((good1, good2) => {
        switch (sortedType) {
          case SortTypes.Alphabet:
            return good1.localeCompare(good2);

          case SortTypes.Length:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });

      return visibleGoods;
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortType !== SortTypes.Alphabet,
          })}
          onClick={() => handleSortButtons(SortTypes.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortType !== SortTypes.Length,
          })}
          onClick={() => handleSortButtons(SortTypes.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
            setGoods(goods.reverse());
          }}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSortType(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};

export default App;
