import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { endOfDay, startOfDay, startOfHour, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useField } from '@rocketseat/unform';
import { addHours } from 'date-fns/esm';
import { Container } from './styles';

export default function DateInput({ name }) {
  const { fieldName, registerField, defaultValue } = useField(name);

  const [date, setDate] = useState(defaultValue);
  const [today, setToday] = useState(
    defaultValue
      ? format(defaultValue, 'yyyy-M-dd') === format(new Date(), 'yyyy-M-dd')
      : true
  );
  const ref = useRef();

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    console.tron.log('entrei');
  }, [ref.current, fieldName]); //eslint-disable-line
  return (
    <Container>
      <DatePicker
        selected={date}
        onChange={newDate => {
          if (isBefore(newDate, new Date())) {
            setDate(startOfHour(addHours(new Date(), 1)));
          } else {
            setDate(startOfHour(newDate));
          }
        }}
        dateFormat="d 'de' MMMM 'de' yyyy 'às' H:mm 'horas'"
        showTimeSelect
        timeCaption="Horário"
        timeIntervals={60}
        fixedHeight
        minDate={new Date()}
        minTime={today ? new Date() : startOfDay(new Date())}
        maxTime={endOfDay(new Date())}
        locale={pt}
        id="date"
        ref={ref}
        placeholderText="Data do evento"
        onSelect={selectedDate => {
          setToday(
            format(selectedDate, 'yyyy-M-dd') ===
              format(new Date(), 'yyyy-M-dd')
          );
          console.tron.log(defaultValue);
        }}
      />
    </Container>
  );
}
