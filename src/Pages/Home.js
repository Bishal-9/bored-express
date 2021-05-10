import React, { useEffect, useState } from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { connect } from 'react-redux'
import axios from '../Functionalities/axios'
import './Home.css'

function Home(props) {

    const [type, setType] = useState('')
    const [activity, setActivity] = useState('')

    useEffect(() => {
        props.changeType(type)

        const gettingTask = async () => {
            axios
                .get(`?type=${type}`)
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                    setActivity(data.activity)
                }).catch(error => {
                    alert(error.message)
                })
            
        }

        gettingTask()
    }, [type])

    return (
        <div className='home'>
            <div className="home__header">
                <h1>Bored Express</h1>
                <FormControl className='home__headerForm'>
                    <InputLabel id="demo-simple-select-helper-label">Type of Task</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <MenuItem value={'education'}>Education</MenuItem>
                        <MenuItem value={'recreational'}>Recreational</MenuItem>
                        <MenuItem value={'social'}>Social</MenuItem>
                        <MenuItem value={'diy'}>DIY</MenuItem>
                        <MenuItem value={'charity'}>Charity</MenuItem>
                        <MenuItem value={'cooking'}>Cooking</MenuItem>
                        <MenuItem value={'relaxation'}>Relaxation</MenuItem>
                        <MenuItem value={'music'}>Music</MenuItem>
                        <MenuItem value={'busywork'}>Busy Task</MenuItem>
                    </Select>
                    <FormHelperText>Choose according to your mood</FormHelperText>
                </FormControl>
            </div>

            <div className="home__body">
                {
                    `Task => ${activity}`
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myName: state.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeType: (type) => {
            console.log(type);
            dispatch({
                type: 'CHANGE_TYPE',
                payload: type
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)