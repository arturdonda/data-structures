import { GenericTreeNode } from './generic-tree-node';

export class HtmlElement extends GenericTreeNode<HtmlElement.Data> {
	constructor(params: HtmlElement.ConstructorParams) {
		super({
			tag: params.tag,
			attributes: params.attributes ?? {},
			content: params.content,
		});
	}

	render(): string {
		return HtmlElement.render(this);
	}

	static render(htmlElement: HtmlElement, identationLevel: number = 0): string {
		const identation = ' '.repeat(identationLevel * 2);

		const attributes = Object.entries(htmlElement.data.attributes).map(([key, value]) => `${key}="${value}"`);
		const singleTag = attributes.length ? `<${htmlElement.data.tag} ${attributes.join(' ')}/>` : `<${htmlElement.data.tag}/>`;
		const openTag = attributes.length ? `<${htmlElement.data.tag} ${attributes.join(' ')}>` : `<${htmlElement.data.tag}>`;
		const closeTag = `</${htmlElement.data.tag}>`;
		const content = htmlElement.data.content;

		const childrenHtml = htmlElement.children.map(child => HtmlElement.render(child as HtmlElement, identationLevel + 1));

		if (content) return `${identation}${openTag}${content}${closeTag}`;

		if (childrenHtml.length === 0) return `${identation}${singleTag}`;

		return `${identation}${openTag}\n${childrenHtml.join('\n')}\n${identation}${closeTag}`;
	}
}

export namespace HtmlElement {
	export type Data = {
		tag: string;
		attributes: Record<string, string>;
		content?: string;
	};

	export type ConstructorParams = Pick<Data, 'tag'> & Partial<Data>;
}
