import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import getOptions from './getOptions'
import Options from './Options'
import quizzes from './quizzes'

export default function Home() {
  return (
    <List subheader={<ListSubheader>Quizzes</ListSubheader>}>
      {quizzes.map(({ description, name, questions }) => {
        const NameLink = (props: any) => <Link to={name} {...props} />

        return (
          <ListItem key={name} button component={NameLink}>
            <ListItemText
              primary={
                <Typography variant="subheading" component="span">
                  {name}
                </Typography>
              }
              secondary={
                <Fragment>
                  <Typography color="textSecondary">{description}</Typography>
                  <Options options={getOptions(questions)} />
                </Fragment>
              }
              disableTypography
            />
          </ListItem>
        )
      })}
    </List>
  )
}
