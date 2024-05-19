type Props = {
  data: string[];
}

export default function History({ data }: Props) {
  return (
    <ul className="flex-1 overflow-y-auto w-full flex flex-col-reverse p-2">
      {data.map((command, index) => {
        return <li
          key={index}
          className="py-1 text-gray-400"
        >
          {command}
        </li>
      })}
    </ul>
  )
}
