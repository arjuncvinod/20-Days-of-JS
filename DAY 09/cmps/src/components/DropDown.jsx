import React, { useEffect, useRef, useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import Panel from './panel'; 

function DropDown({ options, value, onChange }) {
   const [isOpen, setIsOpen] = useState(false);
   const divEl = useRef();

   useEffect(()=>{
    const handler = (event) =>{
      if(!divEl.current){
        return;
      }
      if(!divEl.current.contains(event.target)){
        setIsOpen(false)
      }
      
    };
    document.addEventListener('click',handler,true);
    return ()=>{
      document.removeEventListener('click',handler)
    }
   },[]);

   const handleClick = () => {
    setIsOpen(!isOpen);
   };

   const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
   };

   const renderedItems = options.map((opt) => (
        <div 
            className='hover:bg-sky-100 rounded cursor-pointer p-1' 
            onClick={() => handleOptionClick(opt)} 
            key={opt.value}>
          {opt.label}
        </div>
    ));

  return (
    <div ref={divEl} className='w-48 relative'>
      <Panel 
        className='flex justify-between items-center cursor-pointer' 
        onClick={handleClick}>
        {value?.label || "Select..."}
        <GoChevronDown className='text-lg'/>
      </Panel>
      {isOpen && <Panel className='absolute top-full'>{renderedItems}</Panel>}
    </div>
  );
}

export default DropDown;
