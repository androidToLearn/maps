import { createContext, useContext, useState } from "react";
import type { typeToSearch } from "../types/TypesAllProject";

export type typeSearchContext = {
    toSearch: typeToSearch;
    setToSearch: (value: typeToSearch) => void;
};
export const TypeSearch = createContext<typeSearchContext | null>(null);

export default function TypeSearchCompon({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toSearch, setToSearch] = useState<typeToSearch>({
        isToShowEmptyShchunot: false,
        orderToShowInAB: false,
        orderToShowInPrecentMax: false,
        showColors: { 'red': true, 'yellow': true, 'orange': true },
        worlds: '',
        distnace: 2
    });
    return (
        <TypeSearch.Provider value={{ toSearch, setToSearch }}>
            {children}
        </TypeSearch.Provider>
    );
}

export const useTypeSearchContext = () => {
    const context = useContext(TypeSearch);
    if (!context) {
        throw new Error("useTypeSearch must be used within PolygonProvider");
    }
    return context;
};
