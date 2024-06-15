import { HtmlElementFactory } from './helpers';

const html = HtmlElementFactory.html();

const head = HtmlElementFactory.head();
const body = HtmlElementFactory.body();

const article = HtmlElementFactory.div({ class: 'article-div' });

const articleTitle = HtmlElementFactory.h1('Lorem ipsum');

// prettier-ignore
const articleParagraph1 = HtmlElementFactory.p('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
const articleParagraph2 = HtmlElementFactory.p('Varius morbi enim nunc faucibus. Nunc congue nisi vitae suscipit tellus');
const lineBreak = HtmlElementFactory.br();

html.addChild(head);
html.addChild(body);

body.addChild(article);

article.addChild(articleTitle);
article.addChild(articleParagraph1);
article.addChild(lineBreak);
article.addChild(articleParagraph2);

console.log(html.render());

// Output:
// <html>
//   <head/>
//   <body>
//     <div class="article-div">
//       <h1>Lorem ipsum</h1>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//       <br/>
//       <p>Varius morbi enim nunc faucibus. Nunc congue nisi vitae suscipit tellus</p>
//     </div>
//   </body>
// </html>
