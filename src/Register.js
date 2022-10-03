import { useRef, useState, useEffect, useInsertionEffect } from "react";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

//regex constants for validatio
//todo: put that in an constants file and import it here

//must start with low or up letter, then followew by lower or up or num or _ and must be between 3 and 23 char
const USER_REGEX = /^[a-aA-Z][a-zA-Z0-9-_]{3,23}$/;

//password requires at least on low, one up, one num, on special and must be at least 8 char and 40 char max
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%]).{8,40}$/;

//fonctional component
const Register = () => {
  //userRefs

  //target the user to put focus on it
  const userRef = useRef();

  //target the error to put focus on it
  const errorRef = useRef();

  //useStates

  //for username field
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserfocus] = useState(false);

  //for pasword field
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordfocus] = useState(false);

  //for pasword check
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //for error/succes handling
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  //set focus on the username field at start
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //at username field chang, check against regex(true if ok false if not) and set if name is valid or not
  useEffect(() => {
    const result = USER_REGEX.test(user);
    //some logs
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  //at password field and matchPassword update, check against regex, set if valid or not, compare to matchPassword
  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    //some logs
    console.log(result);
    console.log(password);
    setValidPassword(result);
    const match = password === matchPassword; //match is true if pass = match pass
    setValidMatch(match); //set if pass matches matchPass
  }, [password, matchPassword]);

  //clears the error message at fields and matchPass update
  useEffect(() => {
    setErrorMsg("");
  }, [user, password, matchPassword]);

  return (
    <section>
      {/* Message d'erreur (p) */}
      <p
        ref={errorRef}
        className={errorMsg ? "errMsg" : "offScree"}
        aria-live="assertive"
      >
        {errorMsg}
      </p>

      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Nom d'utilisateur:
          {/* Visual clues */}
          <span className={validName ? "valid" : "hide"}>
            <CheckCircleOutlined />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <CloseCircleOutlined />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(event) => setUser(event.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserfocus(true)}
          onBlur={() => setUserfocus(false)}
        />
        {/* Message d'info pour saisir nom d'utilisateur correct */}
        {/* Apparait si focus champ user, ET champ est hydraté ET si fail le regex test */}
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offScreen"
          }
        >
          <InfoCircleOutlined />
          Le nom d'utilsateur doit contenir entre 4 et 45 caractères.
          <br />
          Il doit aussi commencer par une lettre.
          <br />
          Il doit contenir au moins une lettre, un nombre, et un caractère
          spécial
          <br />
        </p>

        {/* password input */}
        <label htlmFor="password">
          Mot de passe:
          <span className={validPassword ? "valid" : "hide"}>
            <CheckCircleOutlined />
          </span>
          <span className={validPassword || !password ? "hide" : "invalid"}>
            <CloseCircleOutlined />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(event) => setPassword(event.target.value)}
          aria-invalid={validPassword ? "false" : "true"}
          aria-describedby="passwordnote"
          onFocus={() => setPasswordfocus(true)}
          onBlur={() => setPasswordfocus(false)}
        />
        {/* Message d'info pour saisir mdp correct */}
        {/* Apparait si focus champ user, ET champ est hydraté ET si fail le regex test */}
        <p
          id="passwordnote"
          className={passwordFocus && !password ? "instructions" : "offScreen"}
        >
          <InfoCircleOutlined />
          Le mot de passe doit contenir entre 8 et 40 characteres,
          <br />
          Il doit inclure une lettre minuscule et majuscule,
          <br />
          un nombre et un caractere special.
          <br />
        </p>

        <label htmlFor="confirmpassword">
          Confirm Password:
          <span className={validMatch && matchPassword ? "valid" : "hide"}>
            <CheckCircleOutlined />
          </span>
          <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
            <CloseCircleOutlined />
          </span>
        </label>
        <input
          type="password"
          id="confirmpassword"
          onChange={(e) => setMatchPassword(e.target.value)}
          value={matchPassword}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <CloseCircleOutlined />
          Doit correspondre au mot de passe.
        </p>

        <button disabled={!validName || !validPassword || !validMatch ? true : false }>Valider</button>

      </form>

      <p>
        Déjà inscrit ?<br/>
        {/* todo: insert react router */}
        <a href='#'>Cliquez ici pour vous connecter</a>
      </p>
    </section>
  );
};
export default Register;
