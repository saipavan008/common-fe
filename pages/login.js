import React, {useState} from 'react';
import {deepClone} from "../src/component/helpers";
import API from "../src/component/api/Auth";
import {useDispatch, useSelector} from "react-redux";
import {setUserDetails} from "../src/redux/actions/stateActions";
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import {useRouter} from "next/router";
import Cookies from "universal-cookie";

const api = new API();
const cookies = new Cookies;

function Login(props) {

    const dispatch = useDispatch();
    const data = useSelector(state => state);
    const router = useRouter();

    const [formData,setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorMessage,setErrorMessage] = useState({});

    const handleChange = (val) => {
        setErrorMessage({});
        const shallowCopy = deepClone(formData);
        shallowCopy[val.name] = val.value;
        setFormData(shallowCopy);
    };

    const handleLogin = (data, isSocialLogin=false) => {
        const payload = isSocialLogin ? data : formData;
        api.login(payload).then(res => {
            dispatch(setUserDetails(res.data.data));
            setErrorMessage({error: true, type: "text-success", text: res.data.message})
            setTimeout(() => {
                cookies.set('frugy_user', res?.data?.data)
                router.push('/')
            }, 1000)
        }).catch((e) => {
            setErrorMessage({error: true, type: "text-danger", text: e.response?.data?.message})
        })
    };

    return (
        <>
            <div className="container py-md-5 py-4">
                <div className="col-md-5 mx-auto">
                    <div className="card p-3">
                        <h3 className="text-center">Login</h3>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={formData.email} onChange={(e) => handleChange(e.target)} placeholder="Enter email"/>
                            {!!errorMessage.email &&<p className="mb-0 text-danger">{errorMessage.text}</p>}
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" value={formData.password} name="password" onChange={(e) => handleChange(e.target)} placeholder="Enter password" type="text"/>
                            {!!errorMessage.password &&<p className="mb-0 text-danger">{errorMessage.text}</p>}
                        </div>
                        <a href="/forgot-password" className="link-primary mb-2 ms-auto">Forgot password</a>
                        <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
                        {!!errorMessage.error &&<p className={`mb-0 text-center mt-1 mb-0 ${errorMessage.type}`}>{errorMessage.text}</p>}
                        {/*<GoogleLogin onSuccess={(credentials) => {*/}
                        {/*   handleLogin({...jwtDecode(credentials.credential), isGoogleLogin: true}, true)*/}
                        {/*}}/>*/}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;