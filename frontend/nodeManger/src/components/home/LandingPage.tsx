import React from "react";
import "./landing.css";
import landingBg from "../../assets/landingBg.jpg";
import { PiTelegramLogoFill } from "react-icons/pi";
import { useNoteContext } from "../../utilis/context/Context";
import { Body } from "..";

type Props = {};

const LandingPage = (props: Props) => {
  const { login, openLoginModal, loginType, userData } = useNoteContext();

  const handleStarted = () => {
    openLoginModal("login");
  };

  // if (Object.keys(userData).length !== 0) {
  return <Body />;
  // }
  return (
    <div className="landing-wrapper">
      <div className="note-desc-wrapper">
        <h1>Note Manger</h1>
        <h3>Take note of almost anything</h3>
        <p>
          {` Notes is the best place to jot down \n quick thoughts or to save longer
          notes filled with checklists, \n images, web links, scanned documents,\n
          handwritten notes, or sketches.\n And with iCloud, it's easy to keep all
          your devices \nin sync, so you’ll always have your notes with you.`}
        </p>
        <div className="get-started" onClick={handleStarted}>
          Let's get Started
          <PiTelegramLogoFill size={22} className="started-icon" />
        </div>
      </div>
      <img src={landingBg} alt="landing background" className="landing-bg" />
    </div>
  );
};

export default LandingPage;
