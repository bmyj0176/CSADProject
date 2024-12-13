import "./stylesheets/homepage.css";

const Homepage = () => {
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Welcome to TravelSite</h1>
      <h3 style={{textAlign: "center"}}> The smart way to get labour </h3>
      <div style={{display: "inline-block"}}>
        <h1> What do we do? </h1>
        <h5> yapyapyapyapyapyapyapyapyapyapyapyap </h5>
        {/* Fixed iframe issue with proper syntax */}
      <iframe
        src="https://youtube.fandom.com/wiki/SDomingo"
        title="YouTube Video"
      />
      </div>

      <div>
        <h1> More about us </h1>
        <h5> yapyapyapyapyapyapyapyapyapyapyapyap </h5>
      </div>
      <div>
        <h5> yapyapyapyapyapyapyapyapyapyapyapyap </h5>
      </div>
      
    </div>
  );
};

export default Homepage;