type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
// It was wrapped with two ul's in the original App component
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
);
