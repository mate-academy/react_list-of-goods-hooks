import React, { useMemo, useState } from 'react';

type Props = {
  goods: string[],
};

const numbers = Array.from(Array(10).keys()).map(i => i + 1);

export const GoodsList: React.FC<Props> = ({ goods }: Props) => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [lengthFilter, setLengthFilter] = useState(1);

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
    setLengthFilter(1);
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const sortByAlphabet = () => {
    setSortBy('alphabet');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLengthFilter(+event.currentTarget.value);
  };

  const visibleGoods = useMemo(() => {
    const newGoods = goods.filter(good => good.length >= lengthFilter);

    newGoods.sort((curGood, nextGood) => {
      switch (sortBy) {
        case 'alphabet':
          return curGood.localeCompare(nextGood);
        case 'length':
          return curGood.length - nextGood.length;
        default:
          return 0;
      }
    });

    return isReversed ? newGoods.reverse() : newGoods;
  }, [isReversed, sortBy, lengthFilter]);

  return (
    <>
      <p>
        Set filter by word length:

        <select value={lengthFilter} onChange={handleLengthChange}>
          {numbers.map(num => (
            <option key={num}>
              {num}
            </option>
          ))}
        </select>
      </p>

      <button type="button" onClick={reset}>
        Reset
      </button>

      <button type="button" onClick={reverseGoods}>
        Reverse
      </button>

      <p>
        Sort by:

        <button type="button" onClick={sortByAlphabet}>
          Alphabet
        </button>

        <button type="button" onClick={sortByLength}>
          Length
        </button>
      </p>

      <h1>Goods</h1>

      <ul className="Goods">
        {visibleGoods.map(good => (
          <li className="Goods__item" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};
