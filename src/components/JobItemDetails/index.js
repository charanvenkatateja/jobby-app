import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

import SkillItem from '../SkillItem'
import SimilarJobItemDetails from '../SimilarJobItemDetails'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component {
  state = {
    productItemData: {},
    similarData: [],
    skillsData: [],
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
      const similarUpdatedData = fetchedData.similar_jobs.map(each =>
        this.getSimilarProducts(each),
      )

      const updatedData = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
      }
      const skillsUpdatedData = fetchedData.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      this.setState({
        skillsData: skillsUpdatedData,
        productItemData: updatedData,
        similarData: similarUpdatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="fail-button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderTotalItemsView = () => {
    const {similarData, skillsData, productItemData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      rating,
      packagePerAnnum,
      imageUrl,
      jobDescription,
      description,
    } = productItemData

    return (
      <div className="items-overview-details-cont">
        <div className="company-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-img"
          />
          <div className="rating-cont">
            <BsFillStarFill color="yellow" size={30} />
            <p className="rating-logo">{rating}</p>
          </div>
        </div>
        <div className="job-type-container">
          <div className="job-type-order">
            <GoLocation className="icon-logo" />
            <p className="employe-type-para">{location}</p>
          </div>
          <div className="job-type-order">
            <BsFillBriefcaseFill className="icon-logo" />
            <p className="employe-type-para">{employmentType}</p>
          </div>
          <p className="job-type-package">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <div className="web-link-cont">
          <h1 className="description-title">Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
        </div>
        <p className="description-para">{jobDescription}</p>
        <h1 className="skill-heading">Skills</h1>
        <ul className="un-skill-data-cont">
          {skillsData.map(each => (
            <SkillItem skillsItem={each} key={each.id} />
          ))}
        </ul>
        <h1 className="skill-heading">Life at Company</h1>
        <div className="life-cont">
          <p className="life-description">{description}</p>
          <img src={imageUrl} alt="life at company" className="life-img" />
        </div>
        <h1 className="skill-heading">Similar jobs</h1>
        <ul className="un-similar-data-cont">
          {similarData.map(each => (
            <SimilarJobItemDetails similarDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllProcess = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderTotalItemsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="specific-container">{this.renderAllProcess()}</div>
      </>
    )
  }
}
export default JobItemDetails
