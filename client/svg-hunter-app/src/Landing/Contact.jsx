import { useState } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import axios from "axios";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    // Send the email data to the backend server
    try {
      await axios.post("http://localhost:4000/user/send-email", {
        name,
        email, // Use the user-entered email as the recipient
        subject,
        message,
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <br />
      <div className="contact-container">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <div className="text-center mt-4">
              <p
                className="mb-5"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "1.5rem",
                }}
              >
                Fill in the form below to send us an email. We will usually get
                back to you within 24 hours.
              </p>
            </div>

            <div className="form-center" style={{ fontSize: "1.5rem" }}>
              <Label>Name:</Label>
              <div className="d-flex justify-content-center">
                <Input
                  className="input-field"
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-center" style={{ fontSize: "1.5rem" }}>
              <Label>Email:</Label>
              <div className="d-flex justify-content-center">
                <Input
                  className="input-field"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-center mb-2" style={{ fontSize: "1.5rem" }}>
              <Label>Password:</Label>
              <div className="d-flex justify-content-center">
                <Input
                  className="input-field"
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-center mb-2" style={{ fontSize: "1.5rem" }}>
              <Label>Message:</Label>
              <div className="d-flex justify-content-center">
                <textarea
                  className="message-field"
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <Button
                style={{
                  fontFamily: "Roboto",
                  fontSize: "1.5rem",
                }}
                className="submit-button"
                type="submit"
                id="change-button-color"
              >
                Submit
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default Contact;
