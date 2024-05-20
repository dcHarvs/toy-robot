import { RobotPosititon } from "../components/Robot";
import { Direction } from "./types/direction";

type CommandResultType = {
  newPosition?: RobotPosititon;
  error?: string;
  report?: string;
}

const validDirections = new Set<Direction>(["NORTH", "SOUTH", "EAST", "WEST"]);

export class Commands {
  private tableSize: { rows: number; cols: number; }

  constructor({ rows, cols }: { rows: number; cols: number; }) {
    this.tableSize = { rows, cols };
  }

  private isOutOfBounds({ x, y }: RobotPosititon): boolean {
    return (x + 1) < 0 || (x + 1) > this.tableSize.rows || (y + 1) < 0 || (y + 1) > this.tableSize.cols
  }

  private isValidDirection(direction: string): boolean {
    return validDirections.has(direction.toUpperCase() as Direction);
  }

  private move({ x, y, direction }: RobotPosititon) {
    const newPosition = {
      direction,
      x: direction === "NORTH"
        ? x - 1
        : direction === "SOUTH"
        ? x + 1
        : x,
      y: direction === "WEST"
        ? y - 1
        : direction === "EAST"
        ? y + 1
        : y,
    };

    if (this.isOutOfBounds(newPosition)) {
      return { error: "Unable to move further" }
    }

    return { newPosition };
  }

  private rotate(position: RobotPosititon, newDirection: "left" | "right") {
    const newPosition = { ...position };

    switch (position.direction) {
      case "NORTH":
        newPosition.direction = (newDirection === "left" ? "WEST" : "EAST")
        break;
      case "SOUTH":
        newPosition.direction = (newDirection === "left" ? "EAST" : "WEST")
        break;
      case "WEST":
        newPosition.direction = (newDirection === "left" ? "SOUTH" : "NORTH")
        break;
      case "EAST":
        newPosition.direction = (newDirection === "left" ? "NORTH" : "SOUTH")
        break;
    }

    return { newPosition };
  }

  private place(params: string[]) {
    if (params.length < 3) return {
      error: "Insufficient paramaters given."
    }

    const [x, y, direction] = params;

    if (!this.isValidDirection(direction)) return {
      error: `Direction "${direction}" is invalid`
    }

    const newPosition = {
      x: parseInt(x),
      y: parseInt(y),
      direction: direction.toUpperCase() as Direction,
    }

    if (this.isOutOfBounds(newPosition as RobotPosititon)) {
      return { error: "New location is out of bounds" }
    }

    return { newPosition }
  }

  private report({ x, y, direction }: RobotPosititon) {
    return {
      report: `Current Position: ${x},${y},${direction}`,
    }
  }

  processCommand(input: string, prevPosition: RobotPosititon): CommandResultType {
    const [command, ...params] = (input.trimEnd()).split(/[, ,]+/);
    let result: CommandResultType = {};

    switch (command.toLowerCase()) {
      case "move":
        result = this.move(prevPosition);
        break;
      case "left":
        result = this.rotate(prevPosition, "left");
        break;
      case "right":
        result = this.rotate(prevPosition, "right");
        break;
      case "place": {
        result = this.place(params);
        break;
      }
      case "report":
        result = this.report(prevPosition);
        break;
      default:
        result = { error: `Unknown command "${command}"` }
    }

    return result;
  }
}