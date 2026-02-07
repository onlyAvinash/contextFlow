import { useMemo, useRef, useState, useEffect } from 'react';
import { useTamboThread } from '@tambo-ai/react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { SuggestedQueries } from './SuggestedQueries.jsx';
import { getDemoResponse } from '../../data/demoResponses.jsx';

function getTextParts(content) {
  if (typeof content === 'string') {
    return [content];
  }
  if (Array.isArray(content)) {
    return content
      .filter((part) => part?.type === 'text')
      .map((part) => part.text);
  }
  return [];
}

function isJsonLike(text) {
  const trimmed = text.trim();
  if (!trimmed) return false;
  return (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  );
}

export function ChatInterface() {
  const { thread, sendThreadMessage, isIdle } = useTamboThread();
  const [inputValue, setInputValue] = useState('');
  const [localMessages, setLocalMessages] = useState([]);
  const isPending = !isIdle;
  const scrollRef = useRef(null);

  const messages = useMemo(() => {
    const remoteMessages = thread?.messages ?? [];
    return [...localMessages, ...remoteMessages];
  }, [localMessages, thread]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isPending]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue?.trim() || isPending) return;
    const trimmed = inputValue.trim();
    const demoResponse = getDemoResponse(trimmed);

    if (demoResponse) {
      setLocalMessages((prev) => [
        ...prev,
        { id: `local-user-${Date.now()}`, role: 'user', content: trimmed },
        {
          id: `local-assistant-${Date.now() + 1}`,
          role: 'assistant',
          content: demoResponse.text,
          renderedComponents: demoResponse.components
        }
      ]);
      setInputValue('');
      return;
    }

    await sendThreadMessage(trimmed, { streamResponse: true });
    setInputValue('');
  };

  const handleSuggestion = (text) => {
    setInputValue(text);
  };

  return (
    <div className="flex h-[calc(100vh-180px)] flex-col gap-6">
      <section
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-hidden"
      >
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const textParts = getTextParts(message.content)
            .map((part) => part.trim())
            .filter((part) => part.length > 0 && !isJsonLike(part));
          const renderedComponent = message.renderedComponent || null;
          const renderedComponents = message.renderedComponents || [];
          const hasContent =
            textParts.length > 0 ||
            Boolean(renderedComponent) ||
            renderedComponents.length > 0;

          if (!isUser && !hasContent) {
            return null;
          }

          return (
            <motion.div
              key={message.id ?? index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-3"
            >
              {isUser ? (
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-2xl bg-accent-primary px-4 py-2 text-sm font-semibold text-bg-primary">
                    {textParts[0] || message.content}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4">
                  {textParts.map((part, idx) => (
                    <ReactMarkdown
                      key={idx}
                      className="prose prose-invert max-w-none text-sm text-text-secondary"
                    >
                      {part}
                    </ReactMarkdown>
                  ))}

                  {renderedComponent && (
                    <div className="mt-4">{renderedComponent}</div>
                  )}

                  {renderedComponents.length > 0 && (
                    <div className="mt-4 grid gap-4">
                      {renderedComponents.map((component, idx) => (
                        <div key={idx}>{component}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}

        {isPending && (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="flex h-2 w-2 animate-bounce rounded-full bg-accent-primary" />
            <span className="flex h-2 w-2 animate-bounce rounded-full bg-accent-primary [animation-delay:120ms]" />
            <span className="flex h-2 w-2 animate-bounce rounded-full bg-accent-primary [animation-delay:240ms]" />
            ContextFlow is thinking…
          </div>
        )}
        {messages.length === 0 && <SuggestedQueries onSelect={handleSuggestion} />}
      </section>

      <section className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={inputValue ?? ''}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Ask me anything about your workspace..."
            className="flex-1 rounded-xl border border-white/10 bg-white/95 px-4 py-3 text-sm text-bg-primary placeholder:text-slate-500 focus:border-accent-primary/60 focus:outline-none"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-accent-primary px-6 py-3 text-sm font-semibold text-bg-primary transition hover:bg-accent-hover disabled:opacity-60"
          >
            {isPending ? 'Thinking…' : 'Send'}
          </button>
        </form>
      </section>
    </div>
  );
}
