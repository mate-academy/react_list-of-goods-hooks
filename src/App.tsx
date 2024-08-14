import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { ButtonsList } from './components/ButtonsList';
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

const getSortedGoods = (
  goods: string[],
  sortCriteria: string,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  if (sortCriteria === 'alphabet') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortCriteria === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleSortCriteria = (action: string) => {
    switch (action) {
      case 'alphabet':
      case 'length':
        setSortCriteria(action);
        break;
      case 'reverse':
        setIsReversed(prev => !prev);
        break;
      case 'reset':
        setSortCriteria('');
        setIsReversed(false);
        break;
      default:
        break;
    }
  };

  const goods = getSortedGoods(goodsFromServer, sortCriteria, isReversed);

  return (
    <div className="section content">
      <ButtonsList
        sortCriteria={sortCriteria}
        handlesortCriteria={handleSortCriteria}
        isReversed={isReversed}
      />
      <GoodsList goods={goods} />
    </div>
  );
};
