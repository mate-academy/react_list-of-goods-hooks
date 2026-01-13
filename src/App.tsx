import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { ButtonsPanel } from './components/ButtonsPanel';
import { GoodsList } from './components/GoodsList';

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
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const goods = useMemo(() => {
    const result: string[] = [...goodsFromServer];

    if (sortType === SortType.ALPHABET) {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.LENGTH) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed]);

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <ButtonsPanel
        onSortAlphabetically={() => setSortType(SortType.ALPHABET)}
        onSortByLength={() => setSortType(SortType.LENGTH)}
        onReverse={() => setIsReversed(prev => !prev)}
        onReset={reset}
        isResetVisible={sortType !== SortType.NONE || isReversed}
        isAlphabetActive={sortType === SortType.ALPHABET}
        isLengthActive={sortType === SortType.LENGTH}
        isReverseActive={isReversed}
      />

      <GoodsList goods={goods} />
    </div>
  );
};
