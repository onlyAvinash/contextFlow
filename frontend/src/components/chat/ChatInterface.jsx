import { useMemo } from 'react';
import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';
import { motion } from 'framer-motion';
import { SuggestedQueries } from './SuggestedQueries.jsx';

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

export function ChatInterface() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  const messages = useMemo(() => thread?.messages ?? [], [thread]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim() || isPending) return;
    submit();
  };

  const handleSuggestion = (text) => {
    setValue(text);
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <section className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Ask me anything about your workspace..."
            className="flex-1 rounded-xl border border-white/10 bg-bg-tertiary/80 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary/60 focus:outline-none"
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

      {messages.length === 0 && <SuggestedQueries onSelect={handleSuggestion} />}

      <section className="space-y-6">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const textParts = getTextParts(message.content);
          const renderedComponent = message.renderedComponent || null;
          const renderedComponents = message.renderedComponents || [];

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
                    <p key={idx} className="text-sm text-text-secondary">
                      {part}
                    </p>
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
      </section>
    </div>
  );
}
