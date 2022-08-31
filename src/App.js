import Game from "./components/Game"

const App = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Game />
    </div>
  )
}

export default App