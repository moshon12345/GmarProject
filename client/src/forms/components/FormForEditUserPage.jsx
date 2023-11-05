import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { Button, Container, OutlinedInput, Typography } from "@mui/material";
import { useUser } from "..//..//users//providers//UserProvider";
import useForm from "../../forms/hooks/useForm";
import useUsers from "..//..//users//hooks//useUsers";
import signUpSchema from "..//..//users//models//joi-schema//signUpSchema";
import UserForm from "..//..//users//components//UserForm";
import initialSignUpForm from "..//..//users//helpers//initial-forms//initialSignUpForm";
import Input from "./Input";
import { alt, func, object, string } from "joi";
import UserFormForEditUser from "../../users/components/UserFormForEditUser";
import normalizeUser from "../../users/helpers/normalization/normalizeUser";

const FormForEditUserPage = ({
  onSubmit,
  onReset,
  errors,
  onFormChange,
  onInputChange,
  data,
  title,
}) => {
  const { handleSignup } = useUsers();

  const { value, ...rest } = useForm(
    initialSignUpForm,
    signUpSchema,
    handleSignup
  );

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8181';
  const { handleGetUsers, users, handleUpdateUser } = useUsers();
  const { id } = useParams();
  const { user } = useUser();

  useEffect(() => {
    handleGetUsers()
  }, []);

  let dataToSend = [];

  const checkIt = () => {

  let userId = '';
  let relevanticUser = '';

  for(let i in users) {
    if (users[i]._id == user._id) {
        relevanticUser = users[i]
        let dataConstructionCompareToUser = {
          "first": relevanticUser.name.first,
          "middle": relevanticUser.name.middle,
          "last": relevanticUser.name.last,
          "phone": relevanticUser.phone,
          "email": relevanticUser.email,
          "password": value.data.password,
          "url": relevanticUser.image.url,
          "alt": relevanticUser.image.alt,
          "state": relevanticUser.address.state,
          "country": relevanticUser.address.country,
          "city": relevanticUser.address.city,
          "street": relevanticUser.address.street,
          "houseNumber": relevanticUser.address.houseNumber,
          "zip": relevanticUser.address.zip,
          "isBusiness": relevanticUser.isBusiness
    }
    for(let j in value.data) {
      if (value.data[j] == "") {
        value.data[j] = dataConstructionCompareToUser[j]
      }
    }
        handleUpdateUser(value.data, user._id)
    }
  }
}

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserFormForEditUser
        relevanticUser={rest.relevanticUser}
        title="edit user details"
        onSubmit={checkIt}
        onReset={rest.handleReset}
        onFormChange={rest.validateForm}
        // onInputChange={checkIt}
        onInputChange={rest.handleChange}
        data={value.data}
        errors={value.errors}
        setData={rest.setData}
      />
    </Container>
    
  );
};

// export default React.memo(FormForEditUserPage);

export default FormForEditUserPage;

