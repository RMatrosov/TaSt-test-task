import React, {FC, ReactChild, ReactChildren} from 'react';
import styles from "../blocks/AddUser.module.css";


type TInputGroupProps = {
    value:string
    children: ReactChild | ReactChildren;
}

const InputGroup:FC<TInputGroupProps> = ({children, value}) => {

  return (
      <div className={styles.wrapper}>
        <div className={styles.group}>
          <h5 className={styles.heading}>{value}</h5>
          {children}
        </div>
      </div>
  );
};

export default InputGroup;
