export function h(tag, props, ...children) {
    const element = document.createElement(tag);
  
    // Gán các thuộc tính (props) cho phần tử
    if (props) {
      Object.keys(props).forEach(key => {
        if (key.startsWith("on")) {
          // Nếu là sự kiện (ví dụ: onClick), gắn sự kiện vào phần tử
          element.addEventListener(key.slice(2).toLowerCase(), props[key]);
        } else if (key === "class" || key === "className") {
          // Nếu là class hoặc className, gán vào className của phần tử
          element.className = props[key];
        }else if(key === 'textContent'){
          element.textContent = props[key];
        } 
        else if(key === 'src'){
          element.src = props[key];
        }
        else {
          // Nếu là thuộc tính khác, gắn vào phần tử
          element.setAttribute(key, props[key]);
        }
      });
    }
  
    // Gắn các phần tử con (children) vào phần tử
    children.forEach(child => {
      if (typeof child === "string") {
        // Nếu là chuỗi, tạo text node và thêm vào
        element.appendChild(document.createTextNode(child));
      } else {
        // Nếu là phần tử khác (node), thêm nó vào
        element.appendChild(child);
      }
    });
  
    return element;
  }
  
  
function Test() {
return h(
    "div",
    { className: "container" },
    h("h1", { className: "title" }, "Xin chào các bạn"),
    h("button", { className: "btn", onClick: () => alert("Button clicked!") }, "Click Me")
);
}
  