import React, { useRef } from 'react';
import './videochat2.css';

const VideoCall: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const startMeeting = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const stringLength = 30;

    function pickRandom() {
      return possible[Math.floor(Math.random() * possible.length)];
    }

    const randomString = Array.from({ length: stringLength }, pickRandom).join('');
    const domain = "meet.jit.si";
    const options = {
      roomName: randomString,
      parentNode: containerRef.current,
      width: 600,
      height: 600,
    };

    if (window.JitsiMeetExternalAPI) {
      new window.JitsiMeetExternalAPI(domain, options);
    } else {
      alert("Jitsi Meet API script not loaded.");
    }
  };

  return (
    <div className="thebody text-center">
      <nav className="navbar navbar-dark" style={{ backgroundColor: 'purple', boxShadow: '2px 4px rgba(226, 203, 242,0.5)' }}>
        <span className="navbar-brand" style={{ fontSize: '40px', color: '#9864bd' }}>Video Calling</span>
      </nav>
      <div className="container align-items-center" style={{ marginTop: '15%' }}>
        <div className="transbox text-center">
          <button onClick={startMeeting} className="btn btn-light btn-lg">
            <b>Start a new meeting</b>
          </button>
        </div>
      </div>
      <div ref={containerRef} id="jitsi-container" className="container align-items-center"></div>
    </div>
  );
};

export default VideoCall;
