type Props = {
  goods: string[];
};

export const GoodList = ({ goods }: Props) => (
  <>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </>
);
