import Profile from '../Profile'

import './index.css'

const FiltersGroup = props => {
  const renderSalaryFilters = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeSalary, salaryId} = props
      const salaryClassName =
        salary.salaryRangeId === salaryId ? 'active-style' : 'normal-style'
      const onClickChangeSalary = () => changeSalary(salaryId)
      return (
        <li className="line">
          <label htmlFor={salary.salaryRangeId} className={salaryClassName}>
            {salary.label}
          </label>
          <input
            type="radio"
            id={salary.salaryRangeId}
            onClick={onClickChangeSalary}
          />
        </li>
      )
    })
  }

  const salaryFilter = () => (
    <div className="filters-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="render-ordered-list">{renderSalaryFilters()}</ul>
    </div>
  )

  const renderEmployFilters = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(employe => {
      const {changeEmployment, employmentId} = props
      const employClassName =
        employe.employmentTypeId === employmentId
          ? 'active-style'
          : 'normal-style'
      const onClickChangeEmploye = () => changeEmployment(employmentId)
      return (
        <li className="line">
          <label htmlFor={employe.employmentTypeId} className={employClassName}>
            {employe.label}
          </label>
          <input
            type="checkbox"
            id={employe.employmentTypeId}
            onClick={onClickChangeEmploye}
          />
        </li>
      )
    })
  }

  const employFilter = () => (
    <div className="filters-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="render-ordered-list">{renderEmployFilters()}</ul>
    </div>
  )

  return (
    <div className="filter-container">
      <Profile />
      <hr className="hr-line" />
      {employFilter()}
      <hr className="hr-line" />
      {salaryFilter()}
    </div>
  )
}
export default FiltersGroup
