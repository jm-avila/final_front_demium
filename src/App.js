import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Static Components
import Header from "./components/layout/Header";
import NotFound from "./components/pages/NotFound";

// TEAM Components
import TeamsCards from "./components/teams/TeamsCards";
import AddTeamCard from "./components/teams/AddTeamCard";
import EditTeamCard from "./components/teams/EditTeamCard";

// IDEA Components
import IdeasCards from "./components/ideas/IdeasCards";
import AddIdeaCard from "./components/ideas/AddIdeaCard";
import EditIdeaCard from "./components/ideas/EditIdeaCard";

// CITIES Components
import CitiesCards from "./components/cities/CitiesCards";
import AddCityCard from "./components/cities/AddCityCard";
import EditCityCard from "./components/cities/EditCityCard";

// USER Components
import UsersCards from "./components/users/UsersCards";
import AddUserCard from "./components/users/AddUserCard";
import EditUserCard from "./components/users/EditUserCard";

// LOGIN Component
import MainPage from "./components/login/mainPage";
import LoginCard from "./components/login/login";
import CreateAccountCard from "./components/login/createAccount";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={MainPage} />

                <Route exact path='/login' component={LoginCard} />
                <Route exact path='/register' component={CreateAccountCard} />

                <Route exact path='/teams' component={TeamsCards} />
                <Route exact path='/teams/add' component={AddTeamCard} />
                <Route exact path='/teams/edit/:id' component={EditTeamCard} />

                <Route exact path='/ideas' component={IdeasCards} />
                <Route exact path='/ideas/add' component={AddIdeaCard} />
                <Route exact path='/ideas/edit/:id' component={EditIdeaCard} />

                <Route exact path='/cities' component={CitiesCards} />
                <Route exact path='/cities/add' component={AddCityCard} />
                <Route exact path='/cities/edit/:id' component={EditCityCard} />

                <Route exact path='/users' component={UsersCards} />
                <Route exact path='/users/add' component={AddUserCard} />
                <Route exact path='/users/edit/:id' component={EditUserCard} />

                <Route path='*' component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
