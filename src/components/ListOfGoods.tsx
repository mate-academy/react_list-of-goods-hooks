type GoodType = {
  goodTitles: string[];
  sortBy: string;
  isReversed: boolean;
};

export const ListOfGoods: React.FC<GoodType> = ({
  goodTitles,
  sortBy,
  isReversed,
}) => {
  const getFormattedGoods = (goods: string[]): string[] => {
    let customizedGoods = goods;

    if (sortBy) {
      switch (sortBy) {
        case 'alphabetically': {
          customizedGoods = customizedGoods.sort((g1, g2) => {
            return g1.localeCompare(g2);
          });

          break;
        }

        case 'length': {
          customizedGoods = customizedGoods.sort((g1, g2) => {
            return g1.length - g2.length;
          });

          break;
        }
      }
    }

    if (isReversed) {
      customizedGoods = customizedGoods.reverse();
    }

    return customizedGoods;
  };

  return (
    <ul>
      {getFormattedGoods(goodTitles).map(item => {
        return (
          <li key={item} data-cy="Good">
            {item}
          </li>
        );
      })}
    </ul>
  );
};
