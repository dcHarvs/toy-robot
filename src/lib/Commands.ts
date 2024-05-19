import { RobotPosititon } from "../components/Robot";
import { Direction } from "./types/direction";

type CommandResultType = {
  newPosition?: RobotPosititon;
  error?: string;
}

const validDirections = new Set<Direction>(["NORTH", "SOUTH", "EAST", "WEST"]);

export class Commands {
  private tableSize: { rows: number; cols: number; }

  constructor({ rows, cols }: { rows: number; cols: number; }) {
    this.tableSize = { rows, cols };
  }

  private isOutOfBounds({ x, y }: RobotPosititon): boolean {
    return x < 0 || x > this.tableSize.rows || y < 0 || y > this.tableSize.rows
  }

  private isValidDirection(direction: string): boolean {
    return validDirections.has(direction as Direction);
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
      return { x, y, direction }
    }

    return { newPosition };
  }

  private rotate(position: RobotPosititon, newDirection: "left" | "right") {
    const newPosition = { ...position };

    switch (position.direction) {
      case "NORTH":
        newPosition.direction = (newDirection === "left" ? "WEST" : "EAST") as Direction
        break;
      case "SOUTH":
        newPosition.direction = (newDirection === "left" ? "EAST" : "WEST") as Direction
        break;
      case "WEST":
        newPosition.direction = (newDirection === "left" ? "SOUTH" : "NORTH") as Direction
        break;
      case "EAST":
        newPosition.direction = (newDirection === "left" ? "NORTH" : "SOUTH") as Direction
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
      error: "Direction given is invalid"
    }

    const newPosition = {
      x: parseInt(x),
      y: parseInt(y),
      direction: direction as Direction,
    }

    if (this.isOutOfBounds(newPosition as RobotPosititon)) {
      return { error: "New location is out of bounds" }
    }

    return { newPosition }
  }

  processCommand(input: string, prevPosition: RobotPosititon): CommandResultType {
    const [command, ...params] = input.split(/[, ,]+/);
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
      default:
        result = { error: "Unknown command" }
    }

    return result;
  }
}