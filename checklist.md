1. [CODE KNOWLEDGE] - Don't interact with DOM directly, use React as much as possible;
2. [CODE KNOWLEDGE] - When you rendering a list, don't forget to add `key` prop

BAD EXAMPLE:
```jsx
<div>
  {cats.map(cat => <Cat cat={cat} />)}
</div>
```

GOOD EXAMPLE:
```jsx
<div>
  {cats.map(cat => <Cat key={cat.id} cat={cat} />)}
</div>
```
3. [UX] - don't forget to mark the active button to explain to the user what action is active
4. [CODE STYLE] - Function's name should start with a verb (so you could easily tell what your method actually do)

BAD EXAMPLE:
```jsx
const clickHandler = () => {
 console.log('Hello, world');
}
```

GOOD EXAMPLE:
```jsx
const handleClick = () => {
 console.log('Hello, world');
}
```
