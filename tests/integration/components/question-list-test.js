import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | question-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.questions = EmberObject.create({
      questions: [
        {
          "question_type": "multiple-choice",
          "identifier": "1",
          "headline": "Question no 1",
          "description": "question 1 description",
          "required": false,
          "multiple": "true",
          "isSingleChoice": true,
          "choices": [
            {
              "label": "choice 1-1",
              "value": "choice 1-1",
              "selected": false
            },
            {
              "label": "choice 1-2",
              "value": "choice 1-2",
              "selected": false
            }
          ],
          "jumps": []
        },
        {
          "question_type": "multiple-choice",
          "identifier": "2",
          "headline": "Question no 2",
          "description": "question 2 description",
          "required": false,
          "multiple": "true",
          "isMultipleChoice": true,
          "choices": [
            {
              "label": "choice 2-1",
              "value": "choice 2-1",
              "selected": false
            },
            {
              "label": "choice 2-2",
              "value": "choice 2-2",
              "selected": false
            },
          ],
          "jumps": []
        }, {
          "question_type": "text",
          "identifier": "3",
          "headline": "Question no 3",
          "description": "question 3 description",
          "required": false,
          "multiline": "true",
          "isText": true,
          "jumps": []
        }
      ]
    });
  });

  test('should render questions', async function (assert) {
    await render(hbs`{{question-list questions=questions.questions}}`);
    assert.equal(this.element.querySelector('#card').children.length, 3, 'Three cards rendered');
  });

  test('should have first active card', async function (assert) {
    await render(hbs`{{question-list questions=questions.questions}}`);
    const firstCard = this.element.querySelector('#card').children[0];
    const secondCard = this.element.querySelector('#card').children[1];
    const thirdCard = this.element.querySelector('#card').children[2];
    assert.equal(firstCard.getAttribute('class'), 'active', 'First card is active');
    assert.equal(secondCard.getAttribute('class'), '', 'Second card is not active');
    assert.equal(thirdCard.getAttribute('class'), '', 'Third card is not active');
  });

  test('should cards have correct title', async function (assert) {
    await render(hbs`{{question-list questions=questions.questions}}`);
    const firstCard = this.element.querySelector('#card').children[0].children[0].children[0];
    const secondCard = this.element.querySelector('#card').children[1].children[0].children[0];
    const thirdCard = this.element.querySelector('#card').children[2].children[0].children[0];
    assert.equal(firstCard.textContent.trim(), 'Question no 1', 'Correct title for card 1');
    assert.equal(secondCard.textContent.trim(), 'Question no 2', 'Correct title for card 2');
    assert.equal(thirdCard.textContent.trim(), 'Question no 3', 'Correct title for card 3');
  });

  test('should cards have correct description', async function (assert) {
    await render(hbs`{{question-list questions=questions.questions}}`);
    const firstCard = this.element.querySelector('#card').children[0].children[0].children[1];
    const secondCard = this.element.querySelector('#card').children[1].children[0].children[1];
    const thirdCard = this.element.querySelector('#card').children[2].children[0].children[1];
    assert.equal(firstCard.textContent.trim(), 'question 1 description', 'Correct description for card 1');
    assert.equal(secondCard.textContent.trim(), 'question 2 description', 'Correct description for card 2');
    assert.equal(thirdCard.textContent.trim(), 'question 3 description', 'Correct description for card 3');
  });

  test('should go to next question on clicking next', async function (assert) {
    await render(hbs`{{question-list questions=questions.questions}}`);
    const firstCard = this.element.querySelector('#card').children[0];
    const secondCard = this.element.querySelector('#card').children[1];

    assert.equal(firstCard.getAttribute('class'), 'active', 'First card is active');
    await click('.next-button');
    assert.equal(secondCard.getAttribute('class'), 'active', 'Second card is active');
  });

  test('should go to previous question on clicking previous', async function (assert) {
    await render(hbs`{{question-list questions=questions.questions}}`);
    const firstCard = this.element.querySelector('#card').children[0];
    const secondCard = this.element.querySelector('#card').children[1];

    assert.equal(firstCard.getAttribute('class'), 'active', 'First card is active');
    await click('.next-button');
    assert.equal(secondCard.getAttribute('class'), 'active', 'Second card is active');
    await click('.previous-button');
    assert.equal(firstCard.getAttribute('class'), 'turnedLeft active', 'First card is active');
  });

});
