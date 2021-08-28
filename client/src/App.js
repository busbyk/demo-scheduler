import './styles/main.scss'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import UploadAvailability from './components/UploadAvailability'
import BookTimeSlot from './components/BookTimeSlot'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/upload-availability'>
            <UploadAvailability />
          </Route>
          <Route path='/book-time-slot'>
            <BookTimeSlot />
          </Route>
          <Route path='/'>
            <div>
              <section className='section'>
                <div className='container'>
                  <h1 className='title'>Demo Scheduler</h1>
                </div>
              </section>
              <section className='section is-medium'>
                <div className='container is-flex is-flex-direction-column is-justify-content-center is-align-items-center'>
                  <Link className='button is-link' to='/upload-availability'>
                    Upload Provider Availability
                  </Link>
                  <div className='divider' />
                  <Link className='button is-link' to='/book-time-slot'>
                    View Provider Availability
                  </Link>
                </div>
              </section>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
