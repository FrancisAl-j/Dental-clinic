const Button = ({ appointment, updateStatus }) => {
  const appointmentDate = new Date(appointment.appointmentDate);

  const isPastAppointment = appointmentDate < new Date();
  return (
    <div>
      {isPastAppointment ? (
        <button
          disabled
          onClick={() => updateStatus(appointment._id, appointment.status)}
        >
          Appointment Done
        </button>
      ) : (
        <button
          disabled={appointment.status === "Canceled"}
          onClick={() => updateStatus(appointment._id, appointment.status)}
        >
          Update Status
        </button>
      )}
    </div>
  );
};
export default Button;
