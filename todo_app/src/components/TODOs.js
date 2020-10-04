import React,{Component} from 'react';
import {Container,Form,Button} from 'react-bootstrap';
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
        this.onClickEventsTab = this.onClickEventsTab.bind(this);
        this.onChangeSummary = this.onChangeSummary.bind(this)
        this.onClickNewEvent = this.onClickNewEvent.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.onClickAddButton = this.onClickAddButton.bind(this);
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
            emptyEvents: false,
            activeTab: 'events',
            summary:'',
            description:'',
            startDate:'',
            endDate:''
        }
    }
    componentDidMount() {
        this.getEvents();
    }
    onClickEventsTab() {
        this.setState({
            activeTab: 'events'
        });
    };
    onClickNewEvent() {
        this.setState({
            activeTab: 'newEvent'
        });
    };
    onChangeSummary(e) {
        this.setState({
            summary: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        });
    }
    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
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
    onClickAddButton(e) {
        e.preventDefault();
        let data= {
            Summary : this.state.summary,
            Description : this.state.description,
            StartDate : this.state.startDate,
            EndDate : this.state.endDate,
            Token: this.state.token
        }
        axios.post('http://localhost:8080/api/add-new-event',data)
            .then((response)=>{
                if(response.data.event){
                    this.setState({
                        summary : '',
                        description : '',
                        startDate : '',
                        endDate : ''
                    });
                    window.location.href = "http://localhost:3000/todos";
                }
            });
    }

    render() {
        return (
            <div className="todo">

                <Container align="center" style={{paddingTop:'35px', paddingBottom:'35px'}}>
                    <div align="center" className="heading">
                        <div className="btn-group" style={{margin: '0px', padding: '0px',width:'100%',height: '35px'}}>
                            <button className="btn"
                                    style={
                                        (this.state.activeTab === 'events' ? {backgroundColor:'midnightblue', color:'white'} : null)
                                    }
                                    onClick={this.onClickEventsTab}
                            >My Events</button>
                            <button className="btn"
                                    style={
                                        (this.state.activeTab === 'newEvent' ? {backgroundColor:'midnightblue', color:'white'} : null)
                                    }
                                    onClick={this.onClickNewEvent}
                            >Add New Event</button>
                        </div>
                        <hr/>
                    </div>
                    {
                        (this.state.activeTab === 'events' ?
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
                                :
                            <div className="addEvent" style={{margin: '0px', padding: '20px',width:'100%',height: '300px'}}>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td width="90px">
                                            <Form.Label className="required">Summary</Form.Label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="summary"
                                                name="summary"
                                                value={this.state.summary}
                                                onChange={this.onChangeSummary}
                                                required={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="90px">
                                            <Form.Label className="required">Description</Form.Label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={this.state.description}
                                                onChange={this.onChangeDescription}
                                                required={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label className="required">Start Date</Form.Label>
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={this.state.startDate}
                                                onChange={this.onChangeStartDate}
                                                required={true}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Form.Label className="required">End Date</Form.Label>
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={this.state.endDate}
                                                onChange={this.onChangeEndDate}
                                                required={true}
                                            />
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <Container align="center" style={{paddingTop: '10px'}}>
                                    <Button onClick={this.onClickAddButton}>Add Event</Button>
                                </Container>
                            </div>
                        )
                    }
                </Container>
            </div>
        );
    }
}