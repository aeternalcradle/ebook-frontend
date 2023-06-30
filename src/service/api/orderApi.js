import {deleteAction, getAction, postAction, putAction} from "./manage";

export const addOrder = (param) =>postAction("/order/add",param)

export const listOrder = (param) =>getAction("/order/list",param)

export const detailOrder = (id) =>getAction("/order/detail/"+id,null)

export const deleteOrder = (id) =>deleteAction("/order/delete/"+id,null)

export const editOrder = (id,param) =>putAction("/order/edit/"+id,param)

