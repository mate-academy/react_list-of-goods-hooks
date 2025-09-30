import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  Alphabet = 'Sort alphabetically',
  Length   = 'Sort by length',
  Reverse  = 'Reverse',
  Reset    = 'Reset'
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [activeSort, setActiveSort] = useState<SortType | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSort = (type: SortType) => {
    let sortedGoods = [...goods];

    switch (type) {
      case SortType.Alphabet:
        sortedGoods.sort((a, b) => 
          isAscending ? a.localeCompare(b) : b.localeCompare(a)
        );
        setActiveSort(SortType.Alphabet);
        break;

      case SortType.Length:
        sortedGoods.sort((a, b) => 
          isAscending ? a.length - b.length : b.length - a.length
        );
        setActiveSort(SortType.Length);
        break;

      case SortType.Reverse:
        sortedGoods.reverse();
        setIsAscending(prev => !prev);
        setActiveSort(SortType.Reverse);
        break;

      case SortType.Reset:
        sortedGoods = [...goodsFromServer];
        setActiveSort(null);
        setIsAscending(true);
        break;

      default:
        break;
    }

    setGoods(sortedGoods);
  };

  const handleSortClick = (type: SortType) => {
    if (type === SortType.Reverse) {
      // For reverse, we want to toggle the order and reverse the list
      setIsAscending(prev => !prev);
    } else if (type !== SortType.Reset) {
      // For other sorts, set ascending order and the active sort type
      setIsAscending(true);
    }
    
    handleSort(type);
  };

  const getButtonColor = (type: SortType): string => {
    const baseClasses: Record<SortType, string> = {
      [SortType.Alphabet]: 'is-info',
      [SortType.Length]: 'is-success',
      [SortType.Reverse]: 'is-warning',
      [SortType.Reset]: 'is-danger',
    };

    const isActive = activeSort === type;
    const lightClass = isActive ? 'is-light' : '';

    return `${baseClasses[type]} ${lightClass}`;
  };

  const shouldShowResetButton = !goods.every(
    (item, index) => item === goodsFromServer[index]
  );

  return (
    <div className="section content">
      <div className="buttons">
        {Object.values(SortType).map((type) => {
          if (type === SortType.Reset && !shouldShowResetButton) {
            return null;
          }

          return (
            <button
              key={type}
              type="button"
              className={`button ${getButtonColor(type)}`}
              onClick={() => handleSortClick(type)}
            >
              {type}
            </button>
          );
        })}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};