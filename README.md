# Youtube Notes

It is a simple application to take notes of youtube videos. It has the following features:

- User can signup and signin using NextAuth
- User can add a youtube video link
- User can take notes of the video
- User can edit the notes
- User can delete the notes
- User can add image to the notes
- User can add the exact timestamp at which the note was taken
- User can seek the video to the exact timestamp when the note was taken

## NextAuth

NextAuth is used for authentication. Functionalities include:

- Signin with email and password hashed using bcrypt (Credentials Provider)
- Signin with Google (Google Provider)
- Signin with Github (Github Provider)

### Credentials Provider

A custom signIn and signup page is created for the credentials provider. The user is signed in using the email and password. The password is hashed using bcrypt.

After creating a new account in signup, you have to signin the user again to create the session.

```tsx
const response = await axios.post("/api/signup", values);
console.log("Response: ", response)
if (response.status === 201) {
    onSubmitProps.resetForm();
    await signIn('credentials', {
        redirect: true,
        email: values.email,
        password: values.password,
        callbackUrl: '/'
    })
}
```
