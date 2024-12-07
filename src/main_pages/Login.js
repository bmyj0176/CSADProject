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
        <button name="Login">Login</button>
      </p>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
    )
  };
  
  export default Login;