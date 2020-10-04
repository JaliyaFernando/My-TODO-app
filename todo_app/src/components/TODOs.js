import React,{Component} from 'react';
import {Container} from 'react-bootstrap';
import '../App.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { forwardRef } from 'react';
import Spinner from "react-bootstrap/Spinner";
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default class TODOs extends Component{
    constructor(props) {
        super(props);
        this.getEvents = this.getEvents.bind(this);
        const cookies = new Cookies();
        let token = cookies.get('token');
        this.state = {
            token:token,
            events: [],
            eventColumns: [
                {
                    title: 'Summary',
                    field: 'summary',
                    width: 200
                },
                {
                    title: 'Start',
                    field: 'start.dateTime',
                    width: 250
                },
                {
                    title: 'End',
                    field: 'end.dateTime',
                    width: 250
                },
                {
                    title: 'Creator',
                    field: 'creator.email'
                }
            ],
            emptyEvents: false
        }
    }
    componentDidMount() {
        this.getEvents();
    }

    getEvents(){
        axios.post("http://localhost:8080/api/events",this.state.token)
            .then(res => {
                console.log("events:",res.data);
                if(res.data.events && res.data.events !== "No upcoming events found"){
                    this.setState({
                        events: res.data.events
                    });
                }
                else {
                    this.setState({
                        emptyEvents: true
                    });
                }
            });
    }

    render() {
        return (
            <div className="todo">
                <Container align="center" style={{paddingTop:'35px', paddingBottom:'35px'}}>
                    {
                        (this.state.events.length > 0 || this.state.emptyEvents === true ?
                            <MaterialTable
                                icons={tableIcons}
                                title="Upcoming Events"
                                columns={this.state.eventColumns}
                                data={this.state.events}
                                options={{actionsColumnIndex: -1}}
                            />
                            :
                            <div style={{color: 'white'}}>
                                <Spinner
                                    as="div"
                                    animation="border"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <p>Loading...</p>
                            </div>)
                    }
                </Container>
            </div>
        );
    }
}