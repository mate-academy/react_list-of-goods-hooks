# React list of goods (Hooks)

> DON'T use class components (for this and next tasks).

Reimplement the **React list of goods** implemented before using hooks and typescript.
Copy everything you need from your previous solution.

> Here is [the working version](https://mate-academy.github.io/react_list-of-goods/)

- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript) if needed.
- Use `enum SortType` instead of string literals for possible sorting options (including the default one)

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_list-of-goods-hooks/) and add it to the PR description.
enum SortTypes {
  SORT_ALPHABETICALLY = 'is-info',
  SORT_LENGTH = 'is-success',
}

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function getSortedGoods(sortBy: SortTypes, isReversed: boolean) {
  const sortArr = [...goodsFromServer];

  if (sortBy) {
    sortArr.sort((good1, good2) => {
      switch (sortBy) {
        case SortTypes.SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortTypes.SORT_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }
