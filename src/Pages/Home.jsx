import { useState } from "react";
import styles from "../styles/home.module.css";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const [showInput, setShowInput] = useState(false);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const boxVars = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };

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
            <AnimatePresence mode="wait">
              <motion.div
                variants={boxVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className={styles.input_wrap}
              >
                <textarea placeholder="Enter todo..."></textarea>
                <div className={styles.btns}>
                  <button onClick={toggleInput} className={styles.close}>
                    Close
                  </button>
                  <button className={styles.add}>
                    Add <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <button onClick={toggleInput} className={styles.toggle}>
              Add task &nbsp; <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
