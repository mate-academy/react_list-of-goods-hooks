import React, { useState } from 'react';
import classNames from 'classnames';
import '../App.css';

type Props = {
  goods: string[],
};

export const Goodslist: React.FC<Props> = ({ goods }) => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [lengthLimit, setLengthLimit] = useState(1);

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLengthLimit(+event.target.value);
  };

  const reverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const sortByName = () => {
    setSortBy('name');
  };

  const reset = () => {
    setLengthLimit(1);
    setIsReversed(false);
    setSortBy('');
  };

  const selectedGoods = goods.filter(good => {
    return good.length >= lengthLimit;
  });

  selectedGoods.sort((good1, good2) => {
    switch (sortBy) {
      case 'length':
        return good1.length - good2.length;
        break;

      case 'name':
        return good1.localeCompare(good2);
        break;
      default:
        return 0;
        break;
    }
  });

  if (isReversed) {
    selectedGoods.reverse();
  }

  return (
    <div className="colums">
      <div className="
              card
              column
              is-half
              is-offset-one-quarter
              content is-large
              "
      >
        <h1 className="
                contnet
                is-large
                has-text-centered"
        >
          Choise Filter
        </h1>
        <div className="column columns">
          <div className="column">
            <button
              className={classNames(
                'button',
                'is-success',
                { 'is-danger': isReversed },
              )}
              type="button"
              onClick={() => reverse()}
            >
              Reverse
            </button>

          </div>
          <div className="column">
            <button
              className={classNames(
                'button',
                'is-success',
                { 'is-danger': sortBy === 'name' },
              )}
              type="button"
              onClick={() => sortByName()}
            >
              Sort alphabetically
            </button>

          </div>
          <div className="column">
            <button
              className={classNames(
                'button',
                'is-success',
                { 'is-danger': sortBy === 'length' },
              )}
              type="button"
              onClick={() => sortByLength()}
            >
              Sort by length
            </button>

          </div>
          <div className="column">
            <button
              className={classNames(
                'button',
                'is-success',
                {
                  'is-danger':
                     isReversed
                      || sortBy === 'name'
                      || sortBy === 'length'
                      || lengthLimit > 1,
                },
              )}
              type="button"
              onClick={() => reset()}
            >
              Reset
            </button>

          </div>
          <div className="column">
            <label htmlFor="" className="level">
              Length
              <div className="select is-small is-rounded">
                <select
                  value={lengthLimit}
                  name="select"
                  onChange={selectHandler}
                  className="select"
                >
                  { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>

        </div>
        <ul>
          {selectedGoods.map(good => {
            return (
              <li key={good}>
                {good}
              </li>
            );
          })}
        </ul>

      </div>
    </div>
  );
};
