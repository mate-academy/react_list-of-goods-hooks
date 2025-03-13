export const GoodsList = ({ items }: { items: string[] }) => {
  return items.map((good: string) => (
    <li data-cy="Good" key={good}>
      {good}
    </li>
  ));
};
