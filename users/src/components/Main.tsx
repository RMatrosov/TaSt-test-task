import React, {FC, useMemo, useState} from 'react';
import styles from '../blocks/Main.module.css'
import User from "./User";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "./Loading";
import EditUserPopup from "./EditUserPopup";
import {deleteUserServer, pathUser, setEditedUsers, setIsOpen} from "../redux/actions/actions";
import {TNewUser} from "../types/TNewUser";
import {TUser} from "../types/TUser";
import {AppStateType} from "../redux";


type TMainProps = {
    singOut: () => void
}

const Main: FC<TMainProps> = ({singOut}) => {

    const [search, setSearch] = useState('');
    const dispatch = useDispatch()
    const users = useSelector((state: AppStateType) => state.userReducer.users)
    const isLoaded = useSelector((state: AppStateType) => state.userReducer.isLoaded)
    const isOpen = useSelector((state: AppStateType) => state.userReducer.isOpen)
    const editedUser = useSelector((state: AppStateType) => state.userReducer.editedUser)

    async function onCardDelete(id: string) {
        if (window.confirm("Delete?")) {
            dispatch(deleteUserServer(id))
            dispatch(setIsOpen(false))
        }
    }

    function onCardEdit(user: TUser) {
        dispatch(setEditedUsers(user))
        dispatch(setIsOpen(true))
    }

    async function handleSave(id: string, newUser: TNewUser) {
        const user = {id: id, newUser: newUser}
        dispatch(pathUser(user))
        dispatch(setIsOpen(false))
    }

    const dataSearch = useMemo(() => {
        return users.filter((item: TUser) => {
            return Object.keys(item)
                .some((key) =>
                    (item[key]).toString().toLowerCase().includes(search.toString().toLowerCase())
                )
        })
    }, [search, users]);


    return (
        <div className={styles.main__wrapper}>
            <EditUserPopup
                onCardDelete={onCardDelete}
                onSave={handleSave}
                editedUser={editedUser}
                onClose={() => dispatch(setIsOpen(false))}
                isOpen={isOpen}/>
            <div className={styles.input__block}>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search…'
                    className={styles.main__input} type="text"/>
                <button
                    onClick={singOut}
                    className={styles.out}>out
                </button>
                <Link to='/add-user' className={styles.add}>
                    <button className={styles.add__btn}>add user</button>
                </Link>
            </div>
            <div className={styles.users__title}>
                <div className={styles.users__id + ' ' + styles.text}>№</div>
                <div className={styles.users__date + ' ' + styles.text}>Date</div>
                <div className={styles.users__name + ' ' + styles.text}>Name</div>
                <div className={styles.users__job + ' ' + styles.text}>Job</div>
                <div className={styles.users__email + ' ' + styles.text}>Email</div>
            </div>
            <div className={styles.user__wrapper}>
                {isLoaded ? dataSearch.map((user: TUser, i: number) => <User
                    index={i}
                    onCardEdit={onCardEdit}
                    user={user} key={user._id}/>) : <Loading/>}

            </div>
        </div>
    );
};

export default Main;
