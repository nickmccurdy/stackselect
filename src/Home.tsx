import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import getOptions from './getOptions'
import Options from './Options'
import quizzes from './quizzes.json'

export default function Home() {
  return (
    <List subheader={<ListSubheader>Quizzes</ListSubheader>}>
      {quizzes.map(({ description, name, questions }) => (
        <ListItem
          key={name}
          button
          component={(props: any) => <Link to={name} {...props} />}
        >
          <ListItemText
            primary={
              <Typography variant="subheading" component="span">
                {name}
              </Typography>
            }
            secondary={
              <>
                <Typography color="textSecondary">{description}</Typography>
                <Options options={getOptions(questions)} />
              </>
            }
            disableTypography
          />
        </ListItem>
      ))}
    </List>
  )
}
