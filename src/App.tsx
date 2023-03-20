import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Goods } from './components/Goods';
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

type ReorderOptions = {
  isReversed: boolean,
  sortType: SortType,
};

function getReorderedGoods(
  goods: string[],
  {
    isReversed,
    sortType,
  }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const handleReverse = () => {
    setIsReversed(current => !current);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const handleSort = (value: SortType) => {
    setSortType(value);
  };

  const switchToVisible = isReversed || sortType !== SortType.NONE;
  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    {
      isReversed,
      sortType,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          title="Sort alphabetically"
          buttonColor="is-info"
          isLight={sortType !== SortType.ALPHABET}
          onClick={() => handleSort(SortType.ALPHABET)}
        />

        <Button
          title="Sort by length"
          buttonColor="is-success"
          isLight={sortType !== SortType.LENGTH}
          onClick={() => handleSort(SortType.LENGTH)}
        />

        <Button
          title="Reverse"
          buttonColor="is-warning"
          isLight={!isReversed}
          onClick={handleReverse}
        />

        {switchToVisible && (
          <Button
            title="Reset"
            buttonColor="is-danger"
            isLight
            onClick={handleReset}
          />
        )}
      </div>

      <Goods goods={reorderedGoods} />
    </div>
  );
};
