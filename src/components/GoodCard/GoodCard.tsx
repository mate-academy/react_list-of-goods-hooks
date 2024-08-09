interface Good {
  good: string;
}

export const GoodCard: React.FC<Good> = ({ good }: Good) => {
  return <li data-cy="Good">{good}</li>;
};
