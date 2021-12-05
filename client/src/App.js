import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/ui/Header";
import theme from "./components/ui/Theme.js";
import GiveEvaluationPage from "./components/GiveEvaluation/GiveEvaluationPage";
import LandingPage from "./components/ui/LandingPage";
import MyEvaluationPage from "./components/MyEvaluation/MyEvaluationPage";

function App() {
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/give" element={<GiveEvaluationPage />} />
          <Route path="/me" element={<MyEvaluationPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
