import { useState } from "react";
import styles from "../styles/home.module.css";

const Home = () => {
    const [showInput, setShowInput] = useState(false);
    
    const toggleInput = () => {
        setShowInput(!showInput)
    }

  return (
    <>
      <main>
        <div className={styles.header}>
          <h1>Todo</h1>

          <button className={styles.menu_btn}>
            <span className="material-symbols-outlined">side_navigation</span>
          </button>
        </div>

        <div className={styles.search}>
          <span className="material-symbols-outlined">search</span>
          <input type="text" placeholder="Search todo..." />
        </div>

        <div className={styles.wrapper}>
          {showInput ? (
            <div className={styles.input_wrap}>
              <textarea placeholder="Enter todo..."></textarea>
              <div className={styles.btns}>
                <button onClick={toggleInput} className={styles.close}>Close</button>
                <button className={styles.add}>
                  Add <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          ) : (
                          <button
                              onClick={toggleInput}
                              className={styles.toggle}>
              Add task &nbsp; <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
