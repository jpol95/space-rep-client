import React, { Component } from "react";
import "../../styles/loggedin.css";
import checkIcon from '../../resources/check-icon.png'
import editIcon from '../../resources/edit-icon.png'
import xIcon from '../../resources/x-icon.png'

class DashboardRoute extends Component {
  render() {
    return (
      <section>
        <h1>German</h1>
        <div className="progress-section">
          10/17
          <div className="progress">
            <div className="progress-bar"></div>
          </div>
        </div>
        <div className="wordlist">
          <div className="single-word">
            <input />
            <input />
            <img className="check-icon" src={checkIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <div className="single-word">
            <div className="front"> Front word </div>
            <div className="back"> Back word </div>
            <img className="edit-icon" src={editIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <div className="single-word">
            <div className="front"> Front word </div>
            <div className="back"> Back word </div>
            <img className="edit-icon" src={editIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <div className="single-word">
            <div className="front"> Front word </div>
            <div className="back"> Back word </div>
            <img className="edit-icon" src={editIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <div className="single-word">
            <div className="front"> Front word </div>
            <div className="back"> Back word </div>
            <img className="edit-icon" src={editIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <div className="single-word">
            <div className="front"> Front word </div>
            <div className="back"> Back word </div>
            <img className="edit-icon" src={editIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <div className="single-word">
            <div className="front"> Front word </div>
            <div className="back"> Back word </div>
            <img className="edit-icon" src={editIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <div className="single-word">
            <div className="front"> Front word </div>
            <div className="back"> Back word </div>
            <img className="edit-icon" src={editIcon} />
            <img className="x-icon" src={xIcon} />
          </div>
          <button className="add-button"> + </button>
        </div>
        <button className="add-button"> + </button>
      </section>
    );
  }
}

export default DashboardRoute;
