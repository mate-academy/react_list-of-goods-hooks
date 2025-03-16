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
  const [isSortedByLength, setIsSortedByLength] = useState<boolean>(false);
  const [isSortedByAlphabet, setIsSortedByAlphabet] = useState<boolean>(false);

  const sortedByAlphabet = (): void => {
    const sorted = [...goods].sort(
      (a, b) => {
        return !isReversed
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      },
      // eslint-disable-next-line function-paren-newline
    );

    setGoods(sorted);
    setIsSortedByAlphabet(true);
    setIsSortedByLength(false);
  };

  const sortedByLength = (): void => {
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
    setIsSortedByLength(true);
    setIsSortedByAlphabet(false);
  };

  const reverse = (): void => {
    setGoods((items: Good[]) => [...items].reverse());
    setIsReversed(!isReversed);
  };

  const reset = (): void => {
    setGoods(goodsWithId);
    setIsSortedByLength(false);
    setIsReversed(false);
    setIsSortedByAlphabet(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isSortedByAlphabet ? 'is-light' : ''}`}
          onClick={sortedByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!isSortedByLength ? 'is-light' : ''}`}
          onClick={sortedByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning  ${!isReversed ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isSortedByAlphabet || isSortedByLength || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
