import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

export const useMarkdownToHTML = (markdown) => {
  const [renderedContent, setRenderedContent] = useState([]);

  useEffect(() => {
    const lines = markdown.split('\n');
    let result = [];
    let text = '';
    let html = <></>;

    lines.forEach(line => {
      if (line.startsWith('# ')) {
        text = line.replace('# ', '');
        html = <h1 className='text-black font-bold text-lg' key={nanoid()}>{text}</h1>
      } else if (line.startsWith('## ')) {
        text = line.replace('## ', '');
        html = <h2 className='text-black font-bold text-md' key={nanoid()}>{text}</h2>;
      } else if (line.startsWith('### ')) {
        text = line.replace('### ', '');
        html = <h3 className='text-black font-bold text-sm' key={nanoid()}>{text}</h3>
      } else if (/\*\*([^*]+)\*\*/.test(line)) {
        text = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = <p className='text-black' key={nanoid()} dangerouslySetInnerHTML={{ __html: text }}></p>
      } else if (line.length === 0) {
        html = <br />
      } else {
        html = <p className='text-black' key={nanoid()}>{line}</p>;
      }
      result.push(html);
    })

    setRenderedContent(result);

  }, [markdown]);

  return renderedContent;
}