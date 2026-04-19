import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function MarkdownViewer({ content }) {
  return (
    <div className="markdown-body" style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--color-text)' }}>
      <ReactMarkdown 
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
      <style>{`
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          color: var(--color-primary-dark);
        }
        .markdown-body ul, .markdown-body ol {
          padding-left: 2rem;
          margin-bottom: 1rem;
        }
        .markdown-body blockquote {
          border-left: 4px solid var(--color-primary-light);
          padding-left: 1rem;
          color: var(--color-text-muted);
          font-style: italic;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
