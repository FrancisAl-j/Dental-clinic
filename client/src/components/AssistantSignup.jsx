const AssistantSignup = () => {
  return (
    <div className="form-container">
      <h1>Create Account for assistant</h1>

      <div className="form-wrapper">
        <form>
          <div className="form-element">
            <span>Username</span>
            <input type="text" name="username" />
          </div>

          <div className="form-element">
            <span>email</span>
            <input type="email" name="email" />
          </div>

          <div className="form-element">
            <span>password</span>
            <input type="password" name="password" />
          </div>

          <div className="form-element">
            <span>Confirm Password</span>
            <input type="password" name="Cpassword" />
          </div>

          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default AssistantSignup;
