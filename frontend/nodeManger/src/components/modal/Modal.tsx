import React, { useState } from "react";
import "./modal.css";
import { useNoteContext } from "../../utilis/context/Context";
import { IoClose } from "react-icons/io5";
import { RiCheckDoubleLine } from "react-icons/ri";
import { FaBoxArchive } from "react-icons/fa6";
import modalIcon from "../../assets/modalicon.jpg";
import { createNote } from "../../utilis/axios";

type Props = {
  data: {
    category: string;
    content: string;
    createdAt: string;
    id: number;
    owner: string;
    title: string;
    updatedAt: string;
    __v: number;
    _id: string;
  } | null;
};

const Modal = (props: Props) => {
  const { closeNoteModal, modal } = useNoteContext();
  const [note, setNote] = useState({ ...props?.data });

  const handleBackdropClick = () => {
    // console.log("backdrop", { modal });
    closeNoteModal(!modal);
  };

  const handleChange = (key: string, value: string) => {
    setNote({ ...note, [key]: value });
  };

  // createNote title, content, category, owner
  return (
    <>
      <div className="modal-backdrop" onClick={handleBackdropClick}></div>
      {/* <div className="image-wrapper">
        <img src={modalIcon} className="image" />
      </div> */}
      <div className={`modal-wrapper ${modal ? "active" : ""}`}>
        <div className="modal-header">
          <input
            value={note?.title}
            placeholder="Note Title"
            className="note-title"
            onChange={(text) => handleChange("title", text.target.value)}
          />

          <span className="modal-close" onClick={handleBackdropClick}>
            <IoClose size={18} color="#FFF" className="pointer" />
          </span>
        </div>
        {/* <input
          value={note?.content}
          placeholder="Description"
          className="modal-content desc-note"
          onChange={(text) => handleChange("content", text.target.value)}
        /> */}
        <textarea
          value={note?.content}
          placeholder="Description"
          className="modal-content desc-note"
          name="Text1"
          cols="40"
          rows="8"
          onChange={(text) => handleChange("content", text.target.value)}
        ></textarea>
        {/* <div className="modal-content">Modal</div> */}
        <div className="modal-action-row">
          <button className="modal-save pointer">
            <RiCheckDoubleLine size={18} />
            save
          </button>
          <button className="modal-delete pointer">
            <FaBoxArchive size={16} />
            delete
          </button>
        </div>
      </div>
      {/* <div className={`modal-background ${modal ? "active" : ""}`}></div> */}
    </>
  );
};

export default Modal;
