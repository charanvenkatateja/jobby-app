import Profile from '../Profile'

import './index.css'

const FiltersGroup = props => {
  const renderSalaryFilters = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeSalary, salaryId} = props
      const salaryClassName =
        salary.salaryRangeId === salaryId ? 'active-style' : 'normal-style'
      const onClickChangeSalary = () => changeSalary(salary.salaryRangeId)
      return (
        <li
          className="line"
          onClick={onClickChangeSalary}
          key={salary.salaryRangeId}
        >
          <p className={salaryClassName}>{salary.label}</p>
        </li>
      )
    })
  }

  const salaryFilter = () => (
    <div className="filters-container-1">
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
      const onClickChangeEmploye = () =>
        changeEmployment(employe.employmentTypeId)
      return (
        <li
          className="line"
          key={employe.employmentTypeId}
          onClick={onClickChangeEmploye}
        >
          <p className={employClassName}>{employe.label}</p>
        </li>
      )
    })
  }

  const employFilter = () => (
    <div className="filters-container-2">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="render-ordered-list-2">{renderEmployFilters()}</ul>
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
