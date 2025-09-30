import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  alphabet = 'Sort alphabetically',
  length = 'Sort by length',
  reverse = 'Reverse',
  reset = 'Reset',
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [count, setCount] = useState<string>('1');
  const [count1, setCount1] = useState<string>('1');
  const [count2, setCount2] = useState<boolean>(true);
  const [count3, setCount3] = useState<string>('1');

  const sortGoods = (type: SortType) => {
    let sorted = [...goods];

    switch (type) {
      case SortType.alphabet:
        if (!count2) {
          sorted.sort((a, b) => b.localeCompare(a));
        } else {
          sorted.sort((a, b) => a.localeCompare(b));
        }

        break;

      case SortType.length:
        if (!count2) {
          sorted.sort((a, b) => b.length - a.length);
        } else {
          sorted.sort((a, b) => a.length - b.length);
        }

        break;

      case SortType.reverse:
        sorted.reverse();
        break;

      default:
        sorted = [...goodsFromServer];
    }

    setGoods(sorted);
  };

  const handleFunction = (value: SortType) => {
    sortGoods(value);

    if (value === SortType.alphabet) {
      setCount('0');
      setCount1('1');
      setCount3('0');
    } else if (value === SortType.length) {
      setCount('1');
      setCount1('0');
      setCount3('0');
    } else if (value === SortType.reverse) {
      setCount2(prev => {
        const newVal = !prev;

        sortGoods(value);

        return newVal;
      });
      setCount3('0');
    } else if (value === SortType.reset) {
      setCount3('1');
      setCount('1');
      setCount1('1');
      setCount2(true);
    }
  };

  const getColor = (value: SortType) => {
    if (value === SortType.alphabet) {
      return `is-info    ${count === '1' ? 'is-light' : ''}`;
    }

    if (value === SortType.length) {
      return `is-success ${count1 === '1' ? 'is-light' : ''}`;
    }

    if (value === SortType.reverse) {
      return `is-warning ${count2 ? 'is-light' : ''}`;
    }

    if (value === SortType.reset) {
      return `is-danger  ${count3 === '0' ? 'is-light' : ''}`;
    }

    return '';
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          {Object.values(SortType).map(value => {
            if (
              value === SortType.reset &&
              goods.every((item, i) => item === goodsFromServer[i])
            ) {
              return null;
            }

            return (
              <button
                key={value}
                type="button"
                className={`button ${getColor(value)}`}
                onClick={() => {
                  handleFunction(value);
                }}
              >
                {value}
              </button>
            );
          })}
        </div>

        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
