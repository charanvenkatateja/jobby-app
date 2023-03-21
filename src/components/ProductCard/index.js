import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'

import './index.css'

const ProductCard = props => {
  const {productDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    id,
    location,
    employmentType,
    title,
    packagePerAnnum,
    rating,
  } = productDetails

  return (
    <li className="product-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-container">
          <img
            src={companyLogoUrl}
            className="company-img"
            alt="company logo"
          />
          <div className="company-mark">
            <h1 className="company-title">{title}</h1>
            <BsFillStarFill className="star" />
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
        <h1 className="description-title">Description</h1>
        <p className="description-para">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default ProductCard
