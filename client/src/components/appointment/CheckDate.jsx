const CheckDate = ({ appointment }) => {
  const appointmentDate = new Date(appointment.appointmentDate);

  const isPastAppointment = appointmentDate < new Date();

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    };
    let formattedDate = date.toLocaleString("en-GB", options);

    // Remove ":00" if the time is exactly on the hour (e.g., "00:00", "01:00")
    if (formattedDate.endsWith(":00")) {
      formattedDate = formattedDate.slice(0, -3); // Remove the ":00"
    }

    // If the hour is 00 and the time part was completely removed, remove the comma
    if (formattedDate.endsWith(", 00")) {
      formattedDate = formattedDate.replace(", 00", ""); // Remove ", 00"
    }

    return formattedDate; // e.g., "06/09/2024" if the time was 00:00
  };

  return (
    <div>
      {isPastAppointment ? (
        <p>
          This appointment was already done! at{" "}
          {formatDate(appointment.appointmentDate)}
        </p>
      ) : (
        <p>{formatDate(appointment.appointmentDate)}</p>
      )}
    </div>
  );
};

export default CheckDate;
