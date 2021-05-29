import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useTrans from '../hooks/useTrans';

const useStyles = makeStyles({
    root: {
        maxWidth: 180,
        maxHeight: 150
    },
});

export default function CardMenu({title, link, disable, go}) {
    const classes = useStyles();
    const t = useTrans()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="30"
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color='secondary' style={{fontWeight: 'bold'}}>{title}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="secondary" disabled={disable} onClick={e=>go(e,link)}>{t.utilities.toeic.test}</Button>
                <Button size="small" color="primary" disabled>{t.utilities.toeic.learn}</Button>
            </CardActions>
        </Card>
    );
}