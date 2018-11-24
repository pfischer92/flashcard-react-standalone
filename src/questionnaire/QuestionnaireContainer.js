import React, { Component } from 'react'
import _ from 'lodash'
import QuestionnaireTable from './QuestionnaireTable'
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog'

class QuestionnaireContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { qs: this.props.qs}
  }

  generateIndex = questionnaires => 
    _.get(_.last(questionnaires), 'id', 0) + 1

  create = (title, description) => {
    this.setState({ qs: _.concat(this.state.qs, { id: this.generateIndex(this.state.qs), title: title, description: description }) })
  }

  update = questionnaire => {
    this.setState({ qs: _.map(this.state.qs, q => q.id === questionnaire.id ? questionnaire : q) })
  }

  _delete = id => {
    this.setState({ qs : _.reject(this.state.qs, { id: id })})
  }

  render() {
    return <div>
      <QuestionnaireCreateDialog create={ this.create } />
      <h3>Questionnaires</h3>
      <QuestionnaireTable update={ this.update } _delete={ this._delete } qs={ this.state.qs } />
    </div>
  }
}

QuestionnaireContainer.defaultProps = {
    qs:[
      {'id': 1, 'title': 'Test Title 1', 'description': 'Test Description 1'},
      {'id': 2, 'title': 'Test Title 2', 'description': 'Test Description 2'},
      {'id': 3, 'title': 'Test Title 3', 'description': 'Test Description 3'},
      {'id': 4, 'title': 'Test Title 4', 'description': 'Test Description 4'},
      {'id': 5, 'title': 'Test Title 5', 'description': 'Test Description 5'}
    ]
  }

export default QuestionnaireContainer;