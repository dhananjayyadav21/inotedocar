
export const BASEURL = process.env.REACT_APP_API_KEY
export const Register_URL = `${BASEURL}/api/auth/createuser`
export const LOGIN_URL = `${BASEURL}/api/auth/login`
export const GETUSER_URL = `${BASEURL}/api/auth/getuser`

export const GETALLNOTES_URL = `${BASEURL}/api/notes/fetchallnotes`
export const ADDNOTE_URL = `${BASEURL}/api/notes/addnote`
export const UPDATENOTE_URL = `${BASEURL}/api/notes/updatenote`
export const DELETENOTE_URL = `${BASEURL}/api/notes/deletenote`