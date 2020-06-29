import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import "./ChangesView.css";

class ChangesOnClassView extends Component {
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
    axios
      .get(`audit/changes/class/${this.props.cls}`)
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
      .put(`audit/changes/class/${this.props.cls}/filter`, filter)
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
      <div>
        <Typography type="title" variant="h4">
          Changes on Class
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              style={{ margin: 4 }}
              id="standard-basic"
              label="Author"
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <TextField
              style={{ margin: 4 }}
              id="standard-basic"
              label="Changed Property"
              type="text"
              name="changedProperty"
              value={this.state.changedProperty}
              onChange={this.handleChange}
            />
            <TextField
              style={{ margin: 4 }}
              id="standard-basic"
              label="Limit"
              type="number"
              name="limit"
              value={this.state.limit}
              onChange={this.handleChange}
            />
            <TextField
              style={{ margin: 4 }}
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
              style={{ margin: 4 }}
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
              style={{ margin: 4 }}
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
              style={{ marginTop: 14 }}
              type="submit"
              onClick={this.submitHandler}
            >
              Filter
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Box
              textAlign="center"
              m={1}
              fontWeight="fontWeightBold"
              fontSize="h4.fontSize"
              fontFamily="Monospace"
            >
              {this.state.entities.length === 0
                ? "No record found"
                : `Total ${this.state.entities.length} records found`}
            </Box>
          </Grid>
          {cards}
        </Grid>
      </div>
    );
  }

  toCard() {
    return (object) => (
      <Grid item xs key={object.commitMetadata.id}>
        <Card className="entity-object">
          <div className="entity-object__id">
            <span>
              <p>
                Id: <strong>{object.globalId.cdoId}</strong>
              </p>
              <p>
                Entity: <strong>{object.globalId.entity}</strong>
              </p>
              <p>
                Change Type : <strong>{object.changeType}</strong>
              </p>
              <p>
                Changed Property : <strong>{object.property}</strong>
              </p>
            </span>
          </div>
          <CardContent className="entity-object__properties">
            <Table className="entity-object__properties__table">
              <TableHead>
                <TableRow className="entity-object__properties__table__row">
                  <TableCell>
                    <strong>Old {object.property}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>New {object.property}</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={`${object.commitMetadata.commitId}`}
                  className="entity-object__properties__table__row"
                >
                  <TableCell>{object.left}</TableCell>
                  <TableCell>{object.right}</TableCell>
                </TableRow>
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

export default ChangesOnClassView;
