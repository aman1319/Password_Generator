import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length,setlength] = useState(8);
  const[numberallo,setnumberallow]=useState(false);
  const[charAllow,setcharAllowed]=useState(false);

  const [Password,setpassword]=useState("");

  const passwordref=useRef("");
  const passwordGenerator=useCallback(()=>{
    let pass='';
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberallo) str+='0123456789';
    if(charAllow) str+='@#$%^&*';
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setpassword(pass)
  },[length,numberallo,charAllow,setpassword])



const copyPasswordToClipword=useCallback(()=>{
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,155);
  window.navigator.clipboard.writeText(Password)
},[Password])


  useEffect(()=>{
    passwordGenerator()
  },[length,numberallo,charAllow,passwordGenerator])

  return (
    <>
     
      <div className=" w-full max-w-md mx-auto shadow-md 
        px- my-8 text-blue-500  bg-white ">
          <h1 className='text-4xl text-center bg-slate-500'> Password Generator</h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4 text-center'>
         <input 
         type='text' 
         value={Password}
         className='outline-none w-full  justify-center'
         placeholder='Password'
         readOnly
         ref={passwordref}/>
         <button 
         onClick={copyPasswordToClipword}
         className='text-black outline border-2 shrink-0 px-3 py-0.5 bg-blue '>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <div>
          <input
            type='range' 
            min={6}
            max={50}
            value={length}
            className='cursor-pointer bottom-2  text-black'
            onChange={(e)=>{setlength(e.target.value)}}>
          </input>

          <label> Length : {length} </label>
          </div>
          <div className='flex items-center gap-x-1  text-black '>
          <input
            type='checkbox' 
            defaultChecked={numberallo}
            id='numberInput'
            onChange={()=>{setnumberallow((prev)=>!prev)}}>
          </input>
          <label> Numbers </label>
            </div>
        
          <div className='flex items-center gap-x-1  text-black'>
        
          <input
            type='checkbox' 
            defaultChecked={charAllow}
            id='numberInput'
            onChange={()=>{setcharAllowed((prev)=>{!prev})}}>
          </input>
          <label> Character </label>
          </div>
          
          </div>
          
          </div>
      </div>

    </>
  )
}

export default App
