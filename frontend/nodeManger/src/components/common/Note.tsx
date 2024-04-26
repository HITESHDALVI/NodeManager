import React from "react";
import "../body/body.css";
import { TbEdit } from "react-icons/tb";
import { TbProgressX } from "react-icons/tb";
import moment from "moment";

type Props = {
  item: any;
  title: string;
  content: string;
  time: string;
  bgColor: string;
  borderTop: string;
  openModal: (type: number, id: number) => void;
  id: number;
};

const Note = (props: Props) => {
  const {
    item = {},
    title = "",
    content = "",
    time = "",
    bgColor = "antiquewhite",
    borderTop = "#17c70e",
    openModal,
    id,
  } = props;
  const value = moment(time).format("ddd, MMM Do, YYYY, h:mm A");
  console.log({ item });

  return (
    <div
      className="note"
      style={{ borderTop: `6px solid ${borderTop}`, backgroundColor: bgColor }}
    >
      <div className="note-title title-style">
        <h2 className="title">{title}</h2>
        <TbEdit
          size={22}
          color="#B4BDFF"
          className="pointer"
          onClick={() => openModal(item, 1)}
        />
      </div>
      <p className="desc">
        {item?.category} : {content}
      </p>
      <p className="desc">Writer : {item?.owner}</p>
      <div className="time-container note-title ">
        {value}
        <div className="delete">
          <TbProgressX
            color="red"
            size={22}
            className="delete-note"
            onClick={() => openModal(item, 2)}
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
