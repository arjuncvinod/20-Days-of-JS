import { useState } from "react"
import DropDown from "./components/DropDown"
import Accordion from "./components/Accordion"
import AccordionPage from "./pages/AccordionPage";

function App() {
  const [selection,setSelection] =  useState(null)

  const handleSelect = (option)=>{
    setSelection(option)
  };

  const options = [
    { label:"Red",value:"red" },
    { label:"Green",value:"green" },
    { label:"Blue",value:"blue" },]
 return(
  <AccordionPage/>
//   <div className="flex">
//   <DropDown value={selection} onChange={handleSelect} options={options} />
//   <DropDown value={selection} onChange={handleSelect} options={options} />

//  </div>
 )
}

export default App
