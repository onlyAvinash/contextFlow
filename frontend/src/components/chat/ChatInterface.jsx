import { useMemo, useRef, useState, useEffect } from "react";
import { useTamboThread } from "@tambo-ai/react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { SuggestedQueries } from "./SuggestedQueries.jsx";
import { getDemoResponse } from "../../data/demoResponses.jsx";

function getTextParts(content) {
  if (typeof content === "string") {
    return [content];
  }
  if (Array.isArray(content)) {
    return content
      .filter((part) => part?.type === "text")
      .map((part) => part.text);
  }
  return [];
}

function isJsonLike(text) {
  const trimmed = text.trim();
  if (!trimmed) return false;
  return (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  );
}

function unescapeMarkdown(text) {
  return text.replace(/\\\*/g, "*").replace(/\\_/g, "_").replace(/\\`/g, "`");
}

const componentToSource = {
  DataTable: "GitHub",
  TimelineView: "GitHub",
  DocumentCard: "Notion",
  ActionForm: "Calendar",
  MetricCard: "Analytics",
};

export function ChatInterface() {
  const { thread, sendThreadMessage, isIdle } = useTamboThread();
  const [inputValue, setInputValue] = useState("");
  const [localMessages, setLocalMessages] = useState([]);
  const isPending = !isIdle;
  const scrollRef = useRef(null);
  const [loadingMessage, setLoadingMessage] = useState("Syncing workspace…");

  const messages = useMemo(() => {
    const remoteMessages = thread?.messages ?? [];
    const getTime = (msg) =>
      Date.parse(msg?.createdAt || msg?.created || msg?.timestamp || "") || 0;
    const normalizedRemote =
      remoteMessages.length > 1 && getTime(remoteMessages[0]) > getTime(remoteMessages[remoteMessages.length - 1])
        ? [...remoteMessages].reverse()
        : remoteMessages;
    return [...localMessages, ...normalizedRemote];
  }, [localMessages, thread]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isPending]);

  useEffect(() => {
    if (!isPending) return undefined;
    const statuses = ["Syncing workspace…", "Assembling UI…"];
    let index = 0;
    setLoadingMessage(statuses[index]);
    const timer = setInterval(() => {
      index = (index + 1) % statuses.length;
      setLoadingMessage(statuses[index]);
    }, 1200);
    return () => clearInterval(timer);
  }, [isPending]);

  useEffect(() => {
    const handler = (event) => {
      if (event?.detail) {
        setLoadingMessage(event.detail);
      }
    };
    window.addEventListener("tambo:tool-status", handler);
    return () => window.removeEventListener("tambo:tool-status", handler);
  }, []);

  const scrollToBottom = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const submitQuery = async (query) => {
    if (!query?.trim() || isPending) return;
    const trimmed = query.trim();
    const demoResponse = getDemoResponse(trimmed);

    if (demoResponse) {
      setLocalMessages((prev) => [
        ...prev,
        { id: `local-user-${Date.now()}`, role: "user", content: trimmed },
        {
          id: `local-assistant-${Date.now() + 1}`,
          role: "assistant",
          content: demoResponse.text,
          renderedComponents: demoResponse.components,
          componentNames: demoResponse.componentNames ?? [],
        },
      ]);
      setInputValue("");
      return;
    }

    await sendThreadMessage(trimmed, { streamResponse: true });
    setInputValue("");
    scrollToBottom();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitQuery(inputValue);
  };

  const handleSuggestion = (text, options = {}) => {
    setInputValue(text);
    if (options.autoSend) {
      submitQuery(text).then(scrollToBottom);
    }
  };

  const inputForm = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
      <input
        type="text"
        value={inputValue ?? ""}
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
        {isPending ? "Thinking…" : "Send"}
      </button>
    </form>
  );

  return (
    <div className="grid h-[calc(100vh-180px)] grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
      <section
        ref={scrollRef}
        className="flex-1 space-y-6 overflow-y-auto pr-2 pb-24 scrollbar-hidden"
      >
        {messages.length === 0 && (
          <section className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4">
            {inputForm}
          </section>
        )}
        {messages.map((message, index) => {
          const isUser = message.role === "user";
          const textParts = getTextParts(message.content)
            .map((part) => unescapeMarkdown(part).trim())
            .filter((part) => part.length > 0 && !isJsonLike(part));
          const renderedComponent = message.renderedComponent || null;
          const renderedComponents = message.renderedComponents || [];
          const allowedNames = new Set([
            "DataTable",
            "MetricCard",
            "TimelineView",
            "ActionForm",
            "DocumentCard",
          ]);
          const componentNames = Array.from(
            new Set(
              [
                ...(message.componentNames || []),
                renderedComponent?.type?.name,
                ...renderedComponents.map((component) => component?.type?.name),
              ]
                .filter(Boolean)
                .filter((name) => allowedNames.has(name))
            )
          );
          const sourceChips = Array.from(
            new Set(
              componentNames
                .map((name) => componentToSource[name])
                .filter(Boolean)
            )
          );
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
                  <div className="max-w-[70%] whitespace-pre-wrap break-words rounded-2xl bg-accent-primary px-4 py-2 text-sm font-semibold text-bg-primary">
                    {textParts[0] || message.content}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4 hover:shadow-glow transition-shadow">
                  {textParts.length > 0 && (
                    <div className="mb-3 rounded-xl border border-white/5 bg-bg-tertiary/40 px-3 py-3 text-sm text-text-secondary">
                      <ReactMarkdown className="prose prose-invert max-w-none text-sm text-text-secondary">
                        {textParts[0]}
                      </ReactMarkdown>
                    </div>
                  )}
                  {sourceChips.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      {sourceChips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/10 bg-bg-tertiary/60 px-2 py-1"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                  {componentNames.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      <span className="rounded-full border border-white/10 px-2 py-1">
                        Rendered: {componentNames.join(", ")}
                      </span>
                    </div>
                  )}
                  {textParts.slice(1).map((part, idx) => (
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
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                        >
                          {component}
                        </motion.div>
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
            {loadingMessage}
          </div>
        )}
        {messages.length === 0 && (
          <SuggestedQueries onSelect={handleSuggestion} />
        )}
      </section>

      <aside className="hidden h-full flex-col gap-4 lg:flex">
        <section className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4">
          <h3 className="text-xs uppercase tracking-[0.25em] text-text-muted">
            Active Sources
          </h3>
          <div className="mt-3 space-y-2">
            {["GitHub", "Slack", "Drive", "Notion", "Calendar"].map(
              (source) => (
                <div
                  key={source}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-bg-tertiary/50 px-3 py-2 text-xs text-text-secondary"
                >
                  <span>{source}</span>
                  <span className="h-2 w-2 rounded-full bg-success" />
                </div>
              )
            )}
          </div>
        </section>
        <section className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4">
          <h3 className="text-xs uppercase tracking-[0.25em] text-text-muted">
            Key Entities
          </h3>
          <div className="mt-3 space-y-2">
            {[
              { name: "Michael Magán", role: "Co-founder and CEO" },
              { name: "Michael Milstead", role: "Co-founder" },
              { name: "Akhilesh Rangani", role: "Founding Engineer" },
            ].map((person) => (
              <div
                key={person.name}
                className="rounded-xl border border-white/10 bg-bg-tertiary/50 px-3 py-2 text-xs text-text-secondary"
              >
                <div className="font-semibold text-text-primary">
                  {person.name}
                </div>
                <div className="text-[11px] text-text-muted">{person.role}</div>
              </div>
            ))}
          </div>
        </section>
        {messages.length > 0 && (
          <section className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-3">
            <h3 className="text-xs uppercase tracking-[0.25em] text-text-muted">
              Try asking
            </h3>
            <div className="mt-2">
              <SuggestedQueries onSelect={handleSuggestion} variant="compact" />
            </div>
          </section>
        )}
      </aside>
      {messages.length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-bg-secondary/60 p-4 sticky bottom-8 z-10 lg:col-span-1">
          {inputForm}
          <p className="mt-2 text-[11px] text-text-muted">
            Press Enter to send • Shift+Enter for a new line
          </p>
        </section>
      )}
    </div>
  );
}
