import {Component} from 'react'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    productItemData: [],
    similarProducts: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getItems()
  }

  getSimilarProducts = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    location: data.location,
    title: data.title,
    rating: data.rating,
  })

  getItems = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {}
    }
  }
  render() {
    return <h1>sai</h1>
  }
}
export default JobItemDetails
