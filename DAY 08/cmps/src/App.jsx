import Button from './Button'
import {GoBell,GoCloudDownload,GoDatabase} from 'react-icons/go'

function App() {
  const handleClick = ()=>{
    console.log("click");
    
  }
  return (
    <div>
      <div>
      <Button className="mb-5" primary rounded outline onMouseEnter={handleClick} >
      <GoBell/>
        Click Me</Button>
    </div>
    <div>
    <Button secondary >
      <GoCloudDownload />
      Buy Now</Button>
    </div>
    <div>
    <Button success rounded>
      <GoDatabase/>
      See Deal</Button>
    </div>
    <div>
    <Button onClick={handleClick}  warning  outline={false}>Click Me</Button>
    </div>
    <div>
    <Button danger  outline={true}>Click Me</Button>
    </div>
    </div>
  )
}

export default App
