import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';
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

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [filter, setFilter] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleFilter = (action: string) => {
    switch (action) {
      case 'alphabet':
        setFilter('alphabet');
        break;
      case 'length':
        setFilter('length');
        break;
      case 'reverse':
        setIsReversed(prev => !prev);
        break;
      case 'reset':
        setFilter('');
        setGoods(goodsFromServer);
        setIsReversed(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let sortedGoods = [...goodsFromServer];

    if (filter === 'alphabet') {
      sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (filter === 'length') {
      sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }, [filter, isReversed]);

  return (
    <div className="section content">
      <ButtonsList
        filter={filter}
        handleFilter={handleFilter}
        isReversed={isReversed}
      />
      <GoodsList goods={goods} />
    </div>
  );
};
