import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Overview } from "./Overview";
import { useApp } from "../context/AppContext";

export function Dashboard() {
  const { activeTab, darkMode } = useApp();

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen font-sans text-slate-800 transition-colors duration-500 selection:bg-indigo-100 selection:text-indigo-900 dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-indigo-900">
      <div className="mesh-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="flex h-screen w-full overflow-hidden p-4 md:p-6 gap-6 relative z-10">
        <Sidebar />

        <main className="flex-1 flex flex-col gap-6 relative min-w-0">
          <Header />

          <div className="flex-1 overflow-y-auto rounded-[32px] pr-2 pb-2 scrollbar-hide">
            {activeTab === 0 && <Overview />}
            {activeTab === 1 && (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-2xl font-bold opacity-50">Transactions Coming Soon</h2>
              </div>
            )}
            {activeTab === 2 && (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-2xl font-bold opacity-50">Insights Coming Soon</h2>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
