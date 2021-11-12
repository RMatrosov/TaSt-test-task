import React, {FC, useState} from 'react';
import styles from '../blocks/AddUser.module.css'
import {Link} from "react-router-dom";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputGroup from "./InputGroup";
import {TNewUser} from "../types/TNewUser";

type TAddUserProps = {
    addUser: (item:TNewUser) => void
}

const AddUser: FC<TAddUserProps> = ({addUser}) => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [about, setAbout] = useState<string>('');
    const [link, setLink] = useState<string>('');

    const addSchema = yup.object().shape({
        Name: yup.string()
            .matches(/^([^0-9]*)$/, "Name should not contain numbers")
            .min(2, "Must be more than 2 characters")
            .required("Name is a required field"),
        Email: yup.string()
            .email("Email should have correct format")
            .required("Email is a required field"),
        Job: yup.string()
            .matches(/^([^0-9]*)$/, "About should not contain numbers")
            .min(2, "Must be more than 2 characters")
            .required("About is a required field"),
        Link: yup.string()
            .url('Should be a valid URL or nothing')
    });

    const {register, formState: {errors}, handleSubmit} = useForm({
        resolver: yupResolver(addSchema),
        mode: "onBlur",
    });

    function onSubmit() {
        if (link !== '') {
            const newUser = {name, email, about, link}
            addUser(newUser)
        } else {
            const newUser = {name, email, about}
            addUser(newUser)
        }
    }

    return (
        <div className={styles.add__user_wrapper}>
            <div className={styles.container}>
                <form action="#" className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <h3 className={styles.add__user_title}>Create user</h3>

                    <InputGroup value={"Name*"}>
                        <input type="text" className={styles.input}
                               value={name || ''}
                               {...register("Name", {required: true})}
                               placeholder='enter name...'
                               onChange={(e) =>
                                   setName(e.target.value)}
                        />
                    </InputGroup>
                    <p className={styles.error}>{errors.Name?.message}</p>

                    <InputGroup value={"Email*"}>
                        <input type="text" className={styles.input} id="email"
                               value={email || ''}
                               placeholder='enter email...'
                               {...register("Email", {required: true})}
                               onChange={(e) =>
                                   setEmail(e.target.value)}
                        />
                    </InputGroup>
                    <p className={styles.error}>{errors.Email?.message}</p>

                    <InputGroup value={"Job*"}>
                        <input type="text" className={styles.input} id="Job"
                               value={about || ''}
                               placeholder='enter job...'
                               {...register("Job", {required: true})}
                               onChange={(e) =>
                                   setAbout(e.target.value)}
                        />
                    </InputGroup>
                    <p className={styles.error}>{errors.Job?.message}</p>

                    <InputGroup value={"Link"}>
                        <input type="text" className={styles.input} id="Link"
                               value={link || ''}
                               placeholder='enter link...'
                               {...register("Link", {required: true})}
                               onChange={(e) =>
                                   setLink(e.target.value)}
                        />
                    </InputGroup>
                    <p className={styles.error}>{errors.Link?.message}</p>

                    <div className={styles.buttons__group}>
                        <button
                            type="submit" className={styles.popup__button_save}>save
                        </button>
                        <Link to='/' className="add">
                            <button
                                type="button" className={styles.popup__button_delete}>back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
