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

const showList = (arr: string[]) =>
  arr.map(good => (
    <li key={good} data-cy="Good">
      {good}
    </li>
  ));

const defaultList = showList(goodsFromServer);

export const App = () => {
  const [actualList, setActualList] = useState(defaultList);
  const [actualListArr, setActualListArr] = useState([...goodsFromServer]);
  const [sortMethod, setSortMethod] = useState<string | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortArray = (arr: string[], method: string): string[] => {
    let sortedArr;

    switch (method) {
      case 'alphabetically':
        sortedArr = [...arr].sort((a, b) => a.localeCompare(b));
        break;
      case 'byLength':
        sortedArr = [...arr].sort((a, b) => a.length - b.length);
        break;
      default:
        sortedArr = arr;
    }

    return sortedArr;
  };

  const handleSort = (method: string) => {
    let sortedArr = sortArray(goodsFromServer, method);

    if (isReversed) {
      sortedArr = [...sortedArr].reverse();
    }

    setSortMethod(method);
    setActualListArr(sortedArr);
    setActualList(showList(sortedArr));
  };

  const handleReverse = () => {
    const reversedArr = [...actualListArr].reverse();

    setIsReversed(!isReversed);
    setActualListArr(reversedArr);
    setActualList(showList(reversedArr));
  };

  const handleReset = () => {
    setSortMethod(null);
    setIsReversed(false);
    setActualListArr([...goodsFromServer]);
    setActualList(defaultList);
  };

  const getButtonClass = (method: string) => {
    if (sortMethod === method && method === 'alphabetically') {
      return 'button is-info';
    }

    if (method === 'alphabetically') {
      return 'button is-info is-light';
    }

    if (sortMethod === method && method === 'byLength') {
      return 'button is-success';
    }

    if (method === 'byLength') {
      return 'button is-success is-light';
    }

    return 'button is-light';
  };

  const reverseButtonClass = `button is-warning ${isReversed ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort('alphabetically')}
          type="button"
          className={getButtonClass('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSort('byLength')}
          type="button"
          className={getButtonClass('byLength')}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={reverseButtonClass}
        >
          Reverse
        </button>

        {sortMethod || isReversed ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>{actualList}</ul>
    </div>
  );
};
