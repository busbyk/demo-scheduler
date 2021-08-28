import React, {useState} from 'react'
import {FaUpload} from 'react-icons/fa'
import {uploadFile} from '../API'
import {Link} from 'react-router-dom'

const UploadAvailability = () => {
  const [file, setFile] = useState()
  const [success, setSuccess] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState()

  const handleChangeFile = (e) => {
    setError(null)
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file to upload')
    } else {
      setLoading(true)
      setError(null)
      uploadFile(file)
        .then((msg) => {
          setSuccess(msg)
        })
        .catch((err) => {
          setError(err)
        })
        .then(() => {
          setLoading(false)
        })
    }
  }

  return (
    <div>
      <section className='section'>
        <div className='container'>
          <Link className='button mb-6' to='/'>
            Back
          </Link>
          <h1 className='title'>Upload Availability CSV</h1>
        </div>
      </section>
      <section className='section is-medium'>
        <div className='container'>
          <div className='file has-name is-fullwidth'>
            <label className='file-label'>
              <input
                className='file-input'
                type='file'
                name='provider-availability'
                onChange={handleChangeFile}
              />
              <span className='file-cta'>
                <span className='file-icon'>
                  <FaUpload />
                </span>
                <span className='file-label'>Choose a CSV…</span>
              </span>
              <span className='file-name'>
                {file ? file.name : 'Please select a CSV file'}
              </span>
            </label>
          </div>
          <button
            className='button is-fullwidth is-primary mt-3'
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {success && !error && (
          <div className='notification is-success mt-6'>{success}</div>
        )}
        {error && (
          <div className='notification is-danger mt-6'>{error.message}</div>
        )}
        {loading && <div className='block mt-6'>Loading...</div>}
      </section>
    </div>
  )
}

export default UploadAvailability
