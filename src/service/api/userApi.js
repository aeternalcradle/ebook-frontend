import {deleteAction, getAction, postAction, putAction} from "./manage";

export const addUser = (param) =>postAction("/user/add",param)

export const listUser = (param) =>getAction("/user/list",param)

export const detailUser = (id) =>getAction("/user/detail/"+id,null)

export const deleteUser = (id) =>deleteAction("/user/delete/"+id,null)

export const editUser = (id,param) =>putAction("/user/edit/"+id,param)