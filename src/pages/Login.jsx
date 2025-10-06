// import React from "react";
// import "./Login.scss";
// import { Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";

// function Login() {
//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         {/* Левая часть */}
//         <div className="auth-form">
//           <h2>Login</h2>
//        <div className="login-links">   <a href="#" className="forgot">Forgot your password?</a>

//        </div>


//           <input type="email" placeholder="Email" />
//           <input type="password" placeholder="Password" />

//           <div className="checkbox">
//             <input type="checkbox" /> Keep me logged in
//           </div>

//           <button className="primary-btn">Email Login</button>

//           <div className="social-buttons">
//             <button className="social-btn google">G</button>
//             <button className="social-btn apple"></button>
//             <button className="social-btn facebook">f</button>
//           </div>

//           <p className="terms">
//             By clicking ‘Log In’ you agree to our Terms & Conditions
//           </p>
//         </div>

//         {/* Правая часть */}
//         <div className="auth-info">
//         <div className="auth-info2">  <h2>Join Kicks Club Get Rewarded Today.</h2>
//           <p className="auth-p">As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:</p>
//           <ul>
//             <li>Free shipping</li>
//             <li>A 15% off voucher for your next purchase</li>
//             <li>Access to Members Only products and sales</li>
//             <li>Access to adidas Running and Training apps</li>
//             <li>Special offers and promotions</li>
//           </ul>
//           <p className="auth-p">Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.​</p></div>
//           <button className="secondary-btn">Join the Club</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function loginUser() {
    if (!email || !password) {
      toast.error("Введите email и пароль ❌");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        toast.success(`Добро пожаловать, ${data.firstName}! ✅`);
      } else {
        toast.success("Добро пожаловать ✅");
      }
      navigate("/");

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Левая часть */}
        <div className="auth-form">
          <h2>Login</h2>

          <div className="login-links">
            <a href="#" className="forgot">Forgot your password?</a>
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />

          <div className="checkbox">
            <input type="checkbox" /> Keep me logged in
          </div>

          <button onClick={loginUser} className="primary-btn">Email Login</button>

          <div className="social-buttons">
            <button className="social-btn google">G</button>
            <button className="social-btn apple"></button>
            <button className="social-btn facebook">f</button>
          </div>

          <p className="terms">
            By clicking ‘Log In’ you agree to our Terms & Conditions
          </p>
        </div>

        {/* Правая часть */}
        <div className="auth-info">
          <div className="auth-info2">
            <h2>Join Kicks Club Get Rewarded Today.</h2>
            <p className="auth-p">
              As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:
            </p>
            <ul>
              <li>Free shipping</li>
              <li>A 15% off voucher for your next purchase</li>
              <li>Access to Members Only products and sales</li>
              <li>Access to adidas Running and Training apps</li>
              <li>Special offers and promotions</li>
            </ul>
            <p className="auth-p">
              Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.
            </p>
          </div>
          <button className="secondary-btn">Join the Club</button>
        </div>
      </div>
    </div>
  );
}

export default Login;



