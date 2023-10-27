import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export const useMarkdownToHTML = (markdown) => {
  const [renderedContent, setRenderedContent] = useState([]);

  useEffect(() => {
    const lines = markdown.split('\n');
    let result = [];
    let text = '';
    let html = <></>;
    let listItems = null;
    let moreListItems = false;
    let doNotPushToResult = false;

    lines.forEach(line => {

      // ******************************** LIST HANDLING ********************************

      moreListItems = (line.startsWith('- ')) ? true : false;

      if (moreListItems && listItems === null) {
        listItems = [];

      // no more list items to be added, and there's a few items in the list
      // we now push em and make them into an <ul>
      } else if (!moreListItems && listItems !== null) {
        // push ul into result
        const unorderedList = <ul className="list-disc">{listItems}</ul>;

        result.push(unorderedList);
        listItems = null;
      } 

      // ******************************** LIST HANDLING ********************************

      if (line.startsWith('# ')) {
        // heading 1
        text = line.replace('# ', '');
        html = <h1 className='font-custom text-black font-semibold text-3xl' key={nanoid()}>{text}</h1>
      } else if (line.startsWith('## ')) {
        // heading 2
        text = line.replace('## ', '');
        html = <h2 className='font-custom text-black font-semibold text-2xl' key={nanoid()}>{text}</h2>;
      } else if (line.startsWith('### ')) {
        // heading 3
        text = line.replace('### ', '');
        html = <h3 className='font-custom text-black font-semibold text-xl' key={nanoid()}>{text}</h3>
      } else if (/\*\*([^*]+)\*\*/.test(line)) {
        // bold text
        text = line.replace(/\*\*(.*?)\*\*/g, '<strong className="font-normal">$1</strong>');
        html = <p className='font-custom text-black font-extralight text-base' key={nanoid()} dangerouslySetInnerHTML={{ __html: text }}></p>
      } else if (/\*([^*]+)\*/.test(line)) {
        // italic text
        text = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = <p className='font-custom text-black font-extralight text-base' key={nanoid()} dangerouslySetInnerHTML={{ __html: text }}></p>
      } else if (line.length === 0) {
        html = <br />
      } else if (line.startsWith('- ')) {

        text = line.replace('- ', '');
        html = <li className='font-custom text-black font-extralight text-base' key={nanoid()}>{text}</li>
        listItems.push(html);

        // we push to listItems not result
        doNotPushToResult = true;

      } else {
        html = <p className='font-custom text-black font-extralight text-base' key={nanoid()}>{line}</p>;
      }
        
      if (doNotPushToResult) {
        doNotPushToResult = false;
      } else {
        result.push(html);
      }
    })

    setRenderedContent(result);

  }, [markdown]);

  return renderedContent;
}