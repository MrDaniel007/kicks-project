

import React, { useState } from "react";
import "./Register.scss";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
    const navigate = useNavigate()
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createUser() {
    if (!firstName, !lastName, !gender, !email || !password) {
      toast.error("Пожалуйста, заполните все поля ❌");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        gender,
      });

      toast.success("Регистрация успешна ✅");
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
          <h2>Register</h2>
          <div className="social-buttons">
            <button className="social-btn google">G</button>
            <button className="social-btn apple"></button>
            <button className="social-btn facebook">f</button>
            <button className="social-btn">
              <Link to="/login" className="login-ower">Login</Link>
            </button>
          </div>

          <p className="or">OR</p>

          <label>Your Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          
          <select 
  value={gender} 
  onChange={(e) => setGender(e.target.value)} 
  required
>
  <option value="">Other</option>
  <option value="male"> Male</option>
  <option value="female">Female</option>
</select>

          <label>Login Details</label>
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
            <input type="checkbox" /> By clicking ‘Register’ you agree to our Terms
          </div>

          <div className="checkbox">
            <input type="checkbox" /> Keep me logged in
          </div>

          <button onClick={createUser}  className="primary-btn">Register</button>
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

export default Register;



