import { TamboProvider } from "@tambo-ai/react";
import { tamboComponents } from "./config/tambo-components.js";
import { tamboTools } from "./config/tambo-tools.js";
import { MainLayout } from "./components/layout/MainLayout.jsx";
import { ChatInterface } from "./components/chat/ChatInterface.jsx";

export default function App() {
  const tamboApiKey = import.meta.env.VITE_TAMBO_API_KEY;

  return (
    <div className="relative min-h-screen">
      <div className="starfield" />
      <TamboProvider
        apiKey={tamboApiKey}
        components={tamboComponents}
        tools={tamboTools}
      >
        <MainLayout>
          {!tamboApiKey && (
            <div className="mb-4 rounded-lg border border-warning/40 bg-bg-tertiary/60 px-4 py-3 text-sm text-text-secondary">
              Missing <span className="font-mono">VITE_TAMBO_API_KEY</span>.
              Add it to <span className="font-mono">frontend/.env</span> to
              enable live AI responses.
            </div>
          )}
          <ChatInterface />
        </MainLayout>
      </TamboProvider>
    </div>
  );
}
