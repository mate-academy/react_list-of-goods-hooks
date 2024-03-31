
export const GoodList: React.FC<Props> = ({ goods }) => (
  goods.map(good => (
    <li key={good}>
      {good}
    </li>
  ))
);
