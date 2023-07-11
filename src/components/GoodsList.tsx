type Props = {
  goods: string[];
};

export const GoodsList = ({ goods } :Props) => {
  return (
    <ul>
      {goods.map((good) => {
        return (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        );
      })}
    </ul>
  );
};
