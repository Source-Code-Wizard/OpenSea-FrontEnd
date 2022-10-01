import { BrowserRouter , Routes , Route, Router,Navigate } from 'react-router-dom';
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Home from "./components/Home";
import PageNotFound from './components/PageNotFound';
import AdminPage from './components/AdminPage/AdminPage';
import RolesBasedAuth from "./components/Authentication/RolesBasedAuth"
import Unauthorized from "./components/Unauthorized";
import Hero from './components/Hero/Hero';
import DisplayAuctions from './components/Auction/DisplayAuctions';
import Navbar from "./components/Navbar/Navbar";
import FullAuction from './components/Auction/FullAuction';
import CreateAuction from './components/Auction/CreateAuction';
import "./App.css";
import "./index.css";
import BidTable from './components/Auction/BidTable';
import DisplayUser from './components/AdminPage/DisplayUser';
import MyAuctions from './components/Auction/MyAuctions';
import MessagingStartPage from './components/Messages/MessagingStartPage';
import Inbox from './components/Messages/Inbox';
import Outbox from './components/Messages/Outbox';
import NewMessage from './components/Messages/NewMessage';
// import DeleteMessage from './components/Messages/DeleteMessage';


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
            
                    <Route path='MyAuctions' element={<MyAuctions />} />
            
                    <Route exact path="Auctions/:id" element={<FullAuction />} />
                    
                    <Route element={<RolesBasedAuth allowedRoles={["ADMIN"]} />}>  
                      <Route exact path="User/:id" element={<DisplayUser />} />
                    </Route>
                    
                    <Route path="unauthorized" element={<Unauthorized />} />
                    
                    <Route path="Auctions" element={<><Navbar /><DisplayAuctions /></>} />
                    <Route element={<RolesBasedAuth allowedRoles={["ADMIN", "USER"]} />}>
                      <Route path="MessagingStartPage" element={<MessagingStartPage/>} />
                    </Route>
                    <Route path='Inbox' element={<Inbox />} />
                    <Route path='Outbox' element={<Outbox />} />
                    <Route path='NewMessage' element={<NewMessage />} />
                    {/* <Route path='DeleteMessage' element={<DeleteMessage />} /> */}


                </Route>
                   
                
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
