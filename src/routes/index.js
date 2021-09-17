import {BrowserRouter,  Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from   '../pages/Profile';
import Customers from '../pages/Customers';
import Route from './Route';
import New from '../pages/New';



const Routes = () =>{
        return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/register" component={SignUp} />
                <Route exact path="/dashboard" component={Dashboard} isPrivate />
                <Route exact path="/profile"  component={Profile} isPrivate />
                <Route exact path="/customers" component={Customers} isPrivate />
                <Route exact path="/new" component={New} isPrivate />
                <Route exact paty="/new/:id" component={New} isPrivate />
            </Switch>
        </BrowserRouter>

        )
}
export default Routes;