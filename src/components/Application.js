import React from 'react';
import DayList from "./DayList";
import Appointment from './Appointment';
import useApplicationData from 'hooks/useApplicationData'
import "components/Application.scss";

// importing helper functions
import {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay,
  // getSpotsForDay
} from '../helpers/selectors';

export default function Application() {
  
  const {
    state,
    setDay,
    deleteInterview,
    bookInterview
  } = useApplicationData();
  // console.log('useappdata', state);
  
  const interviewers = getInterviewersForDay(state, state.day);
    
  const appointmentsIN = getAppointmentsForDay(state, state.day)
  console.log('application root', useApplicationData(), state)
  // console.log("appointmentsIN", appointmentsIN)
  const appointments = appointmentsIN
  .map(
    appointment => {
      // console.log('state.day', state.day)
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} spots={state.days.spots}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
};