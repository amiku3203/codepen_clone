 
import React from 'react'
import { Logo } from '../assests'
 
import UserAuthInput from '../UserAuthInput'
import { FaEnvelope, FaGithub } from 'react-icons/fa6'
import  {MdPassword} from "react-icons/md"
import { useState } from 'react'
import {FcGoogle} from "react-icons/fc"
import { AnimatePresence, motion } from 'framer-motion'
import { signInWithGitHub, signInWithGoogle } from '../utils/helpers'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config'
 import { signInWithEmailAndPassword } from 'firebase/auth'
import { fadeInOut } from '../animations/index'
const  SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setgetEmailValidationStatus] = useState("")
  const [isLogin, setisLogin] = useState(false)
 const [alert, setalert] = useState(false)
 const [alertMessage, setalertMessage] = useState("")
 const craeteNewUser=async ( )=>{
   if(getEmailValidationStatus){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage)
    });
   }
 }

 const  loginwithemailpassword=async ( )=>{
  if(getEmailValidationStatus){
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
     console.log(userCredential);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if(error.message.includes("user-not-found")){
       setalert(true);
       setalertMessage("Invalid Id:User Not Found");
    } else if(error.message.includes('wrong-password')){
       setalert(true);
       setalertMessage("Password Mismatch");
    } else{
      setalert(true);
      setalertMessage("Temoporarily disable due to many failed login😅");
    }
    setInterval(()=>{
       setalert(false);
    },4000)
  });

  }
}


  return (
    <div className='w-full py-6'>
        <img src={Logo} className='object-contain w-32 opacity-50 h-auto' />
     <div className='w-full flex flex-col items-center py-8'>
     <p className='py-12 text-2xl text-primaryText'>Join With Us!😆</p>
     <div className='px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8'>
       {/* email */}
        <UserAuthInput 
        label="Email"
        placeholder="Email"
        isPass= { false}
        key="Email"
        setStateFunction= {setEmail}
        Icon={FaEnvelope}
        setgetEmailValidationStatus={setgetEmailValidationStatus}
        />
       {/* password */}
       <UserAuthInput
       label="Password"
       placeholder="Password"
       isPass={true}
       key="Password"
       setStateFunction={setPassword}
       Icon={MdPassword}
       />
       {/* alert Section */}
        <AnimatePresence>
           {
            alert && (
                
      <motion.div 
      key={"AlertMessage"}
      {...fadeInOut}
      className='text-red-500'
      
      >
         {alertMessage}
      </motion.div>
            )
           }
        </AnimatePresence>
    
       {/* login button */}
        {
        !isLogin ? (
          <motion.div onClick={craeteNewUser} whileTap={{scale:0.9}} className= 'flex-1 w-full h-full py-2 outline-none border-none rounded-md bg-emerald-500  text-black text-lg cursor-pointer hover:bg-emerald-700 hover:text-black'  >
          <p className='text-xl text-black flex-1 justify-center text-center hover:text-white '  >
        Sign Up
       </p>
    </motion.div>
        ) :(
           
          <motion.div  onClick={loginwithemailpassword} whileTap={{scale:0.9}} className= 'flex-1 w-full h-full py-2 outline-none border-none rounded-md bg-emerald-500  text-black text-lg cursor-pointer hover:bg-emerald-700 hover:text-black'  >
          <p className='text-xl text-black flex-1 justify-center text-center hover:text-white '>
        Login
       </p>
    </motion.div>
        )
      

        }

        {

       !isLogin ?(
        <p className='text-sm text-primaryText flex items-center justify-center gap-3'>Already Have an account! 
        <span onClick={()=>setisLogin(!isLogin)}  className='text-emerald-500 cursor-pointer'>Login Here</span> </p> 
       ) :(
        <p className='text-sm text-primaryText flex items-center justify-center gap-3'>Doesn't Have an account!
         <span  onClick={()=>setisLogin(!isLogin)} className='text-emerald-500 cursor-pointer'> Create Here</span> </p> 
       ) 

        }
       
       {/* account text */}
  

       {/* or section */}
          <div className='flex items-center justify-center gap-12'>
             <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 '></div>
             <p className='text-sm text-[rgba(256,256,256,0.2)] '>OR</p>
             <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 '></div>
          </div>

       {/* sign in with google */}
        <motion.div  onClick={signInWithGoogle}   whileTap={{scale:0.9}} className='  bg-[rgba(256,256,256,0.2)] w-full flex items-center justify-center gap-3 backdrop-blur-md py-3 rounded-xl hover: bg-[rgba(256,256,256,0.4)] cursor-pointer'> 
          <FcGoogle  className='text-3xl'/>
          <p className='text-xl text-white'>Sign in with Google</p>
        </motion.div>
       {/* secction */}
       <div className='flex items-center justify-center gap-12'>
             <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 '></div>
             <p className='text-sm text-[rgba(256,256,256,0.2)] '>OR</p>
             <div className='h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24 '></div>
          </div>
       {/* sign in with ngithub */}
       <motion.div  onClick={signInWithGitHub} whileTap={{scale:0.9}} className='  bg-[rgba(256,256,256,0.2)] w-full flex items-center justify-center gap-3 backdrop-blur-md py-3 rounded-xl hover: bg-[rgba(256,256,256,0.4)] cursor-pointer'> 
          <FaGithub  className='text-3xl'/>
          <p className='text-xl text-white'>Sign in with GitHub</p>
        </motion.div>
     </div>
     </div>
    </div>
  )
}

export default  SignUp
