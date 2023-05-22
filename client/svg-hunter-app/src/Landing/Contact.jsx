import { Form, FormGroup, Input, Button } from "reactstrap";

const Contact = (props) => {
    function handleSubmit() {
        console.log("does it work?");
    }
    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "60vh" }}
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
                                Fill in the form below to send us an email. We
                                will usually get back to you within 24 hours.
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                        fontFamily: "Roboto",
                                        fontSize: "1.5rem",
                                    }}
                                    className=" align-left"
                                    placeholder="Message:"
                                    rows={6}
                                ></textarea>
                            </div>
                        </div>
                    </FormGroup>
                    <div className="text-center mb-2 button">
                        <Button
                            style={{ fontSize: "1.5rem" }}
                            id="change-button-color"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Contact;
