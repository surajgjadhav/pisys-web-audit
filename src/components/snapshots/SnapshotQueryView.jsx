import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  autocomplete: {
    margin: theme.spacing(1),
    minWidth: 300,
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
  const [classList, setClassList] = React.useState([]);
  const [clsInputValue, setClsInputValue] = React.useState("");
  const [entityInputValue, setEntityInputValue] = React.useState("");
  useEffect(() => {
    axios
      .get("audit/classList")
      .then((response) => {
        const jsn = response.data;
        setClassList(jsn);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  const goTo = function (link) {
    if (history.location.pathname !== link) history.push(link);
    if (handleMenuToggle) handleMenuToggle();
  };
  const handleIdChange = (event) => {
    setId(event.target.value);
  };
  return (
    <div>
      <Typography type="title" variant="h4">
        Snapshots
      </Typography>
      <br />
      <Grid container spacing={4}>
        <Grid item xs>
          <Card className="OnAnyObject">
            <CardHeader title="Snapsots On All Object" />
            <CardContent>
              <Typography variant="h8">
                If you want to see the all snapshots. Click on the following
                button.
              </Typography>
              <Typography noWrap></Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => goTo("/snapshots/onAnyObject")}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className="onClass">
            <CardHeader title="Get Snapshots on Selected Class"></CardHeader>
            <CardContent>
              <Typography variant="h8">
                Please Select the Class from given list to get the Snapshots of
                that Class
              </Typography>
              <Typography noWrap></Typography>
              <Autocomplete
                className={classes.autocomplete}
                value={null}
                onChange={(event, selectedCls) => {
                  setCls(selectedCls);
                }}
                inputValue={clsInputValue}
                onInputChange={(event, newClsInputValue) => {
                  setClsInputValue(newClsInputValue);
                }}
                id="controllable-states-demo"
                options={classList}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Class"
                    variant="outlined"
                  />
                )}
              />
              <Typography noWrap></Typography>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => goTo(`/snapshots/onClass/${cls}`)}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card className="onEntity">
            <CardHeader title="Get Snapshots on Selected Entity"></CardHeader>
            <CardContent>
              <Typography variant="h8">
                Please Select the Class from given list and ID of the record in
                that class to get the Snapshots of that particular ID from that
              </Typography>
              <Typography noWrap></Typography>
              <form>
                <Autocomplete
                  className={classes.autocomplete}
                  value={null}
                  onChange={(event, selectedEntity) => {
                    setEntity(selectedEntity);
                  }}
                  inputValue={entityInputValue}
                  onInputChange={(event, newEntityInputValue) => {
                    setEntityInputValue(newEntityInputValue);
                  }}
                  id="controllable-states-demo"
                  options={classList}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Class"
                      variant="outlined"
                    />
                  )}
                />
                <TextField
                  className={classes.textField}
                  id="standard-number"
                  label="ID"
                  type="number"
                  value={id}
                  onChange={handleIdChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => goTo(`/snapshots/onEntity/${entity}/${id}`)}
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
});
