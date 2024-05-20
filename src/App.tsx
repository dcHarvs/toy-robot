import Console from "./components/Console";
import Table from "./components/Table";
import { TABLE_SIZE } from "./lib/constants/tableSize";
import { RootProvider } from "./lib/RootProvider";

function App() {

  return (
    <RootProvider>
      <main className="h-full w-full flex flex-col gap-2 p-2 items-center">
        <section className="w-full max-w-screen-lg p-2 space-y-2">
          <p className="text-4xl">Toy Robot</p>
          <p>Use these commands to make the toy robot maneuver across the table.</p>
          <ul className="indent-4">
            <li>PLACE X,Y,F - will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. {"The origin (0,0) can be considered to be the SOUTH WEST most corner"}</li>
            <li>MOVE - will move the toy robot one unit forward in the direction it is currently facing</li>
            <li>LEFT - will rotate the robot -90 degrees in the specified direction without changing the position of the robot</li>
            <li>RIGHT - will rotate the robot 90 degrees in the specified direction without changing the position of the robot</li>
            <li>REPORT - will announce the X,Y and F of the robot</li>
          </ul>
        </section>
        <section className="w-full max-w-screen-lg flex gap-2">
          <Console />
          <Table layout={TABLE_SIZE} />
        </section>
      </main>
    </RootProvider>
  )
}

export default App
