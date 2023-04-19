import {BsSearch} from 'react-icons/bs'
import './index.css'

const SearchHeader = props => {
  const onEnterSearchInput = () => {
    const {enterSearchInput} = props
    enterSearchInput()
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
        />
        <button
          type="button"
          data-testId="searchButton"
          onClick={onEnterSearchInput}
          className="search-icon"
        >
          <BsSearch size={25} color="white" />
        </button>
      </div>
    )
  }

  return <div>{renderSearchInput()}</div>
}
export default SearchHeader
