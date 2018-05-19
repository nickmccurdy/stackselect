import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core'
import React, { Fragment } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import Options from './Options'
import { IQuestion, IQuiz } from './quizzes'
import quizzes from './quizzes.json'

const flatten = <T extends any>(array: T[][]): T[] =>
  ([] as T[]).concat(...array)

const unique = <T extends any>(array: T[]): T[] => Array.from(new Set(array))

const getOptions = (questions: IQuestion[]): string[] =>
  unique(
    flatten(questions.map(({ options }) => flatten(Object.values(options))))
  ).sort()

export default function Home() {
  return (
    <List subheader={<ListSubheader>Quizzes</ListSubheader>}>
      {(quizzes as IQuiz[]).map(({ description, name, questions }) => {
        const linkProps: LinkProps = { to: name }

        return (
          <ListItem
            key={name}
            button={true}
            component={Link}
            {...linkProps as any}
          >
            <ListItemText
              primary={<Typography variant="subheading">{name}</Typography>}
              secondary={
                <Fragment>
                  <Typography color="textSecondary">{description}</Typography>
                  <Options options={getOptions(questions)} />
                </Fragment>
              }
              disableTypography={true}
            />
          </ListItem>
        )
      })}
    </List>
  )
}
