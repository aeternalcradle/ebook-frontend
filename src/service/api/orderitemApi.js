import {deleteAction, getAction, postAction, putAction} from "./manage";

export const addOrder = (param) =>postAction("/orderitem/add",param)

export const listOrder = (param) =>getAction("/orderitem/list",param)

export const detailOrder = (id) =>getAction("/orderitem/detail/"+id,null)

export const deleteOrder = (id) =>deleteAction("/orderitem/delete/"+id,null)

export const editOrder = (id,param) =>putAction("/orderitem/edit/"+id,param)

export const orderSet = (param) =>postAction("/orderitem/order-set",param)
