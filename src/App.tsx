import Console from "./components/Console";

function App() {
  const handleCommandChange = (command: string) => {
    console.log(command);
  }

  return (
    <main className="h-full w-full flex flex-col gap-2 p-2">
      <Console onCommandSent={handleCommandChange} />
    </main>
  )
}

export default App
