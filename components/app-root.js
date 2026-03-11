const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      display: block;
    }
    h1 {
      color: white;
    }
  </style>
  <h1>Hola Bootcamper</h1>
`;

class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("app-root", AppRoot);
