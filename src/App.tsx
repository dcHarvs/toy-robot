import Console from "./components/Console";
import Table from "./components/Table";
import { TABLE_SIZE } from "./lib/constants/tableSize";
import { RootProvider } from "./lib/RootProvider";

function App() {

  return (
    <RootProvider>
      <main className="h-full w-full flex flex-col gap-2 p-2">
        <Console />
        <Table layout={TABLE_SIZE} />
      </main>
    </RootProvider>
  )
}

export default App
