import './index.css'

const SkillItem = props => {
  const {skillsItem} = props
  const {imageUrl, name} = skillsItem

  return (
    <li className="list-skill-cont">
      <img className="skill-img" alt={name} src={imageUrl} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
