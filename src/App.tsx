import React from "react";
import "./App.css";
import Terminal from "./components/Terminal";

const getYear = () => {
  return new Date().getFullYear();
};

const welcomeMessage = `
Welcome to my portfolio!
Type 'help' to view a list of available commands.
`;

const bannerCondensed =
"██████   █████  ██   ██     ████████  █████  ███    ██  ██████   ██████  ██████  \n" +
"██   ██ ██   ██  ██ ██         ██    ██   ██ ████   ██ ██       ██      ██    ██ \n" +
"██   ██ ███████   ███          ██    ███████ ██ ██  ██ ██   ███ ██      ██    ██ \n" +
"██   ██ ██   ██  ██ ██         ██    ██   ██ ██  ██ ██ ██    ██ ██      ██    ██ \n" +
"██████  ██   ██ ██   ██        ██    ██   ██ ██   ████  ██████   ██████  ██████  \n" +
  // "  \u00A9 " +
  getYear();
const prompt = ">";

function App() {
  return (
    <Terminal 
      welcomeMessage={welcomeMessage}
      banner={bannerCondensed}
      terminalPrompt={prompt}
    />
  );
}

export default App;
