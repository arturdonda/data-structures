import { HtmlElement } from '../classes';

export class HtmlElementFactory {
	static html(attributes: HtmlElement.ConstructorParams['attributes'] = {}) {
		return new HtmlElement({ tag: 'html', attributes });
	}

	static head(attributes: HtmlElement.ConstructorParams['attributes'] = {}) {
		return new HtmlElement({ tag: 'head', attributes });
	}

	static body(attributes: HtmlElement.ConstructorParams['attributes'] = {}) {
		return new HtmlElement({ tag: 'body', attributes });
	}

	static div(attributes: HtmlElement.ConstructorParams['attributes'] = {}) {
		return new HtmlElement({ tag: 'div', attributes });
	}

	static br(attributes: HtmlElement.ConstructorParams['attributes'] = {}) {
		return new HtmlElement({ tag: 'br', attributes });
	}

	static h1(content: string, attributes: HtmlElement.ConstructorParams['attributes'] = {}) {
		return new HtmlElement({ tag: 'h1', attributes, content });
	}

	static p(content: string, attributes: HtmlElement.ConstructorParams['attributes'] = {}) {
		return new HtmlElement({ tag: 'p', attributes, content });
	}
}
