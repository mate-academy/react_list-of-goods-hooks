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

type SortType = 'NONE' | 'ALPHABET' | 'LENGTH';
type IsReversed = boolean;
type IsReset = boolean;

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>('NONE');
  const [isReversed, setReverse] = useState<IsReversed>(false);
  const [isReset, setReset] = useState<IsReset>(false);

  const isOriginalOrder = !isReversed && sortType === 'NONE';

  useEffect(() => {
    let sortedGoods = [...goods];

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

    if (isReset) {
      sortedGoods = [...goodsFromServer];
      setSortType('NONE');
      setReverse(false);
      setReset(false);
    }

    setGoods(sortedGoods);
  }, [sortType, isReversed, isReset]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'ALPHABET' ? '' : 'is-light'}`}
          onClick={() => setSortType('ALPHABET')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'LENGTH' ? '' : 'is-light'}`}
          onClick={() => setSortType('LENGTH')}
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
            className="button is-danger is-light"
            onClick={() => setReset(true)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
