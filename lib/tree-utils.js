/**
* Created by wjg on 2018/12/5.
*/
/*
 * 遍历json树 子节点以children包装
 * @param  node 树节点
 * @param  fn 回调方法
 */
function traverse(node, fn) {
  if (node) {
    fn(node);
    if (node.children && node.children.length > 0) {
      node.children.forEach(function(child) {
        traverse(child, fn);
    });
    }
  }
}
/*
 * 遍历json树 子节点childName转为children，补全层数和pid、isOpen、visible
 * @param  node 树节点
 * @param  childName 子节点名
 * @param  layer 节点在树中的层级
 * @param  pid 父节点的id
 */
function resetTree(node, childName, layer, pid) {
  if (node) {
    if (childName !== 'children') {
      node.children = node[childName];
      delete node[childName]; // 干掉原来代表children的属性，放在那碍眼，易用错
    }
    if (!node.root) { // 非根节点才添加pid
      node.pid = pid;
    }
    node.layer = layer;
    node.isOpen = false;
    if (node.children && node.children.length > 0) {
      node.children.forEach(function(child) {
        resetTree(child, childName, layer + 1, node.id);
    });
    }
  }
}
/*
 * 遍历json树 tree删除节点
 * @param  node 树节点
 * @param  pid 父节点id
 * @param  id 要删除的节点id
 */
function removeTreeNode(node, pid, id) {
  var delIdx = 0;
  var pNode = getTreePNode(node, pid);
  pNode.children.forEach(function(child, index) {
    if (child.id === id) {
    delIdx = index;
  }
});
  pNode.children.splice(delIdx, 1);
}
/*
 * 遍历json树 tree查找父节点
 * @param  node 树节点
 * @param  pid 要查找的父节点id
 */
function getTreePNode(node, pid) {
  var pNode = null;
  traverse(node, function(child) {
    if (child.id === pid) {
    pNode = child;
  }
});
  return pNode;
}
/*
 * 遍历json树 取节点层级数
 * @param  node 树节点
 * @param  key 过滤关键字
 * @param  value 过滤关键字的值
 * @return 要返回的层级数
 */
function getTreeMaxLayer(node, key, value) {
  var layers = [];
  traverse(node, function(child) {
    if (child[key] === value) {
    layers.push(child.layer);
  }
});
  return (Math.max.apply(null, layers) - node.layer) + 1;
}
/*
 * 遍历json列表 递归生成id节点在树中的路径
 * @param list 有id,pid的树列表
 * @param id 要生成路径的节点
 * @param key 要返回的内容
 * @return 返回节点路径 正序
 */
function getTreeChain(list, id, key) {
  var ret = [];
  list.forEach(function(item) {
    if (id === item.id || (id + '') === item.id) {
    ret.push(item[key]);
    var arr = getTreeChain(list, item.pid, key);
    ret = ret.concat(arr, ret);
  }
});
  return ret;
}
/*
 * json树转列表
 * @param tree 要转的树
 * @return 列表
 */
function tree2List(tree) {
  var ret = [];
  traverse(tree, function(node) {
    ret.push(node);
});
  return ret;
}
/*
 * 列表转json树
 * @param list 要转的列表
 * @param pid 父节点id
 * @return 树
 */
function list2Tree(list, pid) {
  var ret = [];
  list.forEach(function(item) {
    if (item.pid === pid || (item.pid + '') === pid) {
    var node = JSON.parse(JSON.stringify(item));
    node.children = list2Tree(list, item.id);
    ret.push(node);
  }
});
  return ret;
}

module.exports = {
  list2Tree: list2Tree,
  tree2List: tree2List,
  getTreeChain: getTreeChain,
  getTreeMaxLayer: getTreeMaxLayer,
  getTreePNode: getTreePNode,
  removeTreeNode: removeTreeNode,
  resetTree: resetTree,
  traverse: traverse
};
