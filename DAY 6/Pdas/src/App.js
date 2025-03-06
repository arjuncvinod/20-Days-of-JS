import React from 'react';
import BrightText from './components/BrightText';
import ProfileCard from './components/profileCard';
import img1 from "./assets/alexa.png";
import img2 from "./assets/cortana.png";
import img3 from "./assets/siri.png";
import "bulma/css/bulma.css";

function App() {
  return (
    <div>
      {/* <BrightText color="red"/>
          <BrightText color="green"/>
          <BrightText color="blue"/> */}
      {/* <ProfileCard title={"arjun1"} handle={"@arjun1"} image={img1}/>
          <ProfileCard title={"arjun2"} handle={"@arjun2"} image={img2}/>
          <ProfileCard title={"arjun3"} handle={"@arjun3"} image={img3}/> */}



      <div>Personal Digital Assistants</div>
      <div className="container">
        <section className="section">
          <div className="columns">
            <div className="column is-4">
              <ProfileCard title="Alexa" handle="@alexa99" image={img1} />
            </div>
            <div className="column is-4">
              <ProfileCard
                title="Cortana"
                handle="@cortana32"
                image={img2}
              />
            </div>
            <div className="column is-4">
              <ProfileCard title="Siri" handle="@siri01" image={img3} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App;