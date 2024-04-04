import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [reverse, setReverse] = useState(false);
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [clicked4, setClicked4] = useState(false);

  useEffect(() => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.ALPHABET) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }, [sortType, reverse]);

  const resetClicked = () => {
    setClicked1(false);
    setClicked2(false);
    setClicked3(false);
    setClicked4(false);
  };

  const handleSort = (type: SortType) => {
    setSortType(type);
    setReverse(false);
    resetClicked();
  };

  const handleReverse = () => {
    setReverse(!reverse);
    resetClicked();
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
    resetClicked();
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', {
            'is-info': true,
            'is-light': !clicked1,
          })}
          onClick={() => {
            handleSort(SortType.ALPHABET);
            setClicked1(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': true,
            'is-light': !clicked2,
          })}
          onClick={() => {
            handleSort(SortType.LENGTH);
            setClicked2(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', {
            'is-warning': true,
            'is-light': !clicked3,
          })}
          onClick={() => {
            handleReverse();
            setClicked3(true);
          }}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || reverse) && (
          <button
            type="button"
            className={cn('button', {
              'is-danger': true,
              'is-light': !clicked4,
            })}
            onClick={() => {
              handleReset();
              setClicked4(true);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList goodsList={goods} />
    </div>
  );
};
