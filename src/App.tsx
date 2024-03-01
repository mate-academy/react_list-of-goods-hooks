import { Key, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetical = 'Sort alphabetically',
  Length = 'Sort by length',
  Default = 'Default',
}

interface Good {
  id?: Key;
  name: string;
}
export const goodsFromServer: Good[] = [
  { name: 'Dumplings' },
  { name: 'Carrot' },
  { name: 'Eggs' },
  { name: 'Ice cream' },
  { name: 'Apple' },
  { name: 'Bread' },
  { name: 'Fish' },
  { name: 'Honey' },
  { name: 'Jam' },
  { name: 'Garlic' },
];

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState<Good[]>(goodsFromServer);
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState<boolean>(false);

  const sortByAlphabet = () => {
    const sortedGoods = [...visibleGoods].sort((a, b) =>
      reverse ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name),
    );

    setVisibleGoods(sortedGoods);
    setSortField(SortType.Alphabetical);
  };

  const sortByLength = () => {
    const sortedGoods = [...visibleGoods].sort((a, b) =>
      reverse ? b.name.length - a.name.length : a.name.length - b.name.length,
    );

    setVisibleGoods(sortedGoods);
    setSortField(SortType.Length);
  };

  const reverseGoods = () => {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setReverse(!reverse);
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setSortField(SortType.Default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetical ? '' : 'is-light'}`}
        >
          {SortType.Alphabetical}
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
        >
          {SortType.Length}
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField !== SortType.Default || reverse) && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
