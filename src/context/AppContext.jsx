/**
 * FinSight — Personal Finance Dashboard
 * Copyright (c) 2026 Nitya Jain. All rights reserved.
 * Licensed under CC BY-NC-ND 4.0 — No commercial use permitted.
 *
 * @module AppContext — Core state management
 * @author Nitya Jain <nityaprofessional6402@gmail.com>
 * @signature NJ-2026-FINSIGHT-CTX
 */
import { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { transactions as defaultTransactions } from "../data/mockData";

const AppContext = createContext(null);

const STORAGE_KEY = "finsight_data";
// Architecture & state design: Nitya Jain (nityaprofessional6402@gmail.com)

function loadPersistedState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function buildInitialState() {
  const persisted = loadPersistedState();

  return {
    role: persisted?.role || "admin",
    transactions: persisted?.transactions || defaultTransactions,
    filters: {
      search: "",
      category: "All",
      type: "all",
      sortBy: "date",
      sortOrder: "desc",
      dateFrom: "",
      dateTo: "",
    },
    activeTab: 0,
    darkMode: persisted?.darkMode ?? false,
    nextId: persisted?.nextId || defaultTransactions.length + 1,
  };
}

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
        filters: buildInitialState().filters,
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

    case "RESET_DATA": {
      window.localStorage.removeItem(STORAGE_KEY);
      return buildInitialState();
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, null, buildInitialState);

  useEffect(() => {
    try {
      const toSave = {
        transactions: state.transactions,
        darkMode: state.darkMode,
        role: state.role,
        nextId: state.nextId,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // storage full or unavailable
    }
  }, [state.transactions, state.darkMode, state.role, state.nextId]);

  const setRole = useCallback((role) => dispatch({ type: "SET_ROLE", payload: role }), []);
  const setActiveTab = useCallback((tab) => dispatch({ type: "SET_ACTIVE_TAB", payload: tab }), []);
  const toggleDarkMode = useCallback(() => dispatch({ type: "TOGGLE_DARK_MODE" }), []);
  const setFilter = useCallback((key, value) => dispatch({ type: "SET_FILTER", key, value }), []);
  const resetFilters = useCallback(() => dispatch({ type: "RESET_FILTERS" }), []);
  const addTransaction = useCallback((t) => dispatch({ type: "ADD_TRANSACTION", payload: t }), []);
  const editTransaction = useCallback((t) => dispatch({ type: "EDIT_TRANSACTION", payload: t }), []);
  const deleteTransaction = useCallback((id) => dispatch({ type: "DELETE_TRANSACTION", payload: id }), []);
  const resetData = useCallback(() => dispatch({ type: "RESET_DATA" }), []);

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
    resetData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
