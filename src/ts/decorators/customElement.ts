interface CustomElementConfig {
    selector:string;
    template: string;
    style?: string;
    shadowDom?: boolean;
}

const noop: any = () => {};

export const CustomElement: any = (config: CustomElementConfig) => (cls: any) => {

    const template: HTMLTemplateElement = document.createElement('template');

    if (config.style) {
        config.template = `<style>${config.style}</style> ${config.template}`;
    }

    template.innerHTML = config.template;

    const connectedCallback: any = cls.prototype.connectedCallback || noop;
    const disconnectedCallback: any = cls.prototype.disconnectedCallback || noop;

    cls.prototype.connectedCallback = function(): any {
        const clone: any = document.importNode(template.content, true);
        if (config.shadowDom) {
            this.attachShadow({mode: 'open'}).appendChild(clone);
        } else {
            this.appendChild(clone);
        }

        if (this.componentWillMount) {
            this.componentWillMount();
        }
        connectedCallback.call(this);
        if (this.componentDidMount) {
            this.componentDidMount();
        }
    };

    cls.prototype.disconnectedCallback = function(): any {
        if (this.componentWillUnmount) {
            this.componentWillUnmount();
        }
        disconnectedCallback.call(this);
        if (this.componentDidUnmount) {
            this.componentDidUnmount();
        }
    };

    window.customElements.define(config.selector, cls);
};