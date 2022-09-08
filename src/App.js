import { BrowserRouter , Routes , Route, Router,Navigate } from 'react-router-dom';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import PageNotFound from './components/PageNotFound';
import AdminPage from './components/AdminPage';
import RolesBasedAuth from "./components/Authentication/RolesBasedAuth"
import Unauthorized from "./components/Unauthorized";
import Hero from './components/Hero';
import DisplayAuctions from './components/DisplayAuctions';
import Navbar from "./components/Navbar/Navbar";
import FullAuction from './components/FullAuction';
import "./App.css";
import "./index.css";
import BidTable from './components/BidTable';
import CreateAuction from './components/CreateAuction';


function App() {


  return (
 
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate replace to="/OpenSea" />} />
            /*The app now loads on https://localhost/OpenSea */
                {/*<Route path="/OpenSea" element={<Home />}>
                  <Route index element={
                    <div>
                      <Hero />
                    </div>
                  } />
                  <Route path="unauthorized" element={<Unauthorized />} />
                    
                  <Route path="Auctions" element={<><Navbar /><DisplayAuctions /></>} />
                </Route>*/}
          
                <Route path="/OpenSea" /*element={<Home />}*/ >
                  <Route index element={
                    <div>
                      <Navbar/>
                      <Hero />
                    </div>
                  } />
                    <Route path='SignUp' element={<SignUp />} />
          
                    <Route path='SignIn' element={<SignIn />} />
          
                    <Route element={<RolesBasedAuth allowedRoles={["ADMIN"]} />}>  
                        <Route path='AdminPage' element={<AdminPage />} />
                    </Route>
                    <Route element={<RolesBasedAuth allowedRoles={["ADMIN","SELLER"]} />}>  
                        <Route path='CreateAuction' element={<CreateAuction />} />
                    </Route>
          
                    <Route path='*' element={<PageNotFound />} />
            
                    <Route exact path="Auctions/:id" element={<FullAuction/>} />
                    
                    <Route path="unauthorized" element={<Unauthorized />} />
                    
                    <Route path="Auctions" element={<><Navbar /><DisplayAuctions /></>} />
                </Route>
                   
                
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
