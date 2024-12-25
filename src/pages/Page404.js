import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/')
  }

  const goBack = () => {
    try {
      navigate(-1)
    } catch { // if user doesnt have a prev page for some reason
      goToHomepage()
    }
  }
  
    return (
      <>
        <h1>404 - Page Not Found</h1>
        <h4>Try not to get lost next time!</h4>
        <p><img src="./images/dancing_android.gif"/></p>
        <p><button onClick={goBack}>Go Back</button></p>
        <p><button onClick={goToHomepage}>Return to Homepage</button></p>
      </>
    )
  };
  
  export default Page404;