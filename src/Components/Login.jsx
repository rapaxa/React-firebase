import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import TodoList from "./TodoList";
import {useState} from "react";

const Login = () => {
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
            })
            .catch((error) => {
            });
    };

    return (
        <div>
            {user ? (
                // Пользователь авторизован
                <p>Welcome, {user.displayName}!
                    <TodoList/></p>


            ) : (
                // Пользователь не авторизован
                <button onClick={handleSignIn}>Sign in with Google</button>
            )}
        </div>
    );
};

export default Login;
