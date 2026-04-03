import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Overview } from "./Overview";
import { Transactions } from "./Transactions";
import { Insights } from "./Insights";
import { MobileNav } from "./MobileNav";
import { useApp } from "../context/AppContext";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.25,
  ease: "easeInOut",
};

function TabContent({ activeTab }) {
  switch (activeTab) {
    case 0:
      return <Overview />;
    case 1:
      return <Transactions />;
    case 2:
      return <Insights />;
    default:
      return <Overview />;
  }
}

export function Dashboard() {
  const { activeTab, darkMode } = useApp();
  useKeyboardShortcuts();

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

          <div className="flex-1 overflow-y-auto rounded-[32px] pr-2 pb-20 md:pb-2 scrollbar-hide">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={pageTransition}
              >
                <TabContent activeTab={activeTab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
