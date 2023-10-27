import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export const useMarkdownToHTML = (markdown) => {
  const [renderedContent, setRenderedContent] = useState([]);

  // Check if a line consists of only white spaces
  const isWhiteSpace = (line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ' ' && line[i] !== '\t' && line[i] !== '\n' && line[i] !== '\r') {
        return false; // The line contains a non-white space character
      }
    }
    return true; // The line consists of only white spaces
  }

  // Future plan: modify the code so that it accepts multiple markdown syntaxs in a single line
  // Future plan: make a functional component for each rendered content (e.g., Heading1, Heading2, CommandLinePrompt, Bold, List, etc.,)
  useEffect(() => {

    const lines = markdown.split('\n');
    let result = [];
    let text = '';
    let html = <></>;

    // for list handling
    let listItems = null;
    let moreListItems = false;

    // for command line handling
    let commandItems = null;
    let moreCommandItems = false;

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
        const unorderedList = <ul>{ listItems }</ul>;
        result.push(unorderedList);
        listItems = null;
      } 
      // ******************************** LIST HANDLING ********************************

      
      // ******************************** COMMAND LINE HANDLING ************************
      if (line.startsWith('```')) {
        // toggle moreCommandItems (first ``` -> start reading command line elements, second ``` -> done reading command line elements)
        moreCommandItems = !moreCommandItems;
      }

      // read the first ```, start reading all the command line texts
      if (moreCommandItems && commandItems === null) {
        commandItems = [];
        doNotPushToResult = true;

      // read the second ```, done reading all the code texts
      } else if (!moreCommandItems && commandItems !== null) {
        html = 
          <div className='bg-[#e9e9e9] px-2 py-1 rounded-lg border-2 border-[#c0c0c0]'>
            { commandItems }
          </div>;
        result.push(html);
        doNotPushToResult = true;
        // reset commandItems list to null
        commandItems = null;

      // continue reading the command line texts
      } else if (moreCommandItems && commandItems !== null) {
        html = isWhiteSpace(line) ? <br /> : <code key={nanoid()} className='block text-[#535353] font-normal text-sm'>{`$ ${line}`}</code>;
        commandItems?.push(html)
        doNotPushToResult = true; 
      }
      // ******************************** COMMAND LINE HANDLING ************************

      
      if (line.startsWith('# ')) {

        // heading 1
        text = line.replace('# ', '');
        html = <h1 className='font-custom text-black font-semibold text-3xl' key={nanoid()}>{ text }</h1>;

      } else if (line.startsWith('## ')) {

        // heading 2
        text = line.replace('## ', '');
        html = <h2 className='font-custom text-black font-semibold text-2xl' key={nanoid()}>{ text }</h2>;

      } else if (line.startsWith('### ')) {

        // heading 3
        text = line.replace('### ', '');
        html = <h3 className='font-custom text-black font-semibold text-xl' key={nanoid()}>{ text }</h3>;

      } else if (/\*\*([^*]+)\*\*/.test(line)) {

        // bold text
        text = line.replace(/\*\*(.*?)\*\*/g, '<strong className="font-normal">$1</strong>');
        html = <p className='font-custom text-black font-extralight text-base' key={nanoid()} dangerouslySetInnerHTML={{ __html: text }}></p>;

      } else if (/\*([^*]+)\*/.test(line)) {

        // italic text
        text = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = <p className='font-custom text-black font-extralight text-base' key={nanoid()} dangerouslySetInnerHTML={{ __html: text }}></p>;

      } else if (/\[.*\]\(.*\)/.test(line)) {

        // link text
        const parts = line.split(/\[([^\]]+)\]\(([^)]+)\)/g);
        html = <p className='font-custom text-black font-extralight text-base' key={nanoid()}>
          {
            parts.map((part, index) => {
              if (index % 3 == 0) {
                // regular text
                return part;
              } else if (index % 3 == 1) {
                // link text
                return <a 
                  key={index} 
                  href={parts[index + 1]} 
                  target='_blank' 
                  className='text-[#5087ff] underline'
                >{ part }</a>;
              }
            })
          }
        </p>;

      } else if (line.length === 0 || isWhiteSpace(line)) {

        // empty line
        html = <br />;

      } else if (line.startsWith('- ')) {

        // list elements
        text = line.replace('- ', '');
        html = <li className='font-custom text-black font-extralight text-base' key={nanoid()}>{ text }</li>;
        listItems.push(html);

        // we push to listItems not result
        doNotPushToResult = true;

      } else {

        // regular text
        html = <p className='font-custom text-black font-extralight text-base' key={nanoid()}>{ line }</p>;

      }
        
      if (doNotPushToResult) {

        doNotPushToResult = false;

      } else {

        result.push(html);

      }
    })

    setRenderedContent(result);

  }, [ markdown ]);

  return renderedContent;
}