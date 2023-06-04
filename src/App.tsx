import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  NONE = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const [isReset, setReset] = useState(false);

  useEffect(() => {
    let sortedGoods = [...goodsFromServer];

    switch (sortType) {
      case 'ALPHABET':
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case 'LENGTH':
        sortedGoods.sort((a, b) => {
          return a.length !== b.length
            ? a.length - b.length
            : a.localeCompare(b);
        });
        break;
      default:
        break;
    }

    if (isReversed) {
      sortedGoods = sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }, [sortType, isReversed, goods]);

  useEffect(() => {
    if (isReset) {
      setSortType(SortType.NONE);
      setReverse(false);
      setReset(false);
    }
  }, [isReset]);

  const isOriginalOrder = !isReversed && sortType === SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'ALPHABET' ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'LENGTH' ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className={`button is-danger ${!isOriginalOrder ? '' : 'is-light'}`}
            onClick={() => setReset(true)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
