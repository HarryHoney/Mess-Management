import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Components/Header';
import LoginPage from '../Components/loginPage';
import CreateAccountPage from '../Components/createAccountPage';
import MainPage from '../Components/MainPage';
import ClerkPage from '../Components/ClerkPage';
import DataPage from '../Components/DataPage';
import NotFoundPage from '../Components/NotFoundPage';
import MessOffPage from '../Components/MessOffPage';
import ComplaintsPage from '../Components/ComplaintsPage';
import ComplaintsPageForS from '../Components/ComplaintsPageForS';
import '../store/configureStore';

const AppRouter = () => (
    
    <div>
        <Header />
        <BrowserRouter>
            <Switch>
                <Route path='/' component={LoginPage} exact={true} />
                <Route path='/createAccount' component={CreateAccountPage} exact={true} />
                <Route path='/mainPage/:id' component={MainPage} exact={true} />
                <Route path='/dataPage' component={DataPage} exact={true} />
                <Route path='/clerkPage' component={ClerkPage} exact={true} />
                <Route path='/messOff' component={MessOffPage} exact={true} />
                <Route path='/complaints' component={ComplaintsPage} exact={true} />
                <Route path='/complaintsList' component={ComplaintsPageForS} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    </div>
);

export default AppRouter;