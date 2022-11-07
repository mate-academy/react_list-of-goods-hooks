import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Button } from './components/Button';

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
  NONE,
  ALPHABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((firstGood, secondGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return firstGood.localeCompare(secondGood);

      case SortType.LENGTH:
        return firstGood.length - secondGood.length;

      default:
        return 0;
    }
  });

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const handleReverse = () => {
    setIsReversed(currentIsReversed => !currentIsReversed);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          classNames="is-info"
          onClick={() => setSortType(SortType.ALPHABET)}
          shouldHighlight={sortType !== SortType.ALPHABET}
        >
          Sort alphabetically
        </Button>

        <Button
          classNames="is-success"
          onClick={() => setSortType(SortType.LENGTH)}
          shouldHighlight={sortType !== SortType.LENGTH}
        >
          Sort by length
        </Button>

        <Button
          classNames="is-warning"
          onClick={handleReverse}
          shouldHighlight={!isReversed}
        >
          Reverse
        </Button>

        {(sortType !== SortType.NONE || isReversed) && (
          <Button
            classNames="is-danger"
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={`${good}-${goodsFromServer.indexOf(good)}`}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
