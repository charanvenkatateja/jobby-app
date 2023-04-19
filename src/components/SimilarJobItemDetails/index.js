import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'

const SimilarJobItemDetails = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    jobDescription,

    location,
    employmentType,
    title,

    rating,
  } = similarDetails

  return (
    <li className="list-similar-jobs-cont">
      <div className="similar-company">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-img"
        />
        <div className="simalar-details">
          <h1 className="similar-title">{title}</h1>
          <div className="similar-rating">
            <BsFillStarFill color="yellow" size={35} />
            <p className="similar-rating-para">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="des-title">Description</h1>
      <p className="des">{jobDescription}</p>
      <div className="similar-bottom-sce">
        <div className="bottom-part-1">
          <GoLocation color="white" size={30} />
          <p className="loc-para">{location}</p>
        </div>
        <div className="bottom-part-1">
          <BsFillBriefcaseFill color="white" size={30} />
          <p className="loc-para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItemDetails
