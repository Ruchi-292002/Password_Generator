import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const[length,setlength] = useState(8)
  const[numbers,setnumbers] = useState(false)
  const[char,setchar] = useState(false)
  const[password,setpassword] = useState("")

 const passwordRef = useRef(null)





  const passwordGenerator = useCallback(()=>{
     let pass =""
     let string ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numbers) string +="012345678";
      if(char) string +="!@#$%^&*(){}-_~?[]`"
 
      for(let i=1;i<=length; i++){
        let char = Math.floor(Math.random() * string.length+1 )
        pass += string.charAt(char)
      }
      setpassword(pass)

  },[length,numbers,char,setpassword])

  const copyPasswordToClipboard = useCallback(()=>{

    passwordRef.current?.select()
   window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numbers,char,passwordGenerator])

  return (
  <>
    <div className='w-full h-screen bg-blue-200 flex position:relative '>
      <div className='w-[45%] h-[45%] mx-auto shadow-md rounded-lg px-4 py-2  bg-gray-800 mt-20 text-red-400   '>
        <h1 className='text-4xl text-white text-center my-10'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
          value={password}
            className='outline-none w-full py-2 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
           onClick={copyPasswordToClipboard}
           className='outline-none bg-blue-400 text-white py-2 px-5 shrink-0 hover:bg-sky-600'> Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
           className='cursor-pointer'
           onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
            defaultChecked={numbers}
            id='numberInput'
            onChange={()=>{
                 setnumbers((prev)=> !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
          <input 
            type='checkbox'
            defaultChecked={char}
            id='charInput'
            onChange={()=>{
                 setchar((prev)=> !prev);
            }}
          />
          <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default App
