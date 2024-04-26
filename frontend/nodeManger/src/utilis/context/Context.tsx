import { ReactNode, createContext, useContext, useState } from "react";
import { Modal } from "../../components";
import LoginModal from "../../components/modal/LoginModal";
const NoteContext = createContext(null);

type NoteCartProviderProps = {
  children: ReactNode;
};

export const useNoteContext = () => {
  return useContext(NoteContext);
};

export function NoteProvider({ children }: NoteCartProviderProps) {
  const [modal, setModal] = useState(false);
  const [noteModalData, setNoteModalData] = useState({});
  const [userLogin, setUserLogin] = useState(true);

  const [login, setLogin] = useState(false);
  const [loginType, setLoginType] = useState("login");
  const [userData, setUserData] = useState({});
  console.log({ noteModalData });
  const openNoteModal = (item: any, id: number) => {
    setModal(true);
    setNoteModalData({ ...item, id });
  };
  const closeNoteModal = () => {
    setModal(false);
  };
  const openLoginModal = (type: string) => {
    setLogin(true);
    setLoginType(type);
  };
  const closeLoginModal = () => {
    setLogin(false);
  };
  return (
    <NoteContext.Provider
      value={{
        modal,
        openNoteModal,
        closeNoteModal,
        login,
        openLoginModal,
        closeLoginModal,
        loginType,
        setLoginType,
        userLogin,
        setUserLogin,
        userData,
        setUserData,
      }}
    >
      {children}
      {modal && <Modal data={noteModalData} />}
      {login && <LoginModal />}
    </NoteContext.Provider>
  );
}
