export const GoodList: React.FC<string[]> = ({ vals }) => {
  return (
    <ul>
      <ul>
        {[...vals].map((good: string, el: number) => {
          return (
            <li key={el} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </ul>
  );
};
