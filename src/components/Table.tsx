import Robot, { RobotPosititon } from "./Robot";

type Props = {
  layout: {
    rows: number;
    cols: number;
  },
  robotPosition: RobotPosititon;
}

export default function Table({ layout: { rows, cols }, robotPosition }: Props) {
  return (
    <section className="place-self-center rounded-lg p-2 border border-dashed border-gray-600 space-y-1 relative">
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
