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
        <div className="contact-container">
            <Form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2 className="form-title">Contact Us</h2>
                    <p id="move-p-tag" className="form-subtitle">
                        Fill in the form below to send us an email. We will
                        usually get back to you within 24 hours.
                    </p>
                </div>

                <FormGroup>
                    <Input
                        style={{ height: "40px" }}
                        className="form-input custom-input"
                        placeholder="Name"
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Input
                        style={{ height: "40px" }}
                        className="form-input custom-input"
                        placeholder="Email"
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        style={{ height: "40px" }}
                        className="form-input custom-input"
                        placeholder="Subject"
                        required
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />

                    <textarea
                        className="form-input form-textarea custom-textarea"
                        placeholder="Message"
                        required
                        style={{ height: "200px" }}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />

                    <Button
                        id="change-button-color"
                        className="form-button custom-button"
                        type="submit"
                    >
                        Submit
                    </Button>
                </FormGroup>
            </Form>
        </div>
    );
};

export default Contact;
