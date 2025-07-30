import React, { useContext } from 'react';
import { GoodsContext, SortType } from '../../App';
import { goodsFromServer } from '../../model/GoodsFromServer.model';
import { TButton } from '../../types/TButton';

type Props = {
  button: TButton;
};

export const Button: React.FC<Props> = ({ button }) => {
  const context = useContext(GoodsContext);

  if (!context) {
    throw new Error(
      'Button component must be used within a GoodsContext.Provider',
    );
  }

  const {
    goods,
    setGoods,
    historyOrder,
    setHistoryOrder,
    counterReset,
    setCounterReset,
    isLightAlpha,
    isLightReverse,
    isLightLength,
    setIsLightAlpha,
    setIsLightLength,
    setIsLightReverse,
  } = context;

  const handleOrderByAlpha = () => {
    setIsLightAlpha(false);
    setIsLightLength(true);
    setIsLightReverse(true);

    setGoods(
      [...goods].sort((good1, good2) => {
        return good1.localeCompare(good2);
      }),
    );

    setHistoryOrder([...historyOrder, SortType.Alphabetically]);
  };

  const handleOrderByLength = () => {
    setIsLightLength(false);
    setIsLightAlpha(true);
    setIsLightReverse(true);

    setGoods(
      [...goods].sort((good1, good2) => {
        return good1.length - good2.length;
      }),
    );

    setHistoryOrder([...historyOrder, SortType.Length]);
  };

  const handleOrderReset = () => {
    setIsLightAlpha(true);
    setIsLightLength(true);
    setIsLightReverse(true);

    setGoods(goodsFromServer);
  };

  const handleOrderByReverse = () => {
    if (counterReset > 1) {
      setCounterReset(0);
    }

    switch (historyOrder[historyOrder.length - 2]) {
      case SortType.Alphabetically:
        setCounterReset(counterReset + 1);
        handleOrderByAlpha();
        setIsLightReverse(false);
        break;
      case SortType.Length:
        setCounterReset(counterReset + 1);
        handleOrderByLength();
        setIsLightReverse(false);
        break;
    }
  };

  return (
    <>
      {(() => {
        switch (button.textContent) {
          case 'Sort alphabetically':
            return (
              <button
                type="button"
                onClick={() => handleOrderByAlpha()}
                className={`${button.className} ${isLightAlpha ? 'is-light' : ''}`}
              >
                {button.textContent}
              </button>
            );
          case 'Sort by length':
            return (
              <button
                type="button"
                onClick={() => handleOrderByLength()}
                className={`${button.className} ${isLightLength ? 'is-light' : ''}`}
              >
                {button.textContent}
              </button>
            );
          case 'Reverse':
            return (
              <button
                type="button"
                onClick={() => handleOrderByReverse()}
                className={`${button.className} ${isLightReverse ? 'is-light' : ''}`}
              >
                {button.textContent}
              </button>
            );
          case 'Reset': {
            if (!isLightAlpha || !isLightLength || !isLightReverse) {
              return (
                <button
                  type="button"
                  onClick={() => handleOrderReset()}
                  className={`${button.className}`}
                >
                  {button.textContent}
                </button>
              );
            }
          }
        }
      })()}
    </>
  );
};
