import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import Header from "./components/navbar/header.component";
import theme from "./theme/theme";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      shopName: "Toko Santoso",
      isSignIn: true,
      user: {
        name: "Rahmi Amiratus",
      },
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header
            shopName={this.state.shopName}
            isSignIn={this.state.isSignIn}
            user={this.state.user}
          />
          <h1>Body</h1>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
