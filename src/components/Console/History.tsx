import type { History as HistoryType } from "../../lib/RootProvider";

type Props = {
  data: HistoryType[];
}

export default function History({ data }: Props) {
  return (
    <ul className="flex-1 overflow-y-auto w-full flex flex-col-reverse">
      {data.map(({ text, isError }, index) => {
        return <li
          key={index}
          className={`py-1 px-2 text-gray-400 ${isError ? "bg-red-600/30" : ""}`}
        >
          {isError && "Error: "}{text}
        </li>
      })}
    </ul>
  )
}
