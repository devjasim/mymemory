import { Container } from "@mui/material";
import React from "react";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
      </Switch>
    </Container>
  );
};
export default App;
