import { useState } from "react";
import Console from "./components/Console";
import Table from "./components/Table";
import { TABLE_SIZE } from "./lib/constants/tableSize";
import { RobotPosititon } from "./components/Robot";

function App() {
  const [robotPosition, setRobotPosition] = useState<RobotPosititon>({
    x: 0,
    y: 0,
    direction: "EAST",
  });

  const handleCommandChange = (command: string) => {
    console.log(command);
  }

  return (
    <main className="h-full w-full flex flex-col gap-2 p-2">
      <Console onCommandSent={handleCommandChange} />
      <Table layout={TABLE_SIZE} robotPosition={robotPosition} />
    </main>
  )
}

export default App
