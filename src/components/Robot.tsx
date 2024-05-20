import { Direction } from "../lib/types/direction";
import robotSVG from "../assets/robot.svg";

export type RobotPosititon = {
  x: number;
  y: number;
  direction: Direction;
}

type Props = {
  position: RobotPosititon;
}

export default function Robot({ position: { x, y, direction } }: Props) {
  const rotateDegrees = {
    "EAST": "rotate-0",
    "SOUTH": "rotate-90",
    "WEST": "rotate-180",
    "NORTH": "rotate-[270deg]",
  }

  return (
    <img
      src={robotSVG}
      alt="robot"
      className={`absolute size-10 transition-all -translate-x-1/2 -translate-y-1/2 ${rotateDegrees[direction]}`}
      style={{
        top: 48 + (84 * x),
        left: 48 + (84 * y),
      }}
    >
    </img>
  )
}
