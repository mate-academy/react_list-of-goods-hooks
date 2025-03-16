import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { Good } from './interfaces/good';

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

const goodsWithId: Good[] = goodsFromServer.map((item, id) => ({
  id: id + 1,
  name: item,
}));

export const App = () => {
  const [goods, setGoods] = useState<Good[]>(goodsWithId);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [isSortByLength, setIsSortByLength] = useState<boolean>(false);
  const [isSortByAlphabet, setIsSortByAlphabet] = useState<boolean>(false);

  const sortByAlphabet = (): void => {
    const sorted = [...goods].sort(
      (a, b) => {
        return !isReversed
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      },
      // eslint-disable-next-line function-paren-newline
    );

    setGoods(sorted);
    setIsSortByAlphabet(true);
    setIsSortByLength(false);
  };

  const sortByLength = (): void => {
    const sorted = [...goods].sort(
      (a, b) => {
        const letterA = a.name;
        const letterB = b.name;

        return !isReversed
          ? letterA.length - letterB.length
          : letterB.length - letterA.length;
      },
      // eslint-disable-next-line function-paren-newline
    );

    setGoods(sorted);
    setIsSortByLength(true);
    setIsSortByAlphabet(false);
  };

  const reverseGoods = (): void => {
    setGoods((items: Good[]) => [...items].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = (): void => {
    setGoods(goodsWithId);
    setIsSortByLength(false);
    setIsReversed(false);
    setIsSortByAlphabet(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isSortByAlphabet ? 'is-light' : ''}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!isSortByLength ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${!isReversed ? 'is-light' : ''}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(isSortByAlphabet || isSortByLength || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(({ id, name }: Good) => (
          <li key={id} data-cy="Good">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
