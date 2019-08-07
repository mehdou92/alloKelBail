import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 645,
        minWidth: 475,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        backgroundColor: 'white',
    },
}));

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);


export default function Profile(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = name => event => {
      setState({ ...state, [name]: event.target.checked });
  };
  const [state, setState] = React.useState({
      checkedA: true,
      checkedB: true,
      checkedF: true,
      checkedG: true,
  });

  function handleExpandClick() {
      setExpanded(!expanded);
  }





  return (
      <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          margin=""
      >
        <Card className={classes.card}>
            <CardHeader
                title="Profile card"
            />
            <CardMedia
                className={classes.media}
                image="https://cdn.pixabay.com/photo/2017/02/23/13/05/profile-2092113_960_720.png"
                title="img profile"
            />
            <CardContent>
                <Typography variant="h3" color="textPrimary" align="center" component="p">
                    Kazmierczak
                </Typography>
                <Typography variant="h3" color="textSecondary" align="center" component="p">
                    Benjamin
                </Typography>
            </CardContent>
            <FormControlLabel
                control={
                    <GreenCheckbox
                        checked={state.checkedG}
                        onChange={handleChange('checkedG')}
                        value="checkedG"
                    />
                }
                label="Newsletter Subscribe"
            />

        </Card>
      </Grid>
  );
}