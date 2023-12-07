import { useState, FC } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { getReorderedGoods } from './functions';
import { SortType } from './types';
import goodsFromServer from './goodsFromServer';

export const App: FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortAlphabetically = () => {
    // if (sortType !== SortType.ALPHABET) {
    setSortType(SortType.ALPHABET);
    // }
  };

  const sortByLength = () => {
    // if (sortType !== SortType.LENGTH) {
    setSortType(SortType.LENGTH);
    // }
  };

  const reverseList = () => {
    setIsReversed(!isReversed);
  };

  const resetList = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    isReversed,
    sortType,
  });

  const alphabetBtnClass = cn('button', 'is-info', {
    'is-light': sortType !== SortType.ALPHABET,
  });

  const lengthBtnClass = cn('button', 'is-success', {
    'is-light': sortType !== SortType.LENGTH,
  });

  const reverseBtnClass = cn('button', 'is-danger', {
    'is-light': !isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetBtnClass}
          onClick={sortAlphabetically}
          disabled={sortType === SortType.ALPHABET}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={lengthBtnClass}
          onClick={sortByLength}
          disabled={sortType === SortType.LENGTH}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={reverseBtnClass}
          onClick={reverseList}
        >
          Reverse
        </button>
        {
          (sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetList}
            >
              Reset
            </button>
          )
        }
      </div>
      <ul>
        <ul>
          {
            visibleGoods.map(item => (
              <li key={item} data-cy="Good">{item}</li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
