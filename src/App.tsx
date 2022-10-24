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

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.localeCompare(secondGood)
    ));
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.length - secondGood.length
    ));
  }

  if (isReversed === true) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const handleReverse = () => setIsReversed(!isReversed);

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          styleClass="is-info"
          onClick={() => setSortType(SortType.ALPHABET)}
          isLightCondition={sortType !== SortType.ALPHABET}
        >
          Sort alphabetically
        </Button>

        <Button
          styleClass="is-success"
          onClick={() => setSortType(SortType.LENGTH)}
          isLightCondition={sortType !== SortType.LENGTH}
        >
          Sort by length
        </Button>

        <Button
          styleClass="is-warning"
          onClick={handleReverse}
          isLightCondition={!isReversed}
        >
          Reverse
        </Button>

        {(sortType !== SortType.NONE || isReversed) && (
          <Button
            styleClass="is-danger"
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
