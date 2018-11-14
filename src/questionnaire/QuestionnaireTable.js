import React from 'react'
import { Table } from 'reactstrap'
import QuestionnaireTableElement from './QuestionnaireTableElement'

const QuestionnaireTable = ({ qs }) => 
    <Table hover>
        <tbody>
        { 
            qs.map(questionnaire => 
                <QuestionnaireTableElement 
                    key={ questionnaire.id } 
                    questionnaire={ questionnaire } />
            ) 
        }
        </tbody>
    </Table>

export default QuestionnaireTable;