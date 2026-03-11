import styles from "./tab-system.css" with { type: "css" };

const template = document.createElement("template");
template.innerHTML = `
  <div class="tab-buttons"></div>
  <div class="tab-content"></div>
`;

class TabContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._buttons = [];
    this._sections = [];
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [styles];
    this._setupTabs();
  }

  _setupTabs() {
    const buttonsContainer = this.shadowRoot.querySelector(".tab-buttons");
    const contentContainer = this.shadowRoot.querySelector(".tab-content");

    const children = Array.from(this.children);

    children.forEach((child) => {
      if (child.tagName === "BUTTON") {
        this._buttons.push(child);
        const buttonClone = child.cloneNode(true);
        buttonClone.addEventListener("click", () => this._activateTab(buttonClone));
        buttonsContainer.appendChild(buttonClone);
      } else if (child.tagName === "SECTION") {
        this._sections.push(child);
        const sectionClone = child.cloneNode(true);
        contentContainer.appendChild(sectionClone);
      }
    });

    this._updateActiveStates();
  }

  _activateTab(clickedButton) {
    if (!document.startViewTransition) {
      this._switchTab(clickedButton);
      return;
    }

    document.startViewTransition(() => {
      this._switchTab(clickedButton);
    });
  }

  _switchTab(clickedButton) {
    const buttons = this.shadowRoot.querySelectorAll(".tab-buttons button");
    const sections = this.shadowRoot.querySelectorAll(".tab-content section");
    const index = Array.from(buttons).indexOf(clickedButton);

    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });

    sections.forEach((sec, i) => {
      sec.classList.toggle("active", i === index);
    });
  }

  _updateActiveStates() {
    const buttons = this.shadowRoot.querySelectorAll(".tab-buttons button");
    const sections = this.shadowRoot.querySelectorAll(".tab-content section");

    buttons.forEach((btn, i) => {
      const originalBtn = this._buttons[i];
      btn.classList.toggle("active", originalBtn.hasAttribute("active"));
    });

    sections.forEach((sec, i) => {
      //const originalSec = this._sections[i];
      sec.classList.toggle("active", i === 0 || this._buttons[i]?.hasAttribute("active"));
    });
  }
}

customElements.define("tab-container", TabContainer);
