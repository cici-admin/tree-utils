#  @dadcici/tree-utils

> The CICI utility is an integrated tree operation, such as: traversal tree, list-to-tree, tree-to-list, generate branch path based on node ID, and get the level of the node.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
## Setup

`npm install @dadcici/tree-utils --save`

## Simple usage

```javascript
import TreeUtils from ' @dadcici/tree-utils';

let list = [
  { id: 0, root: 'root' },
  { id: 1, name: 'name1', pid: 0 },
  { id: 2, name: 'name2', pid: 0 },
  { id: 3, name: 'name3', pid: 1 },
  { id: 4, name: 'name4', pid: 3 }
];

let tree = TreeUtils.list2Tree(list, 0);
```

## License

Copyright (c) 2018 by www.dadcici.com
