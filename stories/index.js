import React, { Fragment } from "react";
import DayListItem from "components/DayListItem";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DayList from "components/DayList";

import Appointment from "components/Appointment";
import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
// import index from "components/Appointment/index";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

import InterviewerList from "components/InterviewerList"
import InterviewerListItem from "components/InterviewerListItem"

import "index.scss";

import Button from "components/Button";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));
  
  storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));

    // INTERVIEWER LIST ITEM

    const interviewer = {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };
    
    storiesOf("InterviewerListItem", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Unselected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
        />
      ))
      .add("Selected", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected
        />
      ))
      .add("Clickable", () => (
        <InterviewerListItem
          id={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          setInterviewer={action("setInterviewer")(interviewer.id)}
        />
      ));
    
      // INTERVIEWERS 

    const interviewers = [
      { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
      { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
      { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
    ];
    
    storiesOf("InterviewerList", module)
      .addParameters({
        backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
      })
      .add("Initial", () => (
        <InterviewerList
          interviewers={interviewers}
          setInterviewer={action("setInterviewer")}
        />
      ))
      .add("Preselected", () => (
        <InterviewerList
          interviewers={interviewers}
          interviewer={3}
          setInterviewer={action("setInterviewer")}
        />
      ));

      storiesOf("Appointment", module)
      .addParameters({
        backgrounds: [{ name: "white", value: "#fff", default: true }]
      })
      .add("Appointment", () => <Appointment />)
      .add("Appointment with Time", () => <Appointment time="12pm" />)
      .add("Header", () => <Header time="12pm" />)
      .add("Empty", () => <Empty onAdd={action("onAdd")} />)
      .add('Show', () => (
        <Show
          mode="SHOW"
          student={appointments[3].interview.student}
          interviewer={interviewer}
          onEdit={action('onEdit')}
          onDelete={action('onDelete')}
        />
      ))
      .add('Confirm', () => (
        <Confirm
          onCancel={action('onCancel')}
          onConfirm={action('onConfirm')}
          message="Delete the Appointment?"
        />
        ))
        .add('Saving', () => <Status message="Saving" />)
        .add('Deleting', () => <Status message="Deleting" />)
        .add('Error Saving', () => (
          <Error message="Could not save appointment." onClose={action('onClose')} />
        ))
        .add('Error Deleting', () => (
          <Error
            message="Could not delete appointment."
            onClose={action('onClose')}
          />
        ))
        .add('Create', () => (
          <Form
            mode="CREATE"
            interviewers={interviewers}
            onSave={action('onSave')}
            onCancel={action('onCancel')}
          />
        ))
        .add('Edit', () => (
          <Form
            mode="EDIT"
            name="Nolan Boxill"
            interviewer={3}
            interviewers={interviewers}
            onSave={action('onSave')}
            onCancel={action('onCancel')}
          />
        ))
        .add("Appointment Empty", () => (
          <Fragment>
            <Appointment id={1} time="12pm" />
            <Appointment id="last" time="1pm" />
          </Fragment>
        ))
        .add("Appointment Booked", () => (
          <Fragment>
            <Appointment
              id={1}
              time="12pm"
              interview={{ student: "Lydia Miller-Jones", interviewer }}
            />
            <Appointment id="last" time="1pm" />
          </Fragment>
        ))