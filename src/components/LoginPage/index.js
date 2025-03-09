import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../firebase/config';
import md5 from 'md5';
import Button from '@mui/material/Button';
import './index.css';

function LoginPage({ setUserId }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);

    const handleLogin = useCallback(async (e, em = email, pw = password) => {
        if (e) e.preventDefault();

        try {
            if (em.endsWith('@gmail.com')) {
                await signInWithEmailAndPassword(auth, em, pw);
            } else {
                await setPersistence(auth, browserSessionPersistence);
                await signInWithEmailAndPassword(auth, em, pw);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error Signing In',
                footer: error.message
            });
        }
    }, [email, password]);

    useEffect(() => {
        const handleLocationChange = async () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const e = urlParams.get('e');
            const p = urlParams.get('p');
            const c = urlParams.get('c');
            if (e && p && c && c === md5(e + 'p' + p)) {
                handleLogin(false, e, p);
            } else {
                setHidden(false);
            }
        };

        window.addEventListener('popstate', handleLocationChange);
        handleLocationChange();

        return () => window.removeEventListener('popstate', handleLocationChange);
    }, [handleLogin]);

    const resetPassword = useCallback(async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Swal.fire({
                icon: 'success',
                title: 'Check your inbox...',
                html: `<b>${email}</b>`,
                footer: 'Password reset email sent'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                footer: error.message
            });
        }
    }, [email]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserId(currentUser ? currentUser.uid : '');
        });
        return () => unsubscribe();
    }, [setUserId]);

    return (
        <div id="loginPage">
            {!hidden && (
                <div id="loginContainer">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="email"
                            autoFocus
                        />
                        <input
                            id="password"
                            type="password"
                            autoComplete="on"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="password"
                        />
                        <Button variant="contained" size="small" id="loginButton" type="submit" className="log-in-button">Login</Button>
                        <Button variant="outlined" id="resetButton" className="pw-reset-button" onClick={(e) => { e.preventDefault(); resetPassword(); }}>Reset password</Button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginPage;