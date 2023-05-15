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
    if (param === 'alphabetical') {
      setCopyArrayList([...copyArrayList].sort((a, b) => a.localeCompare(b)));
      setSortType(SortType.ALPHABET);
    }

    if (param === 'length') {
      setCopyArrayList([...copyArrayList].sort((a, b) => a.length - b.length));
      setSortType(SortType.LENGTH);
    }

    if (param === 'reverse') {
      setCopyArrayList([...copyArrayList].reverse());
      setIsReversed(true);
    }

    if (param === 'reset') {
      setCopyArrayList([...goodsFromServer]);
      setIsReversed(false);
      setSortType(SortType.NONE);
    }
  };

  const AlpabetClassName
    = (sortType === SortType.ALPHABET && !isReversed)
    || (sortType === SortType.ALPHABET && isReversed)
      ? 'button is-info'
      : 'button is-info is-light';

  const lengthClassName
    = (sortType === SortType.LENGTH && !isReversed)
    || (sortType === SortType.LENGTH && isReversed)
      ? 'button is-success'
      : 'button is-success is-light';

  const reverseClassName = isReversed
    ? 'button is-warning'
    : 'button is-warning is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={AlpabetClassName}
          onClick={() => getReorderedGoods('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthClassName}
          onClick={() => getReorderedGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseClassName}
          onClick={() => getReorderedGoods('reverse')}
        >
          Reverse
        </button>

        {isReversed && (
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
        {copyArrayList.map((ListElem) => (
          <li data-cy="Good" key={ListElem}>
            {ListElem}
          </li>
        ))}
      </ul>
    </div>
  );
};
