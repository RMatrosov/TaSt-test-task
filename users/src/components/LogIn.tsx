import React, {FC} from 'react';
import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import styles from '../blocks/LogIn.module.css'

type TLogInProps = {
    handleAuthorize: (email: string, password: string) => void
}

const LogIn: FC<TLogInProps> = ({handleAuthorize}) => {

    const schema = yup.object().shape({
        Email: yup.string()
            .email("адрес электронной почты должен содержать символ @")
            .required("Введите адрес электронной почты"),
        password: yup.string()
            .min(8, "пароль должен содержать от 8 до 32 символов")
            .max(32, "пароль должен содержать от 8 до 32 символов")
            .required("обязательное поле")
    });

    const {register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const [email, setEmail] = useState<string>('test@test.com');
    const [password, setPassword] = useState<string>('test12345');

    function onSubmit() {
        handleAuthorize(email, password)
    }

    return (
        <div className={styles.log__in}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.log__in_wrapper} noValidate>
                <h4 className={styles.log__in_title}>Вход</h4>
                <input type="email" className={styles.log__in_input}
                       placeholder='Email'
                       {...register("Email", {required: true})}
                       onChange={(e) => setEmail(e.target.value)}
                       value={email || ''}
                />
                <p className={styles.log__in_error}>{errors.Email?.message}</p>
                <input type="password" className={styles.log__in_input}
                       placeholder='Password'
                       value={password || ''}
                       {...register("password", {required: true})}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <p className={styles.log__in_error + ' ' + styles.second} id='secondError'>{errors.password?.message}</p>
                <button type='submit' className={styles.log__in_button}>Войти</button>
            </form>
        </div>
    );
};

export default LogIn;
