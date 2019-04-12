import React, { Component } from "react";
import Header from "./components/Header";
import MainCanvas from "./components/MainCanvas";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainCanvas />
      </div>
    );
  }
}

export default App;
