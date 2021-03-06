import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import useTrans from '../../components/hooks/useTrans';
import ContainerFit from '../../components/layout/layoutFit';

const useStyles = makeStyles((theme) => ({
    textStyle: {
        marginTop: 20,
        marginRight: 30
    }
}));

export default function AboutContainer() {
    const t = useTrans()
    const classes = useStyles();
    const contents = [
        t.about.name,
        t.about.from,
        t.about.special
    ]
    return (
        <ContainerFit >
            <Grid item xs={12} >
                <div className="d-flex flex-column justify-content-start align-items-end w-100 h-100">
                    <h1 className={classes.textStyle}>{t.menu.about}</h1>
                    {contents.map((data, index) => (
                        <h5 className={classes.textStyle} key={index}>{data}</h5>
                    ))}
                </div>
            </Grid>
        </ContainerFit>
    );
}