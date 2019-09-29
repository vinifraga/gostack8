import React, { Component } from "react";

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    techs: [],
    newTech: ""
  };

  componentDidMount() {
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleInputSubmit = e => {
    e.preventDefault();
    const { newTech, techs } = this.state;

    this.setState({ techs: [...techs, newTech], newTech: "" });
  };

  handleDelete = tech => {
    const { techs } = this.state;

    this.setState({ techs: techs.filter(index => index !== tech) });
  };

  render() {
    const { techs, newTech } = this.state;
    return (
      <form onSubmit={this.handleInputSubmit}>
        <h1>{newTech}</h1>
        <ul>
          {techs.map(tech => (
            <TechItem
              key={tech}
              onDelete={() => this.handleDelete(tech)}
              tech={tech}
            />
          ))}
        </ul>
        <input type="text" onChange={this.handleInputChange} value={newTech} />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
