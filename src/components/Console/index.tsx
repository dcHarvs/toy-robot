import Input from "./Input";
import History from "./History";
import { useRootProvider } from "../../lib/useRootContext";
import { Commands } from "../../lib/Commands";
import { TABLE_SIZE } from "../../lib/constants/tableSize";

const commands = new Commands(TABLE_SIZE);

export default function Console() {
  const { history = [], robotPosition, setHistory, setRobotPosition } = useRootProvider();

  const handleSendCommand = (newCommand: string) => {
    const { newPosition, error, report } = commands.processCommand(newCommand, robotPosition);

    if (error) {
      setHistory([{ text: error, isError: true }, ...history]);
      return;
    }

    if (report) {
      setHistory([{ text: report }, ...history]);
      return;
    }

    const newHistory = [{ text: newCommand }, ...history];
    setHistory(newHistory);

    if (newPosition) setRobotPosition(newPosition);
  }

  return (
    <section className="w-full max-w-screen-md h-1/3 place-self-center bg-gray-950 rounded-lg flex flex-col">
      <History data={history} />
      <Input onCommandSend={handleSendCommand} />
    </section>
  )
}
