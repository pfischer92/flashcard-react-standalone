import React, { Component } from 'react'
import _ from 'lodash'
import QuestionnaireTable from './QuestionnaireTable'
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog'


class QuestionnaireContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { qs: [] }
  }

  generateIndex = questionnaires => 
    _.get(_.last(questionnaires), 'id', 0) + 1

  create = (title, description) => {
    fetch(this.props.serverUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ title: title, description: description })
    })
      .then(response => {
        if(response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.');
      })
      .then(questionnaire => this.setState({ qs: _.concat(this.state.qs, questionnaire) }))
      .catch(error => console.error(error))
  }

  update = questionnaire => {
    fetch(`${ this.props.serverUrl }/${ questionnaire.id }`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(questionnaire)
    })
      .then(response => {
        if(response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.');
      })
      .then(questionnaire => this.setState({ qs: _.map(this.state.qs, q => q.id === questionnaire.id ? questionnaire : q) }))
      .catch(error => console.error(error))
  }

  _delete = id => {
    fetch(`${ this.props.serverUrl }/${ id }`, {
      method: 'DELETE'
    })
      .then(response => {
        if(response.ok) {
          this.setState({ qs : _.reject(this.state.qs, { id: id })})
        }
        else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(error => console.error(error))
    
  }
  
  componentDidMount() {
    fetch(this.props.serverUrl)
      .then(response => response.json())
      .then(questionnaires => this.setState({ qs: questionnaires }))
      .catch(error => console.error(error))
  }

  render() {
    return <div>
      <QuestionnaireCreateDialog create={ this.create } />
      <h3>Questionnaires</h3>
      <QuestionnaireTable update={ this.update } _delete={ this._delete } qs={ this.state.qs } />
    </div>
  }
}

export default QuestionnaireContainer;