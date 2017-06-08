import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Toggle, Menu, MenuItem, Button } from 'react-bootstrap';
import { getInfo } from '../utils/api'
import statesJSON from '../utils/states.json'

const IndividualResult = ({individualInfo}) => {
  return (
    <section style={{width:'48%'}}>
      <h3 style={{color:'#6C7077', fontWeight:'400'}}>Info</h3>
      <div style={{marginBottom:'20px', borderRadius:'5px', backgroundColor:'#F4F4F5', display:'flex', justifyContent:'flex-start', height:'50px', alignItems:'center', paddingLeft:'10px'}}>
        <p style={{color:'#c4c2c2', margin:'0px', fontSize:'20px'}}>{individualInfo.name.split(' ')[0]}</p>
      </div>
      <div style={{marginBottom:'20px', borderRadius:'5px', backgroundColor:'#F4F4F5', display:'flex', justifyContent:'flex-start', height:'50px', alignItems:'center', paddingLeft:'10px'}}>
        <p style={{color:'#c4c2c2', margin:'0px', fontSize:'20px'}}>{individualInfo.name.split(' ')[1]}</p>
      </div>
      {individualInfo.district && <div style={{marginBottom:'20px', borderRadius:'5px', backgroundColor:'#F4F4F5', display:'flex', justifyContent:'flex-start', height:'50px', alignItems:'center', paddingLeft:'10px'}}>
        <p style={{color:'#c4c2c2', margin:'0px', fontSize:'20px'}}>District {individualInfo.district}</p>
      </div>}
      {individualInfo.phone && <div style={{marginBottom:'20px', borderRadius:'5px', backgroundColor:'#F4F4F5', display:'flex', justifyContent:'flex-start', height:'50px', alignItems:'center', paddingLeft:'10px'}}>
        <p style={{color:'#c4c2c2', margin:'0px', fontSize:'20px'}}>P: {individualInfo.phone}</p>
      </div>}
      {individualInfo.office && <div style={{marginBottom:'20px', borderRadius:'5px', backgroundColor:'#F4F4F5', display:'flex', justifyContent:'flex-start', height:'50px', alignItems:'center', paddingLeft:'10px'}}>
        <p style={{color:'#c4c2c2', margin:'0px', fontSize:'20px'}}>O: {individualInfo.office}</p>
      </div>}
      {individualInfo.link && <div style={{marginBottom:'20px', borderRadius:'5px', backgroundColor:'#F4F4F5', display:'flex', justifyContent:'flex-start', height:'50px', alignItems:'center', paddingLeft:'10px'}}>
        <p style={{color:'#c4c2c2', margin:'0px', fontSize:'20px'}}>W: <a style={{color:'#c4c2c2'}} href={individualInfo.link}>{individualInfo.link}</a></p>
      </div>}
    </section>
  )
}

const StateResults = ({info, handleClick}) => {
  return (
    <section style={{width:'48%'}}>
      <h3 style={{ letterSpacing:'1.5px', color:'#6C7077', fontWeight:'400'}}>List  /  <span style={{color:'#5D9CF8'}}>{info[0].type}</span></h3>
      <div style={{backgroundColor:'#F4F4F5', display:'flex', justifyContent:'flex-start', height:'50px', borderTop:'1px solid #F4F4F5', borderBottom:'1px solid #F4F4F5', alignItems:'center', paddingLeft:'10px'}}>
        <p style={{width:'75%', color:'#6C7077', margin:'0px', fontSize:'15px'}}>Name</p>
        <p style={{width:'25%', color:'#6C7077', margin:'0px', fontSize:'15px'}}>Party</p>
      </div>
        {info.map((person)=>{
          return (
            <div key={person.name} style={{display:'flex', justifyContent:'flex-start', height:'50px', borderTop:'1px solid #F4F4F5', borderBottom:'1px solid #F4F4F5', alignItems:'center', paddingLeft:'10px'}}>
              <p style={{width:'75%', margin:'0px', fontSize:'15px', cursor:'pointer'}} onClick={() => handleClick(person)}>{person.name}</p>
              <p style={{width:'25%', margin:'0px', fontSize:'15px'}}>{person.party.charAt(0)}</p>
            </div>
          )
        })}
    </section>
  )
}


const DropdownMenu = ({id, selected, list, selectedID, selectedChange, label}) => {
  // console.log(id, selected, list, selectedChange)

  return (
    <Dropdown id={id} style={{marginRight:'7px'}}>
      <Dropdown.Toggle bsStyle='primary' style={{minWidth:'140px'}}>
        {selected ? selected : label}
      </Dropdown.Toggle>
      <Dropdown.Menu style={{maxHeight:'200px',overflow:'scroll'}}>
        {list.map((item, index)=> {
          return <MenuItem onSelect={()=> selectedChange(item.abbreviation, selectedID)} key={item.name}>{item.name}</MenuItem>
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

DropdownMenu.propTypes = {
  id: PropTypes.string.isRequired,
  selectedID: PropTypes.string.isRequired,
  selected: PropTypes.string,
  list: PropTypes.array.isRequired,
  selectedChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedStateID:'State',
      selectedState: null,
      selectedRepID:'Rep/Res',
      selectedRep: null,
      info: null,
      individualInfo: null
    }
    this.selectedChange = this.selectedChange.bind(this);
    this.getTheInfo = this.getTheInfo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  selectedChange (value, id) {
    console.log('happenin', value,id)
    this.setState(()=>{
      let newState = {};
      newState[`selected${id}`] = value;
      console.log(newState)
      return newState;
    })
  }

  getTheInfo () {
    getInfo( this.state.selectedRep, this.state.selectedState)
    .then((info)=> {
      this.setState({info})
    })
  }

  handleClick (individualInfo) {
    this.setState({individualInfo})
  }


  render() {
    const statesList = statesJSON;
    return(
      <section style={{display:'flex', flexDirection:'column'}}>
        <div>
          <h1 style={{fontFamily:'Avenir',fontWeight:'bold', fontSize:'28px', color:'#5D9CF8', paddingBottom:'50px', borderBottom:'1px solid #F4F4F5'}}>Who's My Representative?</h1>
        </div>
        <div>
          <DropdownMenu id='Rep/Sen' selected={this.state.selectedRep} selectedID='Rep' label='Rep/Res' list={[{name:'Rep/Sen', abbreviation:null},{name:'Representatives', abbreviation:'Representatives'}, {name:'Senators', abbreviation:"Senators"}]} selectedChange={this.selectedChange} />
          <DropdownMenu id='State' selected={this.state.selectedState} selectedID='State' label='State' list={statesList} selectedChange={this.selectedChange} />
          {this.state.selectedRep && this.state.selectedState ? <Button onClick={() => this.getTheInfo()} style={{minWidth:'140px'}} bsStyle='success'>Search</Button> : <Button style={{minWidth:'140px'}} disabled bsStyle='default'>Search</Button>}
        </div>
        {this.state.info &&
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <StateResults info={this.state.info} handleClick={this.handleClick}/>
            {this.state.individualInfo && <IndividualResult individualInfo={this.state.individualInfo} />}
          </div>
        }
      </section>
    )
  }

}

export default App;
