import React, { useState } from 'react';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  const visibleGoods = [...goods];
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('id');

  visibleGoods.sort((a: string, b: string): number => {
    switch (sortBy) {
      case 'alphabet': return a.localeCompare(b);
      case 'length': return a.length - b.length;
      default: return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <>
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-inverted"
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>
        <button
          type="button"
          className="button is-info is-inverted"
          onClick={() => setSortBy('alphabet')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className="button is-info is-inverted"
          onClick={() => {
            setSortBy('id');
            setIsReversed(false);
          }}
        >
          Reset
        </button>
        <button
          type="button"
          className="button is-info is-inverted"
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>
    </>
  );
};
