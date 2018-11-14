import React, { Component } from 'react'
import _ from 'lodash'
import QuestionnaireTable from './QuestionnaireTable'
import Footer from '../app/Footer'

class QuestionnaireContainer extends Component {
  render() {
      const numberOfQuestionnaire = `Total of ${ _.size(this.props.qs)} questionnaires`
    return <div>
      <h3>Questionnaires</h3>
      <QuestionnaireTable qs={ this.props.qs } />
      <Footer leftMessage='&copy; The FHNW Team' rightMessage={numberOfQuestionnaire} />
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