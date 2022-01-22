function h(type, props, ...children) {
    return { type, props, children }
}

// const vnode = h('ul', {'class': 'list'}, h('li', {}, 'item1'), h('li', {}, 'item2'))
// console.log(vnode);

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

function updateElement($parent, newNode, oldNode, index = 0) {
    if(!oldNode) {
        $parent.appendChild(createElement(newNode))
    } else if (!newNode) {
        $parent.removeChild(
            $parent.childNodes[index]
        )
    } else if (changed(newNode, oldNode)) {
        $parent.replaceChild(
            createElement(newNode),
            $parent.childNodes[index]
        )
    } else if(newNode.type) {
        const newLength = newNode.children.length
        const oldLength = oldNode.children.length
        for(let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(
                $parent.childNodes[index],
                newNode.children[i],
                oldNode.children[i],
                i
            )
        }
    }
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2
        || typeof node1 === 'string' && node1 !== node2
        || node1.type !== node2.type
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
const b = h("ul", { className: "list" }, h("li", {}, "item 1"), h("li", {}, "hello!!!"))

const $root = document.getElementById('root');
const $reload = document.getElementById('reload');

$root.appendChild(createElement(a));
$reload.addEventListener('click', () => {
    updateElement($root, b, a);
});