import React, { Component } from "react";
import "../../styles/loggedin.css";
import checkIcon from '../../resources/check-icon.png'
import editIcon from '../../resources/edit-icon.png'
import xIcon from '../../resources/x-icon.png'
import LanguageApiService from '../../services/language-api-service'

function Word(word) {
  return  <div className="single-word">
  <div className="front"> {word.original} </div>
  <div className="back"> {word.translation} </div>
  <img className="edit-icon" src={editIcon} />
  <img className="x-icon" src={xIcon} />
</div>
}

class DashboardRoute extends Component {

  state = {
    wordList: []
  }

  componentDidMount() {
    LanguageApiService.getHead().then(console.log)
     LanguageApiService.getWords().then(wordList => {
       this.setState({wordList: wordList.words})
     })
  }




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
          {this.state.wordList.map(Word)}
          <button className="add-button"> + </button>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
