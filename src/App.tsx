import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './GoodsList';
import { goodsFromServer, sortData } from './utils';
import { SortParam, SortType } from './types';

export const App: React.FC = () => {
  const [data, setData] = useState(goodsFromServer);
  const [reversedStatus, setReversedStatus] = useState(false);
  const [sortingParam, setSortingParam] = useState('');

  const handleSortAndReverse = (sortParam: SortParam) => {
    return () => {
      const sortedData = sortData([...data], sortParam);

      if (sortParam && reversedStatus) {
        sortedData.reverse();
      }

      setSortingParam(sortParam);
      setData(sortedData);

      if (!sortParam) {
        setReversedStatus(false);
      }
    };
  };

  const toggleReversedStatus = () => {
    setReversedStatus(!reversedStatus);
    setData([...data].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortingParam === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAndReverse(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortingParam === 'length' ? '' : 'is-light'}`}
          onClick={handleSortAndReverse(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversedStatus ? '' : 'is-light'}`}
          onClick={toggleReversedStatus}
        >
          Reverse
        </button>

        {(reversedStatus || sortingParam !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleSortAndReverse('')}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList list={data} />
    </div>
  );
};
