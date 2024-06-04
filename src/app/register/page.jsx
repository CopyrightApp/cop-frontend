'use client'
import { useState, useLayoutEffect, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material';
import Navbar from '../components/navbar';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie'


import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

import './styles.css'


function Register() {
    const { t } = useTranslation();
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [alertValue, setAlertValue] = useState()
    const [registerSuccessfull, setRegisterSuccessfull] = useState(false)
    const router = useRouter();
    const handleLogin = () => {
        router.push('./login')
    }

    const handleSubmit = (e) => {

        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const form = e.target;
        const formData = new FormData(form);

        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });


        fetch('http://localhost:4000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.status !== 201) {
                setAlertValue("UserExists")
                setIsError(true)
                return
            } else {
                setIsError(false)
                setRegisterSuccessfull(true)
                return response.json()
            }
        }).then(data =>{
            Cookies.set("jwtToken", data.token)
            router.push('/checker')
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            setIsError(true);
            setAlertValue("PasswordMatch")
        } else {
            setIsError(false);
        }
    }, [password, confirmPassword]);

    return (
        <div >
            <Navbar />

            <section className="bg-gray-50 dark:bg-gray-900 py-7">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {registerSuccessfull && <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                {t("RegisterMessage")}
                            </Alert>}
                            {isError && !registerSuccessfull && <Alert severity="error">{t(alertValue)}</Alert>}

                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                {t("CreateAccount")}
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("YourEmail")}</label>
                                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("Password")}</label>
                                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t("ConfirmPassword")}</label>
                                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">{t("TermsAndConditions")}</label>
                                    </div>
                                </div>
                                <Button type="submit" fullWidth sx={{ borderRadius: '10px', height: '40px', color: 'white', bgcolor: 'black', '&:hover': { bgcolor: '#323232' } }}>{t('SignIn')}</Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    {t('DontHaveAnAccount')} <a onClick={handleLogin} className="fo nt-medium text-primary-600 hover:underline dark:text-primary-500">{t('SignIn')}</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}


export default Register;