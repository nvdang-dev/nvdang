import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { exeGetPartFivesAction } from '../../../redux/action/partFiveAction';
import { FormControlLabel, Radio, RadioGroup, Button, FormControl, FormHelperText, InputLabel, Select, MenuItem, useMediaQuery } from '@material-ui/core';
import { checkAnswer, checkAnswers, displayTime } from '../../../helpers/handleQuestion';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        // backgroundColor: '#eceff1',
    },
    paperLight: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '80%',
        backgroundColor: '#eceff1',
        borderRadius: 10
    },
    paperDark: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        minHeight: '80%',
        backgroundColor: '#1f2936',
        borderRadius: 10
    },
    paperMobile: {
        // marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#eceff1',
        borderRadius: 10,
        paddingBottom: theme.spacing(3)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    answerTitleLight: {
        color: '#5e6d87'
    },
    answerTitleDark: {
        color: '#ffffff'
    },
    questionTitleLight: {
        fontWeight: 'bold',
         color:'#596981'
    },
    questionTitleDark: {
        fontWeight: 'bold',
        color: '#ffffff'
    }
}));

export default function PartFive() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [listAnswers, setListAnswers] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [counter, setCounter] = useState(600);
    const [timer, setTimer] = useState(600);
    const [sizeQuestions, setSizeQuestions] = useState(5);
    const partFives = useSelector(state => state.partFiveReducer.list)
    const theme = useTheme()
    const mode = theme.palette.type.toString();
    const sm = useMediaQuery(theme.breakpoints.down("xs"));
    const xs = useMediaQuery(theme.breakpoints.down("md"));
    useEffect(() => {
        dispatch(exeGetPartFivesAction())
    }, [])
    const handleChange = (e, data) => {
        setListAnswers({ ...listAnswers, [data.id]: e.target.value })
    }
    const onSubmit = () => {
        setIsSubmit(true)
    }
    const clearAll = () => {
        setIsSubmit(false);
        setListAnswers({});
    }
    useEffect(() => {
        if (isStarted) {
            let timerId 
            if (counter === 0) {
                // clearInterval(timerId)
                setIsSubmit(true)
            } else {
                setTimeout(() => setCounter(counter - 1), 1000)
            }
        }
    }, [counter, isStarted]);
    //   if(!isStarted) {
    //     return null;
    //   }
    const start = () => {
        setIsStarted(true)
    }
    return (
        <Container component="main" className={classes.root}>
            <CssBaseline />
            <div className={ mode==='light' ?classes.paperLight: classes.paperDark}>
                <Typography component="p" variant="body1"  style={{ fontWeight: 'bold', margin: 30 }}>
                    TOEIC® READING part 5 - Test 1
                </Typography>
                <div style={{ display: 'flex', flexDirection: sm || xs ? 'column' : 'row', paddingBottom: 20 }}>
                    <div>
                        <FormControl className={classes.formControl} size={'small'} fullWidth disabled={isStarted}>
                            <InputLabel id="demo-simple-select-outlined" >Number of questions: </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                label="numbers"
                                value={sizeQuestions}
                                onChange={e => setSizeQuestions(e.target.value)}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ paddingLeft: sm || xs ? 0 : 20 }}>
                        <FormControl className={classes.formControl} size={'small'} fullWidth disabled={isStarted}>
                            <InputLabel id="demo-time-select-outlined">Timer:</InputLabel>
                            <Select
                                labelId="demo-time-select-outlined-label"
                                id="demo-time-select-outlined"
                                label="times"
                                value={timer}
                                onChange={e => {
                                    setCounter(e.target.value);
                                    setTimer(e.target.value)
                                }}
                            >
                                <MenuItem value={600}>10 minutes</MenuItem>
                                <MenuItem value={1200}>20 minutes</MenuItem>
                                <MenuItem value={2400}>40 minutes</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ paddingLeft: sm || xs ? 10 : 30 }} className='d-flex align-items-center'>
                        <Button variant="outlined"  style={{ marginRight: 30 }} onClick={start} disabled={isStarted} >Start</Button>
                    </div>
                    <div style={{ paddingLeft: sm || xs ? 10 : 30, paddingTop: sm || xs ? 20 : 0, fontSize: 30, fontWeight: 'bold', color: counter < 60 ? '#ff1744' : '' }} className='d-flex align-items-center'>
                        {displayTime(counter)}
                    </div>
                    {counter === 0 || isSubmit ?
                        <div style={{ paddingLeft: sm || xs ? 10 : 30, paddingTop: sm || xs ? 20 : 0, fontSize: 30, fontWeight: 'bold', color: counter < 60 ? '#ff1744' : '' }} className='d-flex align-items-center'>
                            {checkAnswers(sizeQuestions, listAnswers, partFives)}
                        </div>
                        :''
                    }
                </div>
                {isStarted && <div style={{ width: '80%' }}>
                    <Grid container direction="column" style={{ width: '100%' }} >
                        {partFives && partFives.length > 0 &&
                            partFives.slice(0, sizeQuestions).map((question, index) =>
                                <Grid item xs key={index} >
                                    <Typography variant="subtitle1" component="p" className={ mode==='light' ? classes.questionTitleLight : classes.que}>
                                        {`${index + 1}.${question.title}`}
                                    </Typography>
                                    <FormControl component="fieldset" error={!checkAnswer(isSubmit, listAnswers[question.id], question.answer)} >
                                        <RadioGroup aria-label="gender" name="gender1" style={{ marginLeft: 30 }} value={listAnswers[question.id] || ''} onChange={e => handleChange(e, question)}>
                                            <FormControlLabel className={ mode==='light' ? classes.answerTitleLight : classes.answerTitleDark} value="optionA" control={<Radio />} label={question.optionA} />
                                            <FormControlLabel className={ mode==='light' ? classes.answerTitleLight : classes.answerTitleDark} value="optionB" control={<Radio />} label={question.optionB} />
                                            <FormControlLabel className={ mode==='light' ? classes.answerTitleLight : classes.answerTitleDark} value="optionC" control={<Radio />} label={question.optionC} />
                                            <FormControlLabel className={ mode==='light' ? classes.answerTitleLight : classes.answerTitleDark} value="optionD" control={<Radio />} label={question.optionD} />
                                        </RadioGroup>
                                        <FormHelperText style={{ marginLeft: 30, marginBottom: isSubmit ? 15 : 0, fontSize: 20, fontWeight: 'bold' }}>{!isSubmit ? '' : (
                                            checkAnswer(isSubmit, listAnswers[question.id], question.answer) ? <span style={{ color: "#090" }}>Correct</span> : <span>That is not correct</span>)}
                                        </FormHelperText>
                                    </FormControl>
                                    {isSubmit && (
                                        <div style={{ minHeight: 150, backgroundColor: '#ffffff', borderRadius: 4, padding: 15 }}>
                                            <div><span>{question.translateTitle}</span></div>
                                            <div style={{ marginLeft: 15, color: checkAnswer(isSubmit, 'optionA', question.answer) ? '#ff1744' : '' , fontWeight: checkAnswer(isSubmit, 'optionA', question.answer) ? 'bold' : '' }}><span>{`A. ${question.translateA}`}</span></div>
                                            <div style={{ marginLeft: 15, color: checkAnswer(isSubmit, 'optionB', question.answer) ? '#ff1744' : '', fontWeight: checkAnswer(isSubmit, 'optionB', question.answer) ? 'bold' : ''  }}><span>{`B. ${question.translateB}`}</span></div>
                                            <div style={{ marginLeft: 15, color: checkAnswer(isSubmit, 'optionC', question.answer) ? '#ff1744' : '', fontWeight: checkAnswer(isSubmit, 'optionC', question.answer) ? 'bold' : ''  }}><span>{`C. ${question.translateC}`}</span></div>
                                            <div style={{ marginLeft: 15, color: checkAnswer(isSubmit, 'optionD', question.answer) ? '#ff1744' : '', fontWeight: checkAnswer(isSubmit, 'optionD', question.answer) ? 'bold' : ''  }}><span>{`D. ${question.translateD}`}</span></div>
                                        </div>
                                    )}
                                </Grid>
                            )
                        }
                    </Grid>
                </div>}
                {isStarted &&
                    <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                        <Grid container >
                            <Button variant="contained" color="primary" style={{ marginRight: 30 }} onClick={clearAll} disabled={!(Object.keys(listAnswers).length === sizeQuestions) || isSubmit}>Clear All</Button>
                            <Button variant="contained" color="secondary" onClick={onSubmit} disabled={!(Object.keys(listAnswers).length === sizeQuestions) || isSubmit}>Submit</Button>
                        </Grid>
                    </div>}
            </div>
        </Container>
    );
}