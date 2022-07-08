import './App.css';
import React from "react";
import HomePage from "./Pages/homePage"
import SignUp from './Pages/signUp';
import { BrowserRouter, Routes,Route} from "react-router-dom";
import LoginPage from "./Pages/login"
import NavBar from './modals/navBar';
import ProfilePage from './Pages/ProfilePage';
import AnalyticsPage from './Pages/AnalyticsPage'
import Unauthorized from './Pages/Unauthorized'
function App() {
  
  return (
    <div className="App">

      
      <BrowserRouter>
       
          <React.Suspense>
            {window.location.pathname==='/' || window.location.pathname==='/login' || window.location.pathname==='/unauthorized'  ||  window.location.pathname==='/signup'?'':<NavBar/>}
            
            
            <Routes>
              
              <Route exact path='/home' element={< HomePage />}></Route>
              <Route exact path='/login' element={< LoginPage />}></Route>
              <Route exact path='/' element={<LoginPage />}></Route>
              <Route exact path='/signup' element={<SignUp/>}></Route>
              <Route exact path='/profile' element={<ProfilePage/>}></Route>
              <Route exact path='/analytics' element={<AnalyticsPage/>}></Route>
              <Route exact path='/unauthorized' element={<Unauthorized/>}></Route>
              
            </Routes>
          </React.Suspense>
         </BrowserRouter>
          
    </div>
  );
}

export default App;
