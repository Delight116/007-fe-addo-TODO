import React from 'react';
import ReactDOM from 'react-dom';
import {Pagination} from 'react-bootstrap';

import TaskApi from './../../tasks/TaskApi';

class Paginations extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
          activePage: +this.context.params.page,
        }
        console.log(this.context.params.page);
          this.handleSelect = this.handleSelect.bind(this)
    }
    handleSelect(eventKey){
      window.location.hash = "tasks/"+eventKey;
      TaskApi.setPage(eventKey)
      TaskApi.getTasks()
      this.setState({
        activePage: eventKey
      });
    }
    render(){
        let pag = null;
        if(this.props.pages > 1){
          pag = (<Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.props.pages}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect}
          />)
        }

        return(
        <div>
          {pag}
        </div>
        )
    }



}
Paginations.contextTypes = {
  params: React.PropTypes.object,
}

export default Paginations;
