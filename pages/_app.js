import "../public/assets/css/style.css";
import React, {useEffect} from 'react';
import Layout from "../src/component/layout";
import {Provider} from 'react-redux';
import store from "../src/redux/store";
import {GoogleOAuthProvider} from "@react-oauth/google";
import 'react-loading-skeleton/dist/skeleton.css'

const REACT_APP_GOOGLE_CLIENT_ID = '131147178957-dfv9jbs0pnjdko17ib462ftgrqnqmmq0.apps.googleusercontent.com'

function App({Component,pageProps}) {


    return (
        <>
            <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
                <Provider store={store}>
                    <Layout>
                        {<Component {...pageProps}/>}
                    </Layout>
                </Provider>
            </GoogleOAuthProvider>
        </>
    );
}

export default App;