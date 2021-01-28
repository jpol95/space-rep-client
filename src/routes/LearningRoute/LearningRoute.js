import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
import '../../styles/card.css'

class LearningRoute extends Component {
  render() {
    return (
      <section class="learning">
            <div class="score">
        Score: <div class="tally">195</div>
    </div>
    <div class="card">
        <div class="record">
            <div class="right">10</div>/<div class="wrong">7</div>
        </div>
        <div class="word">Weltschmertz</div>
    </div>
    <div class="answer-input">
        <label for="answer">Answer:</label>
        <input id="answer" />
    </div>
    <button class="next-button">
        {"Next ->"}
    </button>
      </section>
    );
  }
}

export default LearningRoute
