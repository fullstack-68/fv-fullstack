import Modal from "react-modal";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useShallow } from "zustand/shallow";

import UserList from "./components/UserList";
import FormVanilla from "./components/formVanilla";
import useStore from "./hooks/store";
import useUsers from "./hooks/useUser";

Modal.setAppElement("#root");

function App() {
  useUsers();
  const [users, setOpenVN] = useStore(
    useShallow((state) => [state.users, state.setOpenVN]),
  );
  const [parent] = useAutoAnimate({
    duration: 250,
    easing: "ease-in-out",
  });
  return (
    <div className="container">
      {/* Navigation Bar */}
      <header style={{ padding: "1rem 0" }}>
        <nav>
          <ul>
            <li>
              <a href="/" className="custom-icon">
                <i className="fa-solid fa-xl fa-home"></i>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={() => setOpenVN(true)}>Form Vanilla</button>
            </li>
          </ul>
        </nav>
      </header>
      {/* Users */}
      <div ref={parent}>
        {users.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>
      {/* Forms */}
      <FormVanilla />
    </div>
  );
}

export default App;
