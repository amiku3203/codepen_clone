 
import    {   Route,Routes} from "react-router-dom"
import Home from './container/Home';
 
import { auth, db } from './config/firebase.config'
 
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
 import  Spinner  from './animations/Spinner'
import { useDispatch } from 'react-redux'
import { SET_USER } from './context/actions/userActions'
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewProject from "./container/NewProject";
import {SET_PROJECTS} from "./context/actions/projectActions"
function App() {

  const [isLoading, setisLoading] = useState(true);
  
 const navigate=useNavigate();
  const dispatch=useDispatch();
   useEffect(() => {
       const  unsubscribe=auth.onAuthStateChanged((userCred)=>{
        if (userCred) {
          console.log(userCred?.providerData[0]);
      
          // Set data in Firestore and then dispatch the user information
          setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0])
              .then(() => {
                  dispatch(SET_USER(userCred?.providerData[0]));
                  // router.push("/Home/Projects",{replace:true})
                  navigate("/home/projects", { replace: true });

              })
              .catch((error) => {
                  console.error("Error setting document:", error);
              });
      } else {
          // Redirect to "Home/Auth" route
          navigate("/home/auth", { replace: true });

            
      }
      
      setInterval(() => {
        setisLoading(false);
      },  2000);
       })
       return () => unsubscribe();  
        
 
   }, [])
   
  
 useEffect(()=>{
   const projectQuery=query(
    collection(db,"Projects"),
    orderBy("id","desc")
   )
 const unsubscribe=onSnapshot(projectQuery,(querySnaps=>{
   const projectList=querySnaps.docs.map(doc=>doc.data())
   dispatch(SET_PROJECTS(projectList));
 }))

 return unsubscribe;
 },[])


  return  <>
          {
             isLoading?(
              <div className='w-screen h-screen flex items-center justify-center overflow-hidden'>
                <Spinner />
               
              </div>) :
                 (
                  <div  >
              
              <Routes>
               <Route path='/home/*' element={<Home />} />
               <Route path="/newProject" element={<NewProject />}/>
               <Route path="*" element={<navigate to={"/home"} />} />
             </Routes>
                </div>

                 )
               
              
                
              


          } 
         

       
       
  
  </>
  
}

export default App;
