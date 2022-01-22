function h(type, props, ...children) {
    return { type, props, children }
}

const vnode = h('ul', {'class': 'list'}, h('li', {}, 'item1'), h('li', {}, 'item2'))

// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/

// in react, it's like this
// React.createElement('ul', { className: 'list'}, React.createElement('li', {}, 'item1'),  React.createElement('li', {}, 'item2'))

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children
        .map(createElement)
        .forEach($el.appendChild.bind($el));
    return $el;
}

/** @jsx h */
// const a = (
//     <ul className=”list”>
// <li>item 1</li>
// <li>item 2</li>
// </ul>
// );

// => it will be compiled to following by babel
const a = h("ul", { className: "list" }, h("li", {}, "item 1"), h("li", {}, "item 2"))

const $root = document.getElementById('root');
$root.appendChild(createElement(a));