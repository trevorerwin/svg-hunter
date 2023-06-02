




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
            <div
              className="form-center"
              style={{ fontSize: "1.5rem", textAlign: "left" }}
            >
              <Label>Name</Label>
              <div className="d-flex justify-content-center">
                <Input
                  className="input-field"
                  placeholder="Full Name:"
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className="form-center"
              style={{ fontSize: "1.5rem", textAlign: "left" }}
            >
              <Label>Email</Label>
              <div className="d-flex justify-content-center">
                <Input
                  className="input-field"
                  placeholder="Email:"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className="form-center mb-2"
              style={{ fontSize: "1.5rem", textAlign: "left" }}
            >
              <Label>Password</Label>
              <div className="d-flex justify-content-center">
                <Input
                  className="input-field"
                  placeholder="Password:"
                  required
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div
              className="form-center mb-2"
              style={{ fontSize: "1.5rem", textAlign: "left" }}
            >
              <Label>Message</Label>
              <div className="d-flex justify-content-center">
                <textarea
                  className="message-field"
                  placeholder="Type your message here..."
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>