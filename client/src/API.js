import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const uploadFile = async (file) => {
  const data = new FormData()
  data.append('file', file)

  try {
    await axios.post(API_BASE_URL + '/availabilityUpload', data)
    return 'File uploaded successfully'
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getProviderAvailability = async () => {
  try {
    const providers = await axios.get(API_BASE_URL + '/providerAvailability')
    return providers.data
  } catch (error) {
    throw new Error(error.message)
  }
}
