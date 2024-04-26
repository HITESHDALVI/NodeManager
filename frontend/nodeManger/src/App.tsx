import "./App.css";
import { Body, Header, LandingPage } from "./components";
import { NoteProvider } from "./utilis/context/Context";

function App() {
  return (
    <NoteProvider>
      <Header />
      <LandingPage />
    </NoteProvider>
  );
}

export default App;
