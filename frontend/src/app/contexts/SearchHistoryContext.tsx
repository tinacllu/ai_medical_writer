import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SearchHistoryContext {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}

interface ContextProps {
  children: ReactNode;
}

const SearchHistoryContext = createContext({} as SearchHistoryContext);

export const useSearchHistoryContext = () => useContext(SearchHistoryContext);

export const SearchHistoryProvider = ({ children }: ContextProps) => {
  const [history, setHistory] = useState<string[]>([]);

  return (
    <SearchHistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
