import {Component} from 'react'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobItemDetails extends Component{
    state = {productItemData:[],similarProducts:[],apiStatus:apiStatusConstants.initial}

    componentDidMount(){
        this.getItems()
    }

    getSkills = (data) =>{
        
    }

    getItems = async () =>{
        const {match} =this.props
        const {params} = match
        const {id} = params

        this.setState({apiStatus:apiStatusConstants.inProgress})
        const token = Cookies.get('jwt_token')
        const url = `https://apis.ccbp.in/jobs/${id}`
        const options = {
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`
            },

        }
        const response = await fetch(url,options)
        if(response.ok === true){
            const fetchedData =  await response.json()
            const result = 
        }
    }
    render(){
        return(

        )
    }
}
export default JobItemDetails