import { useState } from "react";
import styles from "../styles/home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() === "") {
      toast.warning("Add a todo first!");
    } else {
      setTodos((t) => [...t, newTodo]);
      setNewTodo("");
      setShowInput(!showInput);
    }
  };

  const deleteTodo = (index) => {
    const updatedTodo = todos.filter((_, i) => i !== index);
    setTodos(updatedTodo);
  };
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
      transition: {
        type: "spring",
        stiffness: "400",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };
  const todoVars = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
      staggerChildren: "0.2s",
      transition: {
        delay: 0.2,

        type: "spring",
        stiffness: "400",
      },
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

        <div>
          <ul className={styles.todos}>
            <AnimatePresence mode="popLayout">
              {todos.map((todo, index) => (
                <motion.li
                  variants={todoVars}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={styles.todo}
                  key={index}
                >
                  <p>{todo}</p>
                  <button
                    className={styles.del}
                    onClick={() => deleteTodo(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>

        <div className={styles.wrapper}>
          {showInput ? (
            <AnimatePresence>
              <motion.div
                variants={boxVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className={styles.input_wrap}
              >
                <textarea
                  rows={4}
                  placeholder="Enter todo..."
                  onChange={handleChange}
                ></textarea>
                <div className={styles.btns}>
                  <button onClick={toggleInput} className={styles.close}>
                    Close
                  </button>
                  <button className={styles.add} onClick={addTodo}>
                    Add <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className={styles.end}>
              <motion.button
                layout
                onClick={toggleInput}
                className={styles.toggle}
              >
                Add task &nbsp; <i className="fa-solid fa-plus"></i>
              </motion.button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
