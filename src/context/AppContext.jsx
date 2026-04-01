import { createContext, useContext, useReducer, useCallback } from "react";
import { transactions as initialTransactions } from "../data/mockData";

const AppContext = createContext(null);

const initialState = {
  role: "admin",
  transactions: initialTransactions,
  filters: {
    search: "",
    category: "All",
    type: "all",
    sortBy: "date",
    sortOrder: "desc",
  },
  activeTab: 0,
  darkMode: false,
  nextId: initialTransactions.length + 1,
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };

    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };

    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: initialState.filters,
      };

    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [
          { ...action.payload, id: state.nextId },
          ...state.transactions,
        ],
        nextId: state.nextId + 1,
      };

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setRole = useCallback((role) => dispatch({ type: "SET_ROLE", payload: role }), []);
  const setActiveTab = useCallback((tab) => dispatch({ type: "SET_ACTIVE_TAB", payload: tab }), []);
  const toggleDarkMode = useCallback(() => dispatch({ type: "TOGGLE_DARK_MODE" }), []);
  const setFilter = useCallback((key, value) => dispatch({ type: "SET_FILTER", key, value }), []);
  const resetFilters = useCallback(() => dispatch({ type: "RESET_FILTERS" }), []);
  const addTransaction = useCallback((t) => dispatch({ type: "ADD_TRANSACTION", payload: t }), []);
  const editTransaction = useCallback((t) => dispatch({ type: "EDIT_TRANSACTION", payload: t }), []);
  const deleteTransaction = useCallback((id) => dispatch({ type: "DELETE_TRANSACTION", payload: id }), []);

  const value = {
    ...state,
    setRole,
    setActiveTab,
    toggleDarkMode,
    setFilter,
    resetFilters,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
