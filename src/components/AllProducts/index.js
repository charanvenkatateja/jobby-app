import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import ProductCard from '../ProductCard'
import FiltersGroup from '../FiltersGroup'

import SearchHeader from '../SearchHeader'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProducts extends Component {
  state = {
    productsList: [],

    apiStatus: apiStatusConstants.initial,
    salaryId: salaryRangesList[0],
    employmentId: employmentTypesList[0],
    searchInput: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {salaryId, employmentId, searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentId}&minimum_package=${salaryId}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cant seem to find the page you are looking for
      </p>
      <Link to="/jobs">
        <button type="button" className="retry-button">
          Retry
        </button>
      </Link>
    </div>
  )

  enterSearchInput = () => {
    this.getProducts()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  changeEmployment = employmentId => {
    this.setState({employmentId}, this.getProducts)
  }

  changeSalary = salaryId => {
    this.setState({salaryId}, this.getProducts)
  }

  renderGetProducts = () => {
    const {productsList} = this.state
    const ProductsCount = productsList.length > 0

    return ProductsCount ? (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productDetails={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllProcess = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderGetProducts()
      default:
        return null
    }
  }

  render() {
    const {salaryId, employmentId, searchInput} = this.state
    return (
      <div className="all-products-section">
        <FiltersGroup
          salaryId={salaryId}
          employmentId={employmentId}
          changeSalary={this.changeSalary}
          changeEmployment={this.changeEmployment}
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
        />
        <div className="zero">
          <SearchHeader
            enterSearchInput={this.enterSearchInput}
            changeSearchInput={this.changeSearchInput}
            searchInput={searchInput}
          />
          <div className="main-container">{this.renderAllProcess()}</div>
        </div>
      </div>
    )
  }
}
export default AllProducts
