import {deleteAction, getAction, postAction, putAction} from "./manage";

export const addBook = (param) =>postAction("/book/add",param)

export const listBook = (param) =>getAction("/book/list",param)

export const detailBook = (id) =>getAction("/book/detail/"+id,null)

export const getBookByTag = (tagName) =>getAction("/book/getBookByTags/"+tagName,null)

export const deleteBook = (id) =>deleteAction("/book/delete/"+id,null)

export const editBook = (id,param) =>putAction("/book/edit/"+id,param)

export const editNumBook = (id,param) => putAction("/book/editnum/"+id,param)
