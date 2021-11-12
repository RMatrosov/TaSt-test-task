import React, {FC} from 'react';
import styles from '../blocks/User.module.css'
import {TUser} from "../types/TUser";

type TUserProps = {
    user: TUser
    onCardEdit: (user: TUser) => void
    index: number
}

const User: FC<TUserProps> = ({user, onCardEdit, index}) => {

    function handleEditClick() {
        onCardEdit(user)
    }

    const regExp = /[0-9]{1,4}\-[0-9]{1,3}\-[0-9]{1,3}/g;

    const createDate = user.createdAt.match(regExp)

    return (
        <div className={styles.user}>
            <div className={styles.user__info}>
                <div className={styles.user__text + ' ' + styles.id}>{index + 1}</div>
                <div className={styles.user__text + ' ' + styles.createdAt}>{createDate}</div>
                <div className={styles.user__text + ' ' + styles.name}>{user.name}</div>
                <div className={styles.user__text + ' ' + styles.about}>{user.about}</div>
                <div className={styles.user__text + ' ' + styles.email}>{user.email}</div>
                <div className={styles.button__group}>
                    <button
                        onClick={handleEditClick}
                        className={styles.user__btn}>edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User;
