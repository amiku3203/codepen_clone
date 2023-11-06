 
import React, { useState ,useEffect} from 'react'
import {HiChevronDoubleLeft} from "react-icons/hi2"
import {MdHome} from "react-icons/md"
import {FaSearchengin} from "react-icons/fa6"
import { motion } from 'framer-motion'
 
import { Logo } from '../assests/index'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
 
import Projects from "../container/Projects"
import SignUp from "../container/SignUp"
import { useDispatch, useSelector } from 'react-redux'
import UserProfileDetails from './UserProfileDetails'
import {SET_SEARCH_TERM} from  "../context/actions/searchAction"
 
const  Home = () => { 
  const [isSideShow, setIsSideShow]=useState(true);
  const  user= useSelector(state=>state.user?.user);
   const  searchTerm=useSelector((state)=>state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm :"");
  const dispatch=useDispatch();
  return   (
   <>
    
    <div className="flex">
  {/* Sidebar */}
  <div className={`  bg-secondary min-h-screen relative px-3 py-6 flex flex-col items-center justify-start gap-4 transition-all duration-200 ease-in-out ${isSideShow ? 'w-44' : 'w-0'}`}>
    <motion.div whileTap={{ scale: 0.9 }} onClick={() => setIsSideShow(!isSideShow)} className='w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center justify-center cursor-pointer'>
      <HiChevronDoubleLeft className="text-white text-xl" />
    </motion.div>
    <div className='overflow-hidden w-full flex flex-col gap-4'>
      <Link to="/Home">
        <img src={Logo} className='object-contain w-72 h-auto' />
      </Link>
      <h1 className="text-sm font-semibold text-center text-gray-200 py-1">
        TRY OUR ONLINE EDITOR
      </h1>
      <Link to="/newProject">
        <div className='px-6 bg-black py-3 flex items-center justify-center rounded-xl border border-fuchsia-200 cursor-pointer group hover:border-gray-200'>
          <p className='text-white group-hover:text-gray-200 capitalize'>Start Coding</p>
        </div>
      </Link>
      {user && (
        <Link to="/home/Projects" className='flex items-center justify-center gap-6'>
          <MdHome className='text-primaryText text-xl' />
          <p className='text-lg text-primaryText'>Home</p>
        </Link>
      )}
    </div>
  </div>

  {/* Main Content */}
  <div className="flex-1 bg-secondary-200 min-h-screen p-6  px-4 md:px-3 py-2 md:py-3">
   
  <div className='w-full flex items-center justify-between gap-3'>
    <div className='bg-secondary w-full px-4 py-2  
    rounded-md flex items-center justify-center
    
    '>
      <FaSearchengin className='text-2xl text-primaryText' />
      <input
        type='text'
        className='flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-primaryText placeholder-gray-600'
        placeholder='Search CodePen...'
        onChange={(e)=> dispatch(SET_SEARCH_TERM(e.target.value))}
      />
    </div>


   {
     !user && (
      <motion.div  whileTap={{scale:0.9}} className='flex items-center justify-center gap-3'>
      <Link to={"/home/auth"} className='bg-emerald-500 px-8 py-3 rounded-md text-black text-lg cursor-pointer hover:bg-emerald-700 hover:text-white '> 
        SignUp
      </Link>
    </motion.div>
    
     )
 
   }
  
   {
    user &&  <UserProfileDetails />
       
   }


  </div>
  

 <div className='w-full'>
        <Routes >
            <Route path="/*"  element={<Projects/>}/>
            <Route  path="/auth" element={<SignUp/>}/>
          </Routes>

 </div>
 


  </div>

 
  


</div>


    
   
   
   </>



  )
    
 
}

export default  Home



 