import { useRef, useState, useEffect, useInsertionEffect} from 'react';
import { CheckCircleOutlined, InfoCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

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
    const[user, setUser] = useState('');
    const[validName, setValidName] = useState(false);
    const[userFocus, setUserfocus] = useState(false);
    
    //for pasword field
    const[password, setPassword] = useState('');
    const[validPassword, setValidPassword] = useState(false);
    const[passwordFocus, setPasswordfocus] = useState(false);
    
    //for pasword check
    const[matchPassword, setMatchPassword] = useState('');
    const[validMatch, setValidMatch] = useState(false);
    const[matchFocus, setMatchfocus] = useState(false);

    //for error/succes handling
    const[errorMsg, setErrorMsg] = useState('');
    const[successMsg, setSuccessMsg] = useState(false); 


    //set focus on the username field at start
    useEffect( () => {
        userRef.current.focus();
    },[])

    //at username field chang, check against regex(true if ok false if not) and set if name is valid or not
    useEffect(() => {
        const result = USER_REGEX.test(user)
        //some logs
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user])

    //at password field and matchPassword update, check against regex, set if valid or not, compare to matchPassword
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        //some logs
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPassword; //match is true if pass = match pass
        setValidMatch(match); //set if pass matches matchPass
    },[password, matchPassword])

    //clears the error message at fields and matchPass update
    useEffect(() => {
        setErrorMsg('');
    },[user, password, matchPassword])



    return(
        <section>
            {/* Message d'erreur (p) */}
            <p ref={errorRef} className={errorMsg ? "errMsg" : "offScree"} aria-live="assertive">{errorMsg}</p>

            <h1>Inscription</h1>
            <form>
                <label htmlFor="username">
                    Nom d'utilisateur:
                    {/* Visual clues */}
                    <span className={validName ? "valid" : "hide"}><CheckCircleOutlined/></span>
                    <span className={validName || !user ? "hide" : "invalid"}><CloseCircleOutlined/></span>
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
                    onFocus={ () => setUserfocus(true)}
                    onBlur={ () => setUserfocus(false)}
                />
                {/* Message d'info pour saisir mdp correct */}
                {/* Apparait si focus champ user, ET champ est hydraté ET si fail le regex test */}
            </form>
            <p id="uidnote" className={userFocus && user && !validName ?  "instructions" : "offScreen"}>
                <InfoCircleOutlined/>
                Le nom d'utilsateur doit contenir entre 4 et 45 caractères.<br/>
                Il doit aussi commencer par une lettre.<br/>
                Il doit contenir au moins une lettre, un nombre, et un caractère spécial<br/>
            </p>
        </section>
    )
}
export default Register;