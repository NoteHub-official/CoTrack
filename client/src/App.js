import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/ui/Header";
import theme from "./components/ui/Theme.js";
import GiveEvaluationPage from "./components/GiveEvaluation/GiveEvaluationPage";

const MyEvaluation = () => <div>My evaluation</div>;
const LandingPage = () => <div>Landing Page</div>;
function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/give" element={<GiveEvaluationPage />} />
          <Route path="/me" element={<MyEvaluation />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
