
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class myForm extends React.Component {
  state = {
    index: 0,
    name: '',
    location: '',
    month: '',
    day: '',
    ticketlink: '',
    }

    onChange = e => {
      this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount(){
      // if item exists, populate the state with proper data
      if(this.props.item){
        console.log("Items exist")
        const { index, name, location, month, day, ticketlink } = this.props.item
        this.setState({ index, name, location, month, day, ticketlink })
      } else (console.log("Items dont exist!"))
    }

    render() {
      return (
        <Form onSubmit={this.props.item}>
        <FormGroup>
          <Label for="name">Artist</Label>
          <Input type="text" name="name" id="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
        </FormGroup>
        <FormGroup>
          <Label for="location">Venue</Label>
          <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location}  />
        </FormGroup>
        {/*<FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location}  placeholder="City, State" />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input type="text" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby}  />
        </FormGroup>
        <Button>Submit</Button> */}
      </Form>

      );
    }
}

export default myForm
