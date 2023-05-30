import { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "15px",
          backgroundColor: "whitesmoke",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "1000px",
          padding: "2rem",
          margin: "0 auto",
          marginTop: "20px",
          flexDirection: "column",
        }}
      >
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

            <div className="text-center mb-2">
              <div className="d-flex justify-content-center">
                <Input
                  style={{
                    width: "700px",
                    fontFamily: "Roboto",
                    fontSize: "1.5rem",
                    marginBottom: "20px",
                  }}
                  className=" align-left"
                  placeholder="Name:"
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center mb-2">
              <div className="d-flex justify-content-center">
                <Input
                  style={{
                    width: "700px",
                    fontFamily: "Roboto",
                    fontSize: "1.5rem",
                    marginBottom: "20px",
                  }}
                  className="align-left"
                  placeholder="Email:"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center mb-2">
              <div className="d-flex justify-content-center">
                <Input
                  style={{
                    width: "700px",
                    fontFamily: "Roboto",
                    fontSize: "1.5rem",
                    marginBottom: "20px",
                  }}
                  className="align-left"
                  placeholder="Subject:"
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="text-center mb-2">
              <div className="d-flex justify-content-center">
                <textarea
                  style={{
                    width: "700px",
                    resize: "none",
                    outline: "none",
                    height: "100px",
                    fontFamily: "Roboto",
                    fontSize: "1.5rem",
                  }}
                  placeholder="Message:"
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
