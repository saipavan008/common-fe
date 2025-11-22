import React, {useState} from 'react';
import {deepClone} from "@/component/helpers";
import API from "@/component/api/Auth";
import {useRouter} from "next/router";

const api = new API();
function ForgotPassword(props) {

    const [formData , setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage , setErrorMessage] = useState({});
    const router = useRouter();

    const handleChange = (val) => {
        const shallowCopy = deepClone(formData);
        setErrorMessage({});
        shallowCopy[val.name] = val.value
        setFormData(shallowCopy);
    };

    const handleForgotPassword = () => {
        api.forgotPassword(formData).then(res => {
            setErrorMessage({error: true, type: "text-success", text: res.data.message})
            setTimeout(() => {
                router.push('/login')
            }, 1000)
        }).catch(e => {
            setErrorMessage({error: true, type: "text-danger", text: e.data.message})
        })
    };

    return (
        <React.Fragment>
            <div className="container py-md-5 py-4">
                <div className="col-md-5 mx-auto">
                    <div className="card p-3">
                        <h3 className="text-center">Forgot password</h3>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={formData.email} onChange={(e) => handleChange(e.target)} placeholder="Enter email"/>
                            {!!errorMessage.email &&<p className="mb-0 text-danger">{errorMessage.text}</p>}
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input className="form-control" value={formData.password} name="password" onChange={(e) => handleChange(e.target)} placeholder="Enter password" type="text"/>
                            {!!errorMessage.password &&<p className="mb-0 text-danger">{errorMessage.text}</p>}
                        </div>
                        <button className="btn btn-primary" onClick={() => handleForgotPassword()}>Forgot password</button>
                        {!!errorMessage.error &&<p className={`mb-0 text-center mt-1 mb-0 ${errorMessage.type}`}>{errorMessage.text}</p>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ForgotPassword;