import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core'
import React, { ChangeEvent, Component } from 'react'
import { match } from 'react-router-dom'
import getOptions from './getOptions'
import Options from './Options'
import quizzes from './quizzes.json'

const styles = ({
  mixins: { gutters },
  palette: { background },
  spacing: { unit }
}: Theme) => ({
  stepper: { backgroundColor: background.default },
  title: gutters({ paddingTop: 16, paddingBottom: 16, marginTop: unit * 3 })
})

interface Props extends WithStyles<typeof styles> {
  match: match<{ name: string }>
}

interface State {
  activeStep: number
  answers: Record<string, string>
}

export default withStyles(styles)(
  class Quiz extends Component<Props, State> {
    state = { activeStep: 0, answers: {} }

    handleActiveStep = (activeStep: number) => () =>
      this.setState({ activeStep })

    handleAnswer = (question: string) => (
      event: ChangeEvent<{}>,
      answer: string
    ) =>
      this.setState(({ answers }) => ({
        answers: { ...answers, [question]: answer }
      }))

    render() {
      const {
        handleActiveStep,
        handleAnswer,
        props: {
          classes: { stepper, title },
          match: {
            params: { name }
          }
        },
        state: { activeStep, answers }
      } = this

      const quiz = quizzes.find(quiz => quiz.name === name)
      if (!quiz) throw new Error(`Quiz not found: ${name}`)
      const questions = quiz.questions

      return (
        <>
          <Typography variant="title" className={title}>
            {name}
          </Typography>

          <Options options={getOptions(questions, answers)} />

          <Stepper
            orientation="vertical"
            className={stepper}
            activeStep={activeStep}
            nonLinear
          >
            {questions.map((question, index) => (
              <Step key={question.name}>
                <StepButton onClick={handleActiveStep(index)}>
                  {question.name}
                </StepButton>

                <StepContent>
                  <RadioGroup
                    onChange={handleAnswer(question.name)}
                    value={answers[question.name]}
                  >
                    {question.answers.map(answer => (
                      <FormControlLabel
                        key={answer.name}
                        control={<Radio />}
                        label={
                          <>
                            {answer.name} <Options options={answer.options} />
                          </>
                        }
                        value={answer.name}
                      />
                    ))}
                  </RadioGroup>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </>
      )
    }
  }
)
