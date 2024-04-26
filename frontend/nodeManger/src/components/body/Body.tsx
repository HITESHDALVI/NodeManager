import React, { useEffect, useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import "./body.css";
import { Note, Modal } from "..";
import { useNoteContext } from "../../utilis/context/Context";
import { getNotes } from "../../utilis/axios";

type Props = {};

const Body = (props: Props) => {
  const { modal, openNoteModal } = useNoteContext();
  const [notes, setNotes] = useState([]);
  const handleModal = (item: any, id: number) => {
    openNoteModal(item, id);
  };

  const fetchNotesData = () => {
    getNotes()
      .then((res) => {
        const { message, data } = res?.data;
        setNotes(data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  useEffect(() => {
    fetchNotesData();
  }, []);

  return (
    <div className="body-wrapper">
      <div className="add-note" onClick={() => handleModal(null, 0)}>
        <MdOutlineLibraryAdd color="#FFF" size={20} />
        <p className="add-note-text">Add Note</p>
      </div>
      <div className="note-container">
        {notes.map((item, index) => {
          return (
            <Note
              item={item}
              key={index}
              title={item?.title}
              content={item?.content}
              time={item?.createdAt}
              bgColor={item?.bg_color}
              borderTop={item?.border_top}
              id={item?._id}
              openModal={handleModal}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
