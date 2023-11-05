import React, { useCallback, useEffect, useState } from "react";
import { func, object, string } from "prop-types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import ROUTES from "../../routes/routesModel";
import { Button, Container, IconButton, InputAdornment, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormForEditUser from "./FormForEditUser";
// import ShowAndHidePassword from "../passworInput/PasswordInput";
import { getUserApi } from "..//..//users//services//usersApiService"
import useUsers from "../hooks/useUsers";
import { useUser } from "../providers/UserProvider";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const UserFormForEditUser = ({
  onSubmit,
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange,
  setData,
}) => {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { id } = useParams();
  const { handleGetUsers, users, handleUpdateUser } = useUsers();

  // const [users, setUsers] = useState (null);
  // const [userApi, setUserApi] = useState (null);
  // const [pending, setPending] = useState (false);
  // const [error, setError] = useState (null);

  const navigate = useNavigate ();
  const {user} = useUser ();
  useAxios ();
// console.log(id)
  // const requestStatus = useCallback (
  //   (pending, error, users, user, userApi = null) => {
  //     setPending (pending);
  //     setUsers (users);
  //     setUser (user);
  //     // setUserApi (userApi)
  //     setError (error);
  //   },
  //   [setUser]
  // ); 

  // let userApiToPage = ''
  // console.log(user._id)

useEffect(() => {
  handleGetUsers()
  // handleGetUser(id)
}, []);

let dataToLable = '';
for(let i in users) {
  if (users[i]._id == id) {
    dataToLable = users[i]
    // console.log(dataToLable)
  }
}

// if (userApiToPage) {
  return (
    <FormForEditUser
    // relevanticUser={relevanticUser}
      onSubmit={onSubmit}
      onReset={onReset}
      onChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
      to={ROUTES.MOVIES}
    >
<Container>
    {/* <Typography 
          variant="h6">First Name:
    </Typography> */}
      <Input
        name="first"
        label="first"
        // label={dataToLable.name.first}
        error={errors.first}
        onChange={onInputChange}
        data={data}
        sm={16}
        mb={3}
      />
</Container>
<Container>
      <Input
        name="middle"
        label="middle"
        // label={dataToLable.name.middle}
        // value="none"
        error={errors.middle}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input
        name="last"
        label="last"
        // label={relevanticUser.name.last}
        error={errors.last}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input
        name="phone"
        label="phone"
        // label={relevanticUser.phone}
        type="phone"
        error={errors.phone}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input
        name="email"
        label="email"
        // label={relevanticUser.email}
        type="email"
        error={errors.email}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input 
        name="password"
        label={"password"}
        type="password"
        error={errors.password}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input
        name="url"
        label="url"
        // label={relevanticUser.image.url}
        error={errors.url}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
        required={false}
      />
</Container>
<Container>
<Input
        name="alt"
        label="alt"
        // label={relevanticUser.image.alt}
        error={errors.alt}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
        required={false}
      />
</Container>
<Container>
<Input
        name="state"
        label="state"
        // label={relevanticUser.address.state}
        error={errors.state}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
        required={false}
      />
</Container>
<Container>
<Input
        name="country"
        label="country"
        // label={relevanticUser.address.country}
        error={errors.country}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input
        name="city"
        label="city"
        // label={relevanticUser.address.city}
        error={errors.city}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input
        name="street"
        label="street"
        // label={relevanticUser.address.street}
        error={errors.street}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      />
</Container>
<Container>
<Input
        name="houseNumber"
        label="houseNumber"
        // label={relevanticUser.address.houseNumber}
        type="number"
        error={errors.houseNumber}
        onChange={onInputChange}
        data={data}
        sm={16}
mb={3}
      /> 
</Container>

<Container>
<Input
        name="zip"
        label="zip"
        // label={relevanticUser.address.zip}
        error={errors.zip}
        onChange={onInputChange}
        data={data}
        sm={16}
        mb={3}
        required={false}
      />
</Container>

      <Grid item>
        <FormControlLabel
          onChange={(e) => {
            setData({ ...data, isBusiness: !!e.target.checked });
          }}
          name="isBusiness"
          control={<Checkbox value={data.isBusiness} color="primary" />}
          label="Signup as business"
        />
      </Grid>
    </FormForEditUser>
  );
// }
};
// }

UserFormForEditUser.propTypes = {
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onFormChange: func.isRequired,
  title: string.isRequired,
  errors: object.isRequired,
  data: object.isRequired,
  onInputChange: func.isRequired,
  setData: func.isRequired,
};

export default React.memo(UserFormForEditUser);



