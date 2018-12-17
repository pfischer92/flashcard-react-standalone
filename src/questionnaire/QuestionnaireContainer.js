import React, { Component } from 'react'
import _ from 'lodash'
import Loader from '../misc/Loader'
import Message from '../misc/Message'
import QuestionnaireTable from './QuestionnaireTable'
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog'


class QuestionnaireContainer extends Component {

    constructor(props) {
        super(props)
        this.state = { qs: [], isLoading: false, error: false, message: null }
    }

    generateIndex = questionnaires =>
        _.get(_.last(questionnaires), 'id', 0) + 1

    create = (title, description) => {
        this.ajax(
            this.props.serverUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ title: title, description: description })
            },
            questionnaires => this.setState({ qs: _.concat(this.state.qs, questionnaires) })
        )
    }

    read = () => this.ajax(
        this.props.serverUrl,
        { method: 'GET' },
        questionnaires => this.setState({ qs: questionnaires })
    )

    update = questionnaire => {
        this.ajax(
            `${this.props.serverUrl}/${questionnaire.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(questionnaire)
            },
            questionnaire => this.setState({ qs: _.map(this.state.qs, q => q.id === questionnaire.id ? questionnaire : q) })
        )
    }

    _delete = id => {
        this.ajax(
            `${this.props.serverUrl}/${id}`,
            { method: 'DELETE' },
            () => this.setState({ qs: _.reject(this.state.qs, { id: id }) })
        )
    }

    ajax = (url, request, successFn) => {
        this.setState({ isLoading: true, error: false, message: null })
        fetch(url, request)
            .then(response => {
                if (response.ok) {
                    this.setState({ isLoading: false })
                    return response.status !== 204 ? response.json() : null
                }

                throw new Error(response.error ? response.error : 'Network response was not ok.')
            })
            .then(successFn)
            .catch(error => {
                this.setState({ isLoading: false, error: true, message: error.message })
                console.error(error)
            })
    }

    componentDidMount() {
        this.read()
    }

    renderQuestionnaireTable = () =>
        this.state.isLoading ?
            <Loader /> :
            <QuestionnaireTable update={this.update} _delete={this._delete} qs={this.state.qs} />

    renderMessage = () =>
        this.state.error ? <Message message={this.state.message} /> : null

    render() {
        return <div>
            <QuestionnaireCreateDialog create={this.create} />
            <h3>Questionnaires</h3>
            {this.renderMessage()}
            {this.renderQuestionnaireTable()}
        </div>
    }
}

export default QuestionnaireContainer;