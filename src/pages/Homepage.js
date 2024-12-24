import './stylesheets/homepage.css';

const Homepage = () => {
  return (
    <div>
      <img className="nyoom" src="./images/nyoom.png"/>
      <h1 className="headd" style={{textAlign: "center"}}></h1>
      <h3 style={{textAlign: "center"}}> Bus? Or maybe I'll take it all. </h3>
      <div style={{display: "inline-block"}}>
        <h1 className="subhead"> Never miss your buses again </h1>
        <h5 className = "subpar"> 
          Our Bus Arrival Times page will allow you to quickly search for the arrival times of buses.
        </h5>
        {/* Fixed iframe issue with proper syntax */}
      </div>
      <div style={{display: "inline-block"}}>
        <img src='./images/dancing_android.gif'/>
      </div>
      <hr style={{border: "1px solid #ccc", margin: "20px 0", width: "100%"}} />
      <div>
        <h1 className="subhead2"> More About Us </h1>
        <h5 className="subpar2"> yapyapyapyapyapyapyapyapyapyapyapyap <br/>
         yapyapyapyapyapyapyapyapyapyapyapyap </h5>
      </div>
      
    </div>
  );
};

export default Homepage;