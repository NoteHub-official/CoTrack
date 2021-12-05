import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/ui/Header";
import theme from "./components/ui/Theme.js";
import GiveEvaluationPage from "./components/GiveEvaluation/GiveEvaluationPage";
import LandingPage from "./components/ui/LandingPage";
import MyEvaluationPage from "./components/MyEvaluation/MyEvaluationPage";
import CurrentUserContext from "./contexts/current-user/current-user.context";
import LoginPage from "./components/ui/LoginPage";

function App() {
  const [value, setValue] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <CurrentUserContext.Provider value={currentUser}>
        <BrowserRouter>
          <Header value={value} setValue={setValue} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/give" element={<GiveEvaluationPage />} />
            <Route path="/me" element={<MyEvaluationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
