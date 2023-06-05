import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editDeveloper, fetchDeveloper } from './store/developer.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditDeveloper = () => {
    const { id: developerId } = useParams()

    const developer = useSelector((state) =>
        state.developer.entities.find(
            (developer) => developer.id.toString() === developerId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState(developer.name)

    const [age, setAge] = useState(developer.age)

    const [dept, setDept] = useState(developer.dept)

    const [experience, setExperience] = useState(developer.experience)

    const [salary, setSalary] = useState(developer.salary)

    const [dob, setDob] = useState(developer.dob.split('T')[0])

    const [fulltime, setFulltime] = useState(developer.fulltime)

    const [phone, setPhone] = useState(developer.phone)

    const handleName = (e) => setName(e.target.value)
    const handleAge = (e) => setAge(parseInt(e.target.value))
    const handleDept = (e) => setDept(parseFloat(e.target.value))
    const handleExperience = (e) => setExperience(parseInt(e.target.value))
    const handleSalary = (e) => setSalary(parseInt(e.target.value))
    const handleDob = (e) => setDob(e.target.value)
    const handleFulltime = (e) => setFulltime(e.target.value)
    const handlePhone = (e) => setPhone(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editDeveloper({
                id: developerId,
                name,
                age,
                dept,
                experience,
                salary,
                dob,
                fulltime,
                phone,
            })
        ).then(() => {
            dispatch(fetchDeveloper())
        })
        navigate('/developer')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditDeveloper', path: '/developer' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                validators={['required']}
                                label="Name"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age || ''}
                                validators={['required']}
                                label="Age"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="dept"
                                id="deptInput"
                                onChange={handleDept}
                                value={dept || ''}
                                validators={['required']}
                                label="Dept"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="experience"
                                id="experienceInput"
                                onChange={handleExperience}
                                value={experience || ''}
                                validators={['required']}
                                label="Experience"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="salary"
                                id="salaryInput"
                                onChange={handleSalary}
                                value={salary || ''}
                                validators={['required']}
                                label="Salary"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="date"
                                name="dob"
                                id="dobInput"
                                onChange={handleDob}
                                value={dob}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={fulltime}
                                onChange={handleFulltime}
                                select
                                id="fulltimeInput"
                                label="Fulltime"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                            <TextField
                                type="number"
                                name="phone"
                                id="phoneInput"
                                onChange={handlePhone}
                                value={phone || ''}
                                validators={['required']}
                                label="Phone"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditDeveloper
