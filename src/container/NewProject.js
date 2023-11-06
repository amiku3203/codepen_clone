import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaChevronDown, FaCss3, FaHtml5, FaJs, FaTruckDroplet } from 'react-icons/fa6'
import { FcSettings } from 'react-icons/fc'
import SplitPane from 'react-split-pane'
import CodeMirror, { Line } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Link } from 'react-router-dom'
import { Logo } from '../assests/index'
import { AnimatePresence,motion } from 'framer-motion'
import { MdCheck, MdEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
import UserProfileDetails from './UserProfileDetails'
import { setDoc ,doc} from 'firebase/firestore'
import { db } from '../config/firebase.config'
import Alert from './Alert'
import Editor from './Editor'
const NewProject = () => {
  const [html, setHtml] = useState("")
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setoutput] = useState("");
  const [isTitile, setisTitile] = useState("");
  const [title, settitle] = useState("Untitled");
 const [alert, setalert] = useState(false);
  const  user= useSelector(state=>state.user?.user);
  console.log("user",user)

 useEffect(()=>{
    updateOutput()
 },[html,css,js])


 const updateOutput = () => {
  const combinedOutput = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;
  setoutput(combinedOutput);
};

  const saveProgram= async ()=>{
      const id=`${Date.now()}`
      const _doc={
          id:id,
          title:title,
          html:html,
          css:css,
          js:js,
          output:output,
          user:user
      }
      await setDoc(doc(db,"Projects",id),_doc).then((res)=>{
           setalert(true)  
      }).catch((err)=>console.log(err));
      setInterval(() => {
        setalert(false);
      }, 2000);
  }
  return  <>
   <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden'>  
       {/* alert */}

       <AnimatePresence>
        {alert && <Alert status={"Success"} alertMsg={"Project Saved..."}  />}
       </AnimatePresence>

      {/* header section */}
      <header className='w-full flex items-center justify-between px-12 py-4'> 
       <div className='flex items-center justify-center gap-6'>
          <Link to={"/home/projects"}>
            <img className='w-32 h-auto object-contain' src={Logo} />
          </Link>
          <div className='flex flex-col items-start justify-start'>
             {/* title */}
        <div className='flex items-center justify-center'>
           <AnimatePresence>
             {isTitile ? <> 
               <motion.input key={"TitleInput"} type='text' placeholder='Your Title'
               className='px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none'
               value={title} 
                onChange={(e)=>settitle(e.target.value)}
               >
                 
               </motion.input>
             </> :<>
               <motion.p key={"titleLabel"} className='px-3 py-2 text-white text-lg'>
                 {title}
               </motion.p>
              </>
              }
           </AnimatePresence>

           <AnimatePresence>
             {isTitile ? <> 
                 <motion.div key={"MdCheck"} whileTap={{scale:0.9}} className='cursor-pointer' onClick={()=>setisTitile(false)}  >
                  <MdCheck  className='text-2xl text-emerald-500'/>
                 </motion.div>
             </> :<>
             <motion.div key={"MdEdit"}  whileTap={{scale:0.9}}  className='cursor-pointer' onClick={()=> setisTitile(true)}  >
          <MdEdit className='text-2xl text-primaryText'/>
              </motion.div> 
              </>
              }
           </AnimatePresence>


        </div>

             {/* follow */}
             <div className='flex items-center justify-center  px-3 -mt-2 gap-2 '>
             <p className='text-primaryText text-sm'>
                {
                  user?.displayName ? user?.displayName :`${user?.email?.split("@")[0]}`
                }
               </p>
               <motion.p  whileTap={{scale:0.9}} className='text-[10px] bg-emerald-500  rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer'>
                + Follow
               </motion.p>
             </div> 
          </div>
       </div>
       
       {/* user section */}
     { user && (
       <div className='flex items-center justify-center gap-4'>
       <motion.button
       onClick={
        saveProgram
       } 
       whileTap={{scale:0.9}} 
       className='px-5 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md '>
            Save
       </motion.button>
       <UserProfileDetails />
      </div>
      
     )}
         

      </header>
           
           {/* coding section */}
        
           <div className="pane top-pane">
          <Editor
            language={"html"}
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language={"css"}
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          <Editor
            language={"js"}
            displayName="JS"
            value={js}
            onChange={setJs}
          />
        </div>
        <div className="pane">
          <iframe
            srcDoc={output}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width={"100%"}
            height="100%"
          ></iframe>
      
      </div>

   </div>
  </>
     
}

export default NewProject
