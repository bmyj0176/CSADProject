import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

    return (
      <>
        <h1>404 - Page Not Found</h1>
        <h4>Try not to get lost next time!</h4>
        <img src="./images/dancing_android.gif"></img>
        <button onClick={navigate(-1)}>Go Back</button>
      </>
    )
  };
  
  export default Page404;