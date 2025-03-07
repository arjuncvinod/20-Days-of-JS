import { useState } from 'react'
import AnimalShow from './AnimalShow'
export default function App() {
    const animals = ['cat', 'dog', 'bird', 'cow', 'gator', 'heart', 'horse']
    const random = () => {
        return animals[Math.floor(Math.random() * animals.length)]
    }

    const [Animal, setAnimal] = useState([])

    const handleClick = () => {
        setAnimal([...Animal, random()])
    }
    return (
        <>
            <button onClick={handleClick}>Add Animal</button> <br />
            {Animal.map((animal, index) => {
                return <AnimalShow animal={animal} key={index} />
            })}

        </>
    )
}
