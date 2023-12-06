import {deleteAction, getAction, postAction, putAction} from "./manage";

export const addUserAuth = (param) =>postAction("/userauth/add",param)

export const loginUserAuth = (param) =>postAction("/userauth/login",param)

export const managerLoginUserAuth = (param)=>postAction("/userauth/managerlogin",param)

export const registerUserAuth = (param)=>postAction("/userauth/register",param)

export const logoutUserAuth = () =>postAction("/userauth/logout")

export const listUserAuth = (param) =>getAction("/userauth/list",param)

export const detailUserAuth = (id) =>getAction("/userauth/detail/"+id,null)

export const deleteUserAuth = (id) =>deleteAction("/userauth/delete/"+id,null)

export const editUserAuth = (id,param) =>putAction("/userauth/edit/"+id,param)
