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
  const [sortCriteria, setsortCriteria] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handlesortCriteria = (action: string) => {
    switch (action) {
      case 'alphabet':
      case 'length':
        setsortCriteria(action);
        break;
      case 'reverse':
        setIsReversed(prev => !prev);
        break;
      case 'reset':
        setsortCriteria('');
        setGoods(goodsFromServer);
        setIsReversed(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let sortedGoods = [...goodsFromServer];

    if (sortCriteria === 'alphabet') {
      sortedGoods = sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortCriteria === 'length') {
      sortedGoods = sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return () => {
      setGoods(sortedGoods);
    };
  }, [sortCriteria, isReversed]);

  return (
    <div className="section content">
      <ButtonsList
        sortCriteria={sortCriteria}
        handlesortCriteria={handlesortCriteria}
        isReversed={isReversed}
      />
      <GoodsList goods={goods} />
    </div>
  );
};
