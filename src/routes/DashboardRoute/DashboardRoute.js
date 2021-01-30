import React, { Component } from "react";
import "../../styles/loggedin.css";
import checkIcon from '../../resources/check-icon.png'
import editIcon from '../../resources/edit-icon.png'
import xIcon from '../../resources/x-icon.png'
import LanguageApiService from '../../services/language-api-service'
import {Link} from 'react-router-dom'

function Word(word) {
  return  <div className="single-word">
  <div className="front"> {word.original} </div>
  <div className="back"> {word.translation} </div>
  <div class="correct-display"> &#10004;{word.correct_count}  </div>
  <div class="incorrect-display"> &#10006;{word.incorrect_count} </div>
</div>
}

class DashboardRoute extends Component {

  state = {
  wordList: [], 
  language: {}
  }

  componentDidMount() {
     LanguageApiService.getWords()
     .then(languageWords => {
       this.setState({wordList: languageWords.words, language: languageWords.language})
      })
  }




  render() {
    console.log(this.state.language)
    return (
      <section className="dashboard">
        <h1>{this.state.language.name}</h1>
        <div className="score">
          Score: <div class="tally">{this.state.language.total_score}</div>
        </div>
        <div className="wordlist">
          {this.state.wordList.map(Word)}
          <Link to="/learn" className="learn-button"> Learn </Link>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
