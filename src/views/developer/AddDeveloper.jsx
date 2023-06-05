import { Breadcrumb, SimpleCard } from 'components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addDeveloper, fetchDeveloper } from './store/developer.action'

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

const AddDeveloper = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [dept, setDept] = useState('')
    const [experience, setExperience] = useState('')
    const [salary, setSalary] = useState('')
    const [dob, setDob] = useState('')
    const [fulltime, setFulltime] = useState('')
    const [phone, setPhone] = useState('')

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
            addDeveloper({
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

    useEffect(() => {
        return () => {
            setName('')
            setAge('')
            setDept('')
            setExperience('')
            setSalary('')
            setDob('')
            setFulltime('')
            setPhone('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddDeveloper', path: '/developer' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="name"
                                id="nameInput"
                                onChange={handleName}
                                value={name}
                                label="Name"
                            />

                            <TextField
                                type="number"
                                name="age"
                                id="ageInput"
                                onChange={handleAge}
                                value={age || ''}
                                label="Age"
                            />

                            <TextField
                                type="number"
                                name="dept"
                                id="deptInput"
                                onChange={handleDept}
                                value={dept || ''}
                                label="Dept"
                            />

                            <TextField
                                type="number"
                                name="experience"
                                id="experienceInput"
                                onChange={handleExperience}
                                value={experience || ''}
                                label="Experience"
                            />

                            <TextField
                                type="number"
                                name="salary"
                                id="salaryInput"
                                onChange={handleSalary}
                                value={salary || ''}
                                label="Salary"
                            />

                            <TextField
                                type="date"
                                name="dob"
                                id="dobInput"
                                onChange={handleDob}
                                value={dob || ''}
                            />

                            <TextField
                                value={fulltime}
                                onChange={handleFulltime}
                                select
                                id="fulltimeInput"
                                label="Fulltime"
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
                                label="Phone"
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddDeveloper
