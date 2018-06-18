import React from 'react'
import { cleanup, fireEvent, renderIntoDocument } from 'react-testing-library'
import Quiz from './Quiz'
import quizzes from './quizzes.json'

afterEach(cleanup)

test('Quiz', () => {
  const quiz = quizzes[0]
  const { getByText } = renderIntoDocument(
    <Quiz
      match={{
        isExact: true,
        params: { name: quiz.name },
        path: '/:name',
        url: '/JavaScript Frontend Framework'
      }}
    />
  )
  getByText(quiz.name)
  for (const { name } of quiz.questions) getByText(name)
  for (const { name } of quiz.questions[0].answers) getByText(name)

  // change questions
  fireEvent.click(getByText(quiz.questions[1].name))
  for (const { name } of quiz.questions[1].answers) getByText(name)
})
