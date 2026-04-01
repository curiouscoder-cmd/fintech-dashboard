import { Moon, Sun, Bell, Shield, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

export function Header() {
  const { role, setRole, darkMode, toggleDarkMode } = useApp();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between rounded-[32px] border border-white/60 bg-white/40 px-6 py-4 backdrop-blur-xl shadow-sm dark:border-white/10 dark:bg-slate-900/40"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Dashboard
        </h1>
        <div className="flex items-center gap-2 rounded-full bg-white/50 px-3 py-1.5 text-sm text-slate-500 border border-white/50 shadow-inner dark:bg-slate-800/50 dark:border-white/10 dark:text-slate-400">
          <Shield className="h-4 w-4 text-indigo-500" />
          <span className="font-medium pr-2">Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent border-none outline-none font-bold text-slate-700 cursor-pointer appearance-none pr-4 bg-no-repeat bg-right dark:text-slate-200"
            style={{
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundSize: "0.65em auto",
            }}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="relative rounded-full bg-white p-2.5 shadow-sm hover:scale-105 transition-transform dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="relative rounded-full bg-white p-2.5 shadow-sm hover:scale-105 transition-transform dark:bg-slate-800">
          <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border border-white dark:border-slate-800" />
        </button>
        <div className="flex items-center gap-3 rounded-full bg-white pl-1 pr-4 py-1 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-white/10">
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=e0e7ff"
            className="h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700"
            alt="User avatar"
          />
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-none dark:text-slate-200">Alex D.</p>
            <p className="text-xs text-slate-400 capitalize">{role}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
