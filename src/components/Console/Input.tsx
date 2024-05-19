import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

type Props = {
  onCommandSend: (value: string) => void;
}

export default function Input({ onCommandSend }: Props) {
  const [commandInput, setCommandInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommandInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCommandInput(e.currentTarget.value);
  }

  const handleSendCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value == "") return;

    if (e.key === "Enter") {
      onCommandSend(e.currentTarget.value.trimStart());
      setCommandInput("");
    }
  }

  return (
    <div className="w-full flex gap-1 items-center px-2 border-t border-gray-600">
      <p>{">"}</p>
      <input
        ref={inputRef}
        type="text"
        name="command"
        className="w-full h-full border-none outline-none p-2 pl-0 text-white bg-transparent"
        onKeyDown={handleSendCommand}
        onChange={handleCommandInput}
        value={commandInput}
      />
    </div>
  )
}
