# Youtube Notes

## System

![System image](/readmeImages/system.png)

## Application Images

- Signup form

![Signup image](/readmeImages/signup.png)

- Signin form

![Signin image](/readmeImages/signin.png)

- Home page

![Home image](/readmeImages/home.png)

- Add video form

![Add video image](/readmeImages/addVideo.png)

- Video player

![Video player image](/readmeImages/videoPlayer.png)

- Add note

![Add note image](/readmeImages/addNote.png)

- Delete video

![Delete video image](/readmeImages/deleteVideo.png)

## System Functionalitites

Youtube notes is a simple application to take notes of youtube videos. It has the following features:

- User can signup and signin using NextAuth
- User can add/delete a youtube video link
- User can take notes of the video
- User can edit and delete the notes
- User can add image to the notes
- The exact timestamp at which the note was taken is automatically added while taking note
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

## Formik

Formik is used for form handling. It is used for the following forms:

- Signup form
- Signin form
- Add video form

## Youtube Data API

Youtube Data API is used to get the video details. The credentials of this youtube data api is handled using google cloud console, where the api key is generated.

## To do

[ ] Store notes in database instead of local storage