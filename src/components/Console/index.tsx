import { useState } from "react"
import Input from "./Input";
import History from "./History";

type Props = {
  onCommandSent: (command: string) => void;
}

export default function Console({ onCommandSent, }: Props) {
  const [history, setHistory] = useState<string[]>([]);

  const handleSendCommand = (newCommand: string) => {
    const newHistory = [newCommand, ...history];
    setHistory(newHistory);
    onCommandSent(newCommand);
  }

  return (
    <section className="w-full max-w-screen-md h-1/3 place-self-center bg-gray-950 rounded-lg flex flex-col">
      <History data={history} />
      <Input onCommandSend={handleSendCommand} />
    </section>
  )
}
