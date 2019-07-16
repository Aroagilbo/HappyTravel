import * as React from "react"
import { Data, Override } from "framer"

const data = Data({
    name: "",
    email: "",
    surname: "",
    username: "",
    date: "",
    checked: false,
    showValidation: false,
    errorMessage: "",
})

///////////////////// NAME ///////////////////////////

// We want to get the name we type and store it in the data object called name.
export function GetName(): Override {
    return {
        value: data.name,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            data.name = event.target.value
        },
    }
}

//We want the value that we just stored in the data object to be reflected in the text field.
export function ChangeName(): Override {
    return {
        text: data.name,
    }
}

///////////////////// SURNAME ///////////////////////////

// We want to get the surname we type and store it in the data object called name.
export function GetSurname(): Override {
    return {
        value: data.surname,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            data.surname = event.target.value
        },
    }
}

//We want the value that we just stored in the data object to be reflected in the text field.
export function ChangeSurname(): Override {
    return {
        text: data.surname,
    }
}

///////////////////// EMAIL ///////////////////////////

// We want to get the email we type and store it in the data object called email. Additionally, we want to validate if the input is an email and show an error message if it's not.
export function GetEmail(): Override {
    return {
        value: data.email,
        showValidation: data.showValidation,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            data.email = event.target.value
            setTimeout(() => {
                if (data.email === "") {
                    data.showValidation = false
                }
                if (data.email.includes("@")) {
                    data.showValidation = false
                } else {
                    data.showValidation = true
                }
            }, 2000)
        },
    }
}

//We want the value that we just stored in the data object called email to be reflected in the text field.
export function ChangeEmail(): Override {
    return {
        text: data.email,
    }
}

///////////////////// USERNAME ///////////////////////////

// We want to get the usernamename we type and store it in the data object called name.
export function GetUsername(): Override {
    return {
        value: data.username,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            data.username = event.target.value
        },
    }
}

//We want the value that we just stored in the data object to be reflected in the Lozenge.
export function ChangeUsername(): Override {
    return {
        value: data.username,
    }
}

//////////////////// Checkbox ///////////////////////////

//We want to change the get the value of the type from the select component and store it in the override.
export function Checkbox(): Override {
    // console.log("lalalal")
    return {
        isChecked: data.checked,
        onValueChange: (isChecked: boolean) => {
            data.checked = isChecked
        },
    }
}

//////////////////// ENABLE BUTTON ///////////////////////////

export const ButtonEnabled: Override = () => {
    return {
        isDisabled:
            data.name === "" ||
            data.surname === "" ||
            data.username === "" ||
            data.email === "" ||
            data.showValidation === true,
    }
}
