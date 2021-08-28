import React, {useState, useEffect} from 'react'
import {getProviderAvailability} from '../API'
import {Link} from 'react-router-dom'

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toDateString()
}

const BookTimeSlot = () => {
  const [providers, setProviders] = useState()
  const [loading, setLoading] = useState(true)

  const getProviders = async () => {
    const providers = await getProviderAvailability()
    setProviders(providers.data)
    setLoading(false)
  }

  useEffect(() => {
    getProviders()
  }, [])

  const createProviderList = () => {
    const providerList = []
    for (const provider in providers) {
      providerList.push(
        <article className='panel is-info mb-5'>
          <p className='panel-heading'>{provider}</p>
          {providers[provider].map((timeSlot) => (
            <div className='panel-block is-active'>
              <span>{formatDate(timeSlot.date)}</span>
              <span className='is-pulled-right'>
                {timeSlot.startTime} - {timeSlot.endTime}
              </span>
            </div>
          ))}
        </article>
      )
    }
    return providerList
  }

  return (
    <div>
      <section className='section'>
        <div className='container'>
          <Link className='button mb-6' to='/'>
            Back
          </Link>
          <h1 className='title'>Provider Schedules</h1>
        </div>
      </section>
      <section className='section is-medium'>
        <div className='container is-flex is-flex-direction-column is-justify-content-center is-align-items-center'>
          {loading && <p>Loading provider schedules...</p>}
          {providers &&
            createProviderList().map((provider) => (
              <div className='provider-container'>{provider}</div>
            ))}
        </div>
      </section>
    </div>
  )
}

export default BookTimeSlot
