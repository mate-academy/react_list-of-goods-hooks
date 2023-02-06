import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { GoodsList } from './components/GoodsList';

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

enum SortType {
  Alphabet,
  Length,
  None,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.Alphabet:
        return g1.localeCompare(g2);

      case SortType.Length:
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.None);
  const visibleGoods = getReorderedGoods(goodsFromServer, sortType);

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            classNames({ 'is-light': sortType !== SortType.Alphabet })
          }`}
          onClick={() => setSortType(() => SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            classNames({ 'is-light': sortType !== SortType.Length })
          }`}
          onClick={() => setSortType(() => SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            classNames({ 'is-light': isReversed === false })
          }`}
          onClick={() => setReversed((reversed) => !reversed)}
        >
          Reverse
        </button>

        {isReversed !== false
        || sortType !== SortType.None
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(() => SortType.None);
                setReversed(() => false);
              }}
            >
              Reset
            </button>
          )
          : ''}

      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
