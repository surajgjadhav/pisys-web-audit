import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default withRouter(({ history, handleMenuToggle }) => {
  const classes = useStyles();
  const [cls, setCls] = React.useState("");
  const [entity, setEntity] = React.useState("");
  const [id, setId] = React.useState("");
  const goTo = function (link) {
    if (history.location.pathname !== link) history.push(link);
    if (handleMenuToggle) handleMenuToggle();
  };
  const handleClsChange = (event) => {
    setCls(event.target.value);
  };
  const handleEntityChange = (event) => {
    setEntity(event.target.value);
  };
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs>
        <Card className="OnAnyObject">
          <CardHeader title="Changes On Any Object" />
          <CardContent>
            <Typography variant="h8">
              If you want to see all Changes. Click on the following button.
            </Typography>
            <Typography noWrap></Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => goTo("/changes/onAnyObject")}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs>
        <Card className="onClass">
          <CardHeader title="Get Changes on Selected Class"></CardHeader>
          <CardContent>
            <Typography variant="h8">
              Please Select the Class from given list to get the Changes of that
              Class
            </Typography>
            <Typography noWrap></Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cls}
                onChange={handleClsChange}
              >
                <MenuItem value="com.javers.test.model.User">User</MenuItem>
              </Select>
              <FormHelperText>Select Class</FormHelperText>
            </FormControl>
            <Typography noWrap></Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => goTo(`/changes/onClass/${cls}`)}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs>
        <Card className="onEntity">
          <CardHeader title="Get Changes on Selected Entity"></CardHeader>
          <CardContent>
            <Typography variant="h8">
              Please Select the Class from given list to get the Changes of that
              Class
            </Typography>
            <Typography noWrap></Typography>
            <form>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Class</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={entity}
                  onChange={handleEntityChange}
                >
                  <MenuItem value="com.javers.test.model.User">User</MenuItem>
                </Select>
                <FormHelperText>Select Class</FormHelperText>
              </FormControl>
              <TextField
                className={classes.formControl}
                id="standard-basic"
                label="ID"
                type="number"
                value={id}
                onChange={handleIdChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => goTo(`/changes/onEntity/${entity}/${id}`)}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
});
