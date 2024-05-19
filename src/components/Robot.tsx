import { Direction } from "../lib/types/direction";

export type RobotPosititon = {
  x: number;
  y: number;
  direction: Direction;
}

type Props = {
  position: RobotPosititon;
}

export default function Robot({ position: { x, y } }: Props) {
  return (
    <div
      className="absolute size-10 rounded-full bg-gray-400"
      style={{
        top: 45 + (80 * x),
        left: 48 + (80 * y),
        transform: "translate(-50%, -50%)"
      }}
    >

    </div>
  )
}
