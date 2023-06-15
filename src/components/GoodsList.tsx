type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    <ul>
      {goods.map(good => {
        return (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        );
      })}
    </ul>
  </ul>
);
