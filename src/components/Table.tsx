import { useRootProvider } from "../lib/useRootContext";
import Robot from "./Robot";

type Props = {
  layout: {
    rows: number;
    cols: number;
  },
}

export default function Table({ layout: { rows, cols },  }: Props) {
  const { robotPosition } = useRootProvider();

  return (
    <section className="place-self-center rounded-lg p-2 border border-dashed border-gray-600 relative flex flex-col gap-1">
      {Array.from(new Array(rows)).map((_, key) => {
        return (
          <div
            key={key}
            className="flex gap-1"
          >
            {Array.from(new Array(cols)).map((_, key) => {
              return (
                <div
                  key={key}
                  className="size-20 rounded-lg border border-gray-600 border-dashed"
                >
                </div>
              )
            })}
          </div>
        )
      })}

      <Robot position={robotPosition} />
    </section>
  )
}
