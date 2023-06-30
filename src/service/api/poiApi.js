import {deleteAction, getAction, postAction, putAction} from "./manage";

export const addPoi = (param) =>postAction("/poi/add",param)

export const listPoi = (param) =>getAction("/poi/list",param)

export const detailPoi = (id) =>getAction("/poi/detail/"+id,null)

export const deletePoi = (id) =>deleteAction("/poi/delete/"+id,null)

export const editPoi = (id,param) =>putAction("/poi/edit/"+id,param)