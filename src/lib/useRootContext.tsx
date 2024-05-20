import { useContext } from "react";
import { RootContext, RootContextType } from "./RootProvider";

export const useRootProvider = () => useContext(RootContext) as RootContextType;