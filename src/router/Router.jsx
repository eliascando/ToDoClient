import {
    BrowserRouter, 
    Navigate, 
    Route, 
    Routes, 
} from 'react-router-dom';
import { Login } from '../components/Auth/Login';
import { Singup } from '../components/Auth/Singup';
import { NotFound } from '../components/NotFound';
import { Home } from '../components/Home';
import { RouteGuard } from './RouteGuard';
import { useContext } from 'react';
import { UserContext } from '../contexts/UsuarioContext';

export const Router = () => {
    const { user } = useContext(UserContext);
    let isAuth = user?.Token ? true : false;

    return(
        <div className='Router'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to='/login' />} />
                    <Route path='/login' element={
                        <RouteGuard
                            canActivate={!isAuth}
                            redirectTo='/home'
                        >
                            <Login />
                        </RouteGuard>
                    } />
                    <Route path='/singup' element={
                        <RouteGuard
                            canActivate={!isAuth}
                            redirectTo='/home'
                        >
                            <Singup />
                        </RouteGuard>
                    } />
                    <Route path='/home' element={
                        <RouteGuard
                            canActivate={isAuth}
                        >
                            <Home />
                        </RouteGuard>
                    }>
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
