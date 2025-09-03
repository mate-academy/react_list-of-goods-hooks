import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  alphabetical = 'alphabetical',
  length = 'length',
  reverse = 'reverse',
}

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [initialState, setInitialState] = useState(true);
  const [type, setType] = useState<SortType | ''>('');
  const resetFunction = () => {
    setSortedGoods([...goodsFromServer]);
    setInitialState(true);
    setType('');
  };
  const sortFunction = (sortType: SortType) => {
    setType(sortType);
    setInitialState(false);
    switch (sortType) {
      case SortType.alphabetical:
        setSortedGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
        break;
      case SortType.length:
        setSortedGoods(
          [...goodsFromServer].sort((a, b) => a.length - b.length),
        );
        break;
      case SortType.reverse:
        setSortedGoods([...sortedGoods].reverse());
        break;
      default:
        setSortedGoods([...goodsFromServer]);
    }
  };
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${type === 'alphabetical' ? 'is-active' : 'is-light'}`}
          onClick={() => sortFunction(SortType.alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${type === 'length' ? 'is-active' : 'is-light'}`}
          onClick={() => sortFunction(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${type === 'reverse' ? 'is-active' : 'is-light'}`}
          onClick={() => sortFunction(SortType.reverse)}
        >
          Reverse
        </button>

        {!initialState && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetFunction()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
