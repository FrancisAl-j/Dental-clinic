const CreateClinic = () => {
  return (
    <div className="form-container">
      <h1>Create Clinic</h1>

      <div className="form-wrapper">
        <form>
          <div className="form-element">
            <span>Clinic name</span>
            <input type="text" name="clinicName"></input>
          </div>

          <div className="form-element">
            <span>Location</span>
            <input type="text" name="location"></input>
          </div>

          <div className="form-element">
            <span>Email</span>
            <input type="email" name="email"></input>
          </div>

          <div className="form-element">
            <span>Phone Number</span>
            <input type="number" name="phone"></input>
          </div>

          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateClinic;
