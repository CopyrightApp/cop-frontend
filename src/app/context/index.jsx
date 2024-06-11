"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import i18n from "../i18n";

const Context = createContext();

export function AppWrapper({ children }) {
  const [language, setLanguage] = useState("");
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } 
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <Context.Provider value={{ language, setLanguage, suggestion, setSuggestion }}>
      {children}
    </Context.Provider>
  );
};

export function useAppContext() {
    return useContext(Context);
}
