import { useState } from "react";
import styles from "../styles/home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

const Home = () => {
  const [showInput, setShowInput] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [search, setSearch] = useState("");
  const [newLine, setNewLine] = useState(false);

  const filteredItems = todos.filter((item) => {
    return item.toLowerCase().includes(search.toLowerCase());
  })

  const handleChange = (e) => {
    setNewTodo(e.target.value);

  }
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setNewLine(true);
    }
  }


    const addTodo = () => {
      if (newTodo.trim() === "") {
        toast.warning("Add a todo first!");
      } else {
        const newTodos = newTodo.split('\n').filter(todo => todo.trim() !== ''); // Filter out empty lines
        setTodos((prevTodos) => [...prevTodos, ...newTodos]);
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
          stiffness: "700",
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
        staggerChildren: 0.3,
        transition: {
          delay: 0.2,
          type: "spring",
          stiffness: "700",
        },
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
            <input
              type="text"
              placeholder="Search todo..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <p className={styles.info}>Press Enter after each todo entry in the textarea to add more than one task.</p>
          <div>
            <ul className={styles.todos}>
              <AnimatePresence mode="popLayout">
                {filteredItems.map((todo, index) => (
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
                  <div className={styles.area}>
                    <textarea
                      rows={4}
                      placeholder="Enter todo..."
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                    >
                    </textarea>
                    <span className={styles.tip}>{newLine ? "Multi-todo" : "Single todo"}</span>
                  </div>
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
