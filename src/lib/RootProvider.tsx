import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { RobotPosititon } from "../components/Robot";

export type History = {
  text: string;
  isError?: boolean;
}

export type RootContextType = {
  history?: History[];
  setHistory: Dispatch<SetStateAction<History[] | undefined>>;
  robotPosition: RobotPosititon;
  setRobotPosition: Dispatch<SetStateAction<RobotPosititon>>;
}

export const RootContext = createContext<RootContextType | null>(null);

export function RootProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<History[]>();
  const [robotPosition, setRobotPosition] = useState<RobotPosititon>({
    x: 0,
    y: 0,
    direction: "EAST",
  });

  return (
    <RootContext.Provider value={{ history, setHistory, robotPosition, setRobotPosition }}>
      {children}
    </RootContext.Provider>
  )
}