import { Outlet, Link } from "react-router-dom";

const Login = () => {
    return (
      <div className="main">
      <p>
        Email:
        <input type="text"/>
      </p>
      <p>
        Password:
        <input type="text"/>
      </p>
      <p>
        <button name="Login">Register</button>
      </p>
      <p>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
    )
  };
  
  export default Login;