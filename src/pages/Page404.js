import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  }
  
    return (
      <>
        <h1>404 - Page Not Found</h1>
        <h4>Try not to get lost next time!</h4>
        <p><img src="./images/dancing_android.gif"/></p>
        <p><button onClick={goBack}>Go Back</button></p>
      </>
    )
  };
  
  export default Page404;