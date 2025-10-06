import React, { useEffect, useState } from "react";
import "./Profit.scss";
import { auth, db } from "../firebase"; // путь под твой проект
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Profit() {
  const navigate = useNavigate();

  // режим: choose / login / register
  const [mode, setMode] = useState("choose");

  // регистрация
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // логин
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // текущий пользователь (данные из Firestore)
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // пытаемся вытащить данные из Firestore
        try {
          const ref = doc(db, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setUserData({ uid: user.uid, ...snap.data() });
          } else {
            // если нет документа - создаём минимальный из displayName/email
            const fallback = {
              firstName: user.displayName ? user.displayName.split(" ")[0] : "",
              lastName: user.displayName ? (user.displayName.split(" ")[1] || "") : "",
              email: user.email || ""
            };
            setUserData({ uid: user.uid, ...fallback });
          }
        } catch (err) {
          console.error(err);
          toast.error("Ошибка при загрузке данных пользователя");
        }
      } else {
        setUserData(null);
      }
      setLoadingUser(false);
    });

    return () => unsub();
  }, []);

  /* ---- регистрация ---- */
  const handleRegister = async () => {
    if (!firstName, !lastName, !gender, !regEmail,  !regPassword) {
      toast.error("Пожалуйста, заполните все поля");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const user = res.user;

      // обновим displayName (чтобы header мог брать)
      await updateProfile(user, { displayName:` ${firstName} ${lastName} `});

      // сохраним дополнительную инфу в Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        gender,
        email: regEmail,
        createdAt: new Date().toISOString()
      });

      toast.success("Регистрация успешна ✅");
      // после регистрации автоматически переходим в логин (или оставляем залогиненным)
      // здесь оставлю поведение: переходим на логин (если хочешь оставлять залогиненным — закомментируй navigate)
      setMode("login");
      // очистка форм
      setRegEmail("");
      setRegPassword("");
      setFirstName("");
      setLastName("");
      setGender("");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /* ---- логин ---- */
  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      toast.error("Введите email и пароль");
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = res.user;
      toast.success("Вход выполнен ✅");
      // очищаем форму
      setLoginEmail("");
      setLoginPassword("");
      // можно перенаправить на главную:
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  /* ---- выход ---- */
  const handleLogout = async () => {
    await signOut(auth);
    setUserData(null);
    toast.info("Вы вышли из аккаунта");
  };
const initials = (u) => {
    if (!u) return "";
    const a = (u.firstName || "").trim();
    const b = (u.lastName || "").trim();
    const i1 = a ? a[0].toUpperCase() : "";
    const i2 = b ? b[0].toUpperCase() : "";
    return (i1 + i2) || (u.email ? u.email[0].toUpperCase() : "");
  };

  /* ---- UI ---- */
  if (loadingUser) {
    return <div className="profit-wrap"><p>Loading...</p></div>;
  }

  return (
    <div className="profit-wrap">
      <div className="profit-card">
        {userData ? (
          // Если уже залогинен — показываем профиль + кнопки logout
          <div className="profile-view">
            <div className="profile-top">
              <div className="avatar-large">{initials(userData)}</div>
              <div className="profile-info">
                <h3>{userData.firstName} {userData.lastName}</h3>
                <p className="small">{userData.email}</p>
                <p className="small">Gender: {userData.gender || "—"}</p>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn" onClick={() => navigate("/login")}>Go to Login</button>
              <button className="btn" onClick={() => navigate("/register")}>Go to Register</button>
              <button className="btn danger" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          // Если не залогинен — показываем выбор (login / register)
          <div>
            {mode === "choose" && (
              <div className="choose-row">
                <button className="choose-btn" onClick={() => navigate("/login")}>Login</button>
                <button className="choose-btn" onClick={() => navigate("/register")}>Register</button>
              </div>
            )}

            {mode === "login" && (
              <div className="form-col">
                <h2>Login</h2>
                <input placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                <div className="row">
                  <button className="btn" onClick={handleLogin}>Email Login</button>
                  <button className="link" onClick={() => setMode("register")}>Go to Register</button>
                </div>
              </div>
            )}

            {mode === "register" && (
              <div className="form-col">
                <h2>Register</h2>
                <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                <select value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <input placeholder="Email" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                <input placeholder="Password" type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} />
                <div className="row">
                  <button className="btn" onClick={handleRegister}>Register</button>
                  <button className="link" onClick={() => setMode("login")}>Go to Login</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profit;