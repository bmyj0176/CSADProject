import './stylesheets/homepage.css';

const Homepage = () => {
  return (
    <div>
      <h1 className="headd" style={{textAlign: "center"}}>Welcome to TravelSite</h1>
      <h3 style={{textAlign: "center"}}> The Smart Way To Get Labour </h3>
      <div style={{display: "inline-block"}}>
        <h1 className="subhead"> What Do We Do? </h1>
        <h5 className = "subpar"> yapyapyapyapyapyapyap </h5>
        {/* Fixed iframe issue with proper syntax */}
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