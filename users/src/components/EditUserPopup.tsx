import React, {FC, SyntheticEvent, useEffect, useState} from 'react';
import styles from '../blocks/EditUserPopup.module.css'
import cn from 'classnames';
import {TNewUser} from "../types/TNewUser";
import {TUser} from "../types/TUser";


type TEditUserPopupProps = {
    isOpen: boolean
    onClose: () => void
    editedUser: TUser
    onSave: (id: string, item: TNewUser) => void
    onCardDelete: (id: string) => void
}

const EditUserPopup: FC<TEditUserPopupProps> = ({isOpen, onClose, editedUser, onSave, onCardDelete}) => {

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userJob, setUserJob] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [userDate, setUserDate] = useState<string>('');
    const [userImg, setUserImg] = useState<string>('');

    useEffect(() => {
        setUserName(editedUser.name);
        setUserEmail(editedUser.email);
        setUserJob(editedUser.about)
        setUserId(editedUser._id)
        setUserDate(editedUser.createdAt)
        setUserImg(editedUser.link)
    }, [editedUser, isOpen]);

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const newUser = {
            "name": userName,
            "email": userEmail,
            "about": userJob,
            "link": userImg,
        }
        onSave(editedUser._id, newUser)
    }

    return (
        <div className={cn(styles.popup, {
            [styles.popup_opened]: isOpen
        })}>
            <div className={styles.popup__container}>
                <form action="#" className={styles.form} onSubmit={handleSubmit}>

                    <button onClick={onClose} type="button"
                            className={styles.close}>Close
                    </button>
                    <div className={styles.info__wrapper}>
                        <div className={styles.group__wrapper}>
                            <div className={styles.group}>
                                <h5 className={styles.form__heading}>ID</h5>
                                <p className={styles.form__value}>{userId}</p>
                            </div>
                            <div className={styles.group}>
                                <h5 className={styles.form__heading}>Date</h5>
                                <p className={styles.form__value}>{userDate}</p>
                            </div>
                        </div>
                        <img src={userImg} alt="photo-profile" height={120} className={styles.form__img}/>
                    </div>
                    <div className={styles.group}>
                        <h5 className={styles.form__heading}>Name</h5>
                        <input type="text" className={styles.form__input} id="name"
                               value={userName || ''}
                               placeholder='send name'
                               onChange={(e) =>
                                   setUserName(e.target.value)}
                        />
                    </div>
                    <div className={styles.group}>
                        <h5 className={styles.form__heading}>Email:</h5>
                        <input type="text" className={styles.form__input} id="email"
                               value={userEmail || ''}
                               placeholder=''
                               onChange={(e) =>
                                   setUserEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.group}>
                        <h5 className={styles.form__heading}>Job</h5>

                        <input type="text" className={styles.form__input} id="Job"
                               value={userJob || ''}
                               placeholder=''
                               onChange={(e) =>
                                   setUserJob(e.target.value)}
                        />
                    </div>
                    <div className={styles.group}>
                        <h5 className={styles.form__heading}>Link</h5>

                        <input type="text" className={styles.form__input} id="Link"
                               value={userImg || ''}
                               placeholder=''
                               onChange={(e) =>
                                   setUserImg(e.target.value)}
                        />
                    </div>

                    <div className={styles.buttons__group}>
                        <button
                            type="submit" className={styles.save}>save
                        </button>
                        <button
                            onClick={() => onCardDelete(editedUser._id)}
                            type="button" className={styles.delete}>delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserPopup;
