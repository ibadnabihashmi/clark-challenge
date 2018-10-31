import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    model () {
        return $.getJSON("questionnaire.json").then((response) => {
            const questionnaire = response.questionnaire.questions.map((question) => {
                if (question.question_type === "text") {
                    question['answer'] = '';
                    question.isText = true;
                }
                if (question.question_type === "multiple-choice") {
                    question.isMultipleChoice = true
                }
                return question;
            });
            response.questionnaire.questions = questionnaire;
            return response;
        });
    }
});
