import React, { Component } from "react";
import "../../styles/loggedin.css";
import LanguageApiService from '../../services/language-api-service'
import {Link} from 'react-router-dom'

function Word(word) {
  return  <div className="single-word">
  <div className="front"> {word.original} </div>
  <div className="back"> {word.translation} </div>
  <div className="correct-display"> &#10004;{word.correct_count}  </div>
  <div className="incorrect-display"> &#10006;{word.incorrect_count} </div>
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
    return (
      <section className="dashboard">
        <h2>{this.state.language.name}</h2>
        <div className="score">
          Score: <div className="tally">{this.state.language.total_score}</div>
        </div>
        <div className="wordlist">
          {this.state.wordList.map(Word)}
          <Link to="/learn" className="learn-button">Start practicing</Link>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
