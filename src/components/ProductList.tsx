import React, { useState } from 'react';
import classNames from 'classnames';
import './ProductList.scss';

type Props = {
  products: string[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [visibleButton, setVisibleButton] = useState(true);
  const [visibleListWithButtons, setVisibleListWithButtons] = useState(false);
  const [reverseList, setReverseList] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [resetList, setResetList] = useState(false);
  const [filterList, setFilterList] = useState(1);

  const hideStartButtonAndShowListWithButtons = () => {
    setVisibleButton(() => {
      return false;
    });

    setVisibleListWithButtons(() => {
      return true;
    });
  };

  const filteredList = (event: React.FormEvent<HTMLSelectElement>) => {
    const length = +event.currentTarget.value;

    setFilterList(() => {
      return length;
    });

    setResetList(() => {
      return false;
    });
  };

  const reverse = () => {
    setReverseList(current => !current);
    setResetList(() => {
      return false;
    });
  };

  const sortByName = () => {
    setSortBy(() => {
      return 'name';
    });
    setResetList(() => {
      return false;
    });
  };

  const sortByLength = () => {
    setSortBy(() => {
      return 'length';
    });
    setResetList(() => {
      return false;
    });
  };

  const reset = () => {
    setResetList(() => {
      return true;
    });

    setReverseList(() => {
      return false;
    });

    setSortBy(() => {
      return '';
    });

    setFilterList(() => {
      return 1;
    });
  };

  const copy = products.filter(product => product.length >= filterList);

  copy.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.localeCompare(b);

      case 'length':
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (reverseList) {
    copy.reverse();
  }

  return (
    <div className="container has-background-success-light
      is-flex is-flex-direction-column
      is-justify-content-center is-align-content-center"
    >
      <h1 className="title level-item has-text-centered">Goods</h1>

      <button
        type="button"
        onClick={hideStartButtonAndShowListWithButtons}
        className={classNames(
          'button is-success is-outlined is-rounded',
          {
            showElement: visibleButton,
            hideElement: !visibleButton,
          },
        )}
      >
        Start
      </button>

      <div
        className={classNames(
          'level-item has-text-centered',
          {
            showElement: visibleListWithButtons,
            hideElement: !visibleListWithButtons,
          },
        )}
      >
        <ul>
          {resetList
            ? products.map(product => (
              <li
                key={product}
              >
                {product}
              </li>
            ))
            : copy.map(product => (
              <li
                key={product}
              >
                {product}
              </li>
            ))}
        </ul>

        <div className="selectAndButtons">
          <select
            name="productLength"
            onChange={filteredList}
            value={filterList}
            className="select"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>

          <button
            type="button"
            onClick={reverse}
            className="button is-success is-outlined is-rounded"
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={sortByName}
            className="button is-success is-outlined is-rounded"
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={sortByLength}
            className="button is-success is-outlined is-rounded"
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={reset}
            className="button is-success is-outlined is-rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
