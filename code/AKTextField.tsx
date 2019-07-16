import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import "@atlaskit/css-reset"
import Form, {
    Field,
    ErrorMessage,
    HelperMessage,
    ValidMessage,
} from "@atlaskit/form"
import AKTextfield from "@atlaskit/textfield"
import styled from "styled-components"

const Wrapper = styled.div`
  > div {
    margin-top: 0;
  }

  input {
    height: 32px;
  }
`

Textfield.defaultProps = {
    width: 240,
    height: 76,
    label: "Label",
    isRequired: false,
    showValidation: true,
    placeholder: "Placeholder",
    errorMessage: "Error text",
    validMessage: "Valid text",
    helperMessage: "Helper text",
    validationValue: "helper",
    value: "",
    onChange: () => null,
}

export function Textfield(props) {
    const [state, setState] = React.useState({ value: "" })

    const handleChange = (name: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        // console.log(event.target.value)
        setState({ ...state, [name]: event.target.value })
        //if props.onchange exist, then call it (to make sure it works with overrides)
        if (props.onChange) props.onChange(event)
    }

    React.useEffect(() => {
        setState(props)
    }, [props])

    let validationText = {
        error: <ErrorMessage>{props.errorMessage}</ErrorMessage>,
        valid: <ValidMessage> {props.validMessage}</ValidMessage>,
        helper: <HelperMessage> {props.helperMessage}</HelperMessage>,
    }

    return (
        <Wrapper>
            <Form onSubmit={data => console.log("form data", data)}>
                {({ formProps }) => (
                    <form {...formProps}>
                        <Field
                            name="textField"
                            label={props.label}
                            defaultValue={"test"}
                            isRequired={props.isRequired}
                        >
                            {({ fieldProps }) => (
                                <>
                                    <AKTextfield
                                        {...fieldProps}
                                        placeholder={props.placeholder}
                                        onChange={handleChange("value")}
                                        value={state.value}
                                    />

                                    {props.showValidation &&
                                        validationText[props.validationValue]}
                                </>
                            )}
                        </Field>
                    </form>
                )}
            </Form>
        </Wrapper>
    )
}

addPropertyControls(Textfield, {
    label: {
        type: ControlType.String,
        title: "Label",
    },
    value: {
        type: ControlType.String,
        title: "Value",
    },
    placeholder: {
        type: ControlType.String,
        title: "Placeholder",
    },
    isRequired: {
        type: ControlType.Boolean,
        title: "Required?",
    },
    showValidation: {
        type: ControlType.Boolean,
        title: "Validation?",
    },
    validationValue: {
        hidden(props) {
            return props.showValidation === false
        },
        type: ControlType.SegmentedEnum,
        title: "Validation",
        options: ["error", "valid", "helper"],
        optionTitles: ["Error", "Valid", "Helper"],
    },
    errorMessage: {
        hidden(props) {
            return props.validationValue !== "error"
        },
        type: ControlType.String,
        title: "Error text",
    },
    validMessage: {
        hidden(props) {
            return props.validationValue !== "valid"
        },
        type: ControlType.String,
        title: "Valid text",
    },
    helperMessage: {
        hidden(props) {
            return props.validationValue !== "helper"
        },
        type: ControlType.String,
        title: "Helper text",
    },
})
