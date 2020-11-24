import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/navbar/header.component";
import Login from "./pages/login/login.component";
import theme from "./theme/theme";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      shopName: "Toko Santoso",
      isSignIn: false,
      user: {
        name: "Rahmi Amiratus",
      },
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {this.state.isSignIn ? (
            <Header
              shopName={this.state.shopName}
              isSignIn={this.state.isSignIn}
              user={this.state.user}
            />
          ) : null}
          <switch>
            <Route exact path="/" component={() => <h1>Home</h1>} />
            <Route exact path="/login" component={Login} />
          </switch>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
