# React list of goods (Hooks)

> DON'T use class components (for this and next tasks).

Reimplement the **React list of goods** implemented before using hooks and typescript.
Copy everything you need from your previous solution.

> Here is [the working version](https://mate-academy.github.io/react_list-of-goods/)


1. `Sort alphabetically` button should sort the goods alphabetically.
    - remove `is-light` class from the button when this order is applied;
1. `Sort by length` button should sort the goods by length.
    - remove `is-light` class from the button when this order is applied;
1. `Reverse` button changes the current order to the opposite one.
    - it should work together with any sorting;
    - remove `is-light` class from the button when goods are reversed;
    - the second click should show goods in the direct order;
1. `Reset` button should show the goods in the initial order.
    - it should be visible only if goods are not already in the original order;

- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript) if needed.
- Use `enum SortType` instead of string literals for possible sorting options (including the default one)

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://spencerspe.github.io/react_list-of-goods-hooks/) and add it to the PR description.
