import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer = [
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

const SortType = {
  NONE: 0,
  ALPHABET: 1,
  LENGTH: 2,
};

export const App: React.FC = () => {
  const [copyArrayList, setCopyArrayList] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const getReorderedGoods = (param: string) => {
    let sortedArray;

    switch (param) {
      case 'alphabetical':
        sortedArray = copyArrayList
          .sort((a, b) => (isReversed
            ? b.localeCompare(a)
            : a.localeCompare(b)));
        setSortType(SortType.ALPHABET);
        break;
      case 'length':
        sortedArray = copyArrayList
          .sort((a, b) => (isReversed
            ? b.length - a.length
            : a.length - b.length));
        setSortType(SortType.LENGTH);
        break;
      case 'reverse':
        sortedArray = copyArrayList.reverse();
        setIsReversed(!isReversed);
        break;
      case 'reset':
        sortedArray = [...goodsFromServer];
        setIsReversed(false);
        setSortType(SortType.NONE);
        break;
      default:
        sortedArray = copyArrayList;
    }

    setCopyArrayList([...sortedArray]);
  };

  const getButtonClassName = (buttonType: number) => {
    const isActive
      = (sortType === buttonType && !isReversed)
      || (sortType === buttonType && isReversed);

    return isActive ? 'button is-info' : 'button is-info is-light';
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClassName(SortType.ALPHABET)}
          onClick={() => getReorderedGoods('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClassName(SortType.LENGTH)}
          onClick={() => getReorderedGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => getReorderedGoods('reverse')}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => getReorderedGoods('reset')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {copyArrayList.map((listElem) => (
          <li data-cy="Good" key={listElem}>
            {listElem}
          </li>
        ))}
      </ul>
    </div>
  );
};
