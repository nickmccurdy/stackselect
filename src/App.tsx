import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core'
import { Home as HomeIcon } from '@material-ui/icons'
import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './Home'
import Quiz from './Quiz'

export default withStyles({ homeButton: { marginLeft: -12, marginRight: 20 } })(
  function App({ classes: { homeButton } }) {
    return (
      <>
        <CssBaseline />

        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={homeButton}
              color="inherit"
              aria-label="Home"
              component={(props: any) => (
                <Link to="/" {...props}>
                  <HomeIcon />
                </Link>
              )}
            />

            <Typography variant="headline" color="inherit">
              StackSelect
            </Typography>
          </Toolbar>
        </AppBar>

        <Route exact path="/" component={Home} />
        <Route path="/:name" component={Quiz} />
      </>
    )
  }
)
