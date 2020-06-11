import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./SnapshotView.css";

class SnapshotsOnClassView extends Component {
  state = {
    entities: [],
    author: "",
    changedProperty: "",
    limit: 100,
    skip: 0,
    fromDate: "2020-05-24",
    toDate: "2020-05-25",
  };

  componentDidMount() {
    console.log("ComponentDidMount");
    console.log(this.props.cls);
    axios
      .get(`/audit/snapshots/class/${this.props.cls}`)
      .then((response) => {
        const jsn = response.data;
        console.log(jsn);
        this.setState({ entities: jsn });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitHandler = () => {
    const {
      author,
      changedProperty,
      limit,
      skip,
      fromDate,
      toDate,
    } = this.state;
    const filter = { author, changedProperty, limit, skip, fromDate, toDate };
    console.log(filter);
    axios
      .put(`/audit/snapshots/class/${this.props.cls}/filter`, filter)
      .then((response) => {
        const jsn = response.data;
        console.log(jsn);
        this.setState({ entities: jsn });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const cards = this.state.entities.map(this.toCard());
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className="formController"
            id="standard-basic"
            label="Author"
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
          <TextField
            className="formController"
            id="standard-basic"
            label="Changed Property"
            type="text"
            name="changedProperty"
            value={this.state.changedProperty}
            onChange={this.handleChange}
          />
          <TextField
            className="formController"
            id="standard-basic"
            label="Limit"
            type="number"
            name="limit"
            value={this.state.limit}
            onChange={this.handleChange}
          />
          <TextField
            className="formController"
            id="standard-basic"
            label="Skip"
            type="number"
            name="skip"
            value={this.state.skip}
            onChange={this.handleChange}
          />
          <TextField
            id="date"
            label="From Date"
            type="date"
            className="formController"
            InputLabelProps={{
              shrink: true,
            }}
            name="fromDate"
            value={this.state.fromDate}
            onChange={this.handleChange}
          />
          <TextField
            id="date"
            label="To Date"
            type="date"
            className="formController"
            InputLabelProps={{
              shrink: true,
            }}
            name="toDate"
            value={this.state.toDate}
            onChange={this.handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            className="formController"
            type="submit"
            onClick={this.submitHandler}
          >
            Filter
          </Button>
        </Grid>
        {cards}
      </Grid>
    );
  }

  toCard() {
    return (object) => (
      <Grid item xs key={object.commitMetadata.id}>
        <Card className="entity-object">
          <div className="entity-object__id">
            <span>
              Id: <strong>{object.globalId.cdoId}</strong>
            </span>
          </div>
          <div className="entity-object__type">
            <p>Type : {object.type}</p>
            <span>
              Changed Properties :{" "}
              {object.changedProperties.map((prop) => (
                <strong>{prop}, </strong>
              ))}
            </span>
          </div>
          <CardContent className="entity-object__properties">
            <Table className="entity-object__properties__table">
              <TableHead>
                <TableRow className="entity-object__properties__table__row">
                  <TableCell>Property</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(object.state).map((key) => {
                  return (
                    <TableRow
                      key={`${object.commitMetadata.commitId}-${key}`}
                      className="entity-object__properties__table__row"
                    >
                      <TableCell>
                        <strong>{key}</strong>
                      </TableCell>
                      <TableCell>
                        {typeof object.state[key] === "object" ? (
                          <ul>
                            {this.extractEntity(
                              object.state[key],
                              object.globalId.cdoId
                            )}
                          </ul>
                        ) : (
                          object.state[key]
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <Typography type="body1" className="entity-object__metadata">
            Commited By
            <strong> {object.commitMetadata.author} </strong>
            At <strong> {object.commitMetadata.commitDate} </strong>
          </Typography>
        </Card>
      </Grid>
    );
  }
}

export default SnapshotsOnClassView;