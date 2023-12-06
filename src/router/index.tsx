import {Navigate} from "react-router-dom";
import React,{lazy} from "react";
import Login from "../views/Login";
import Book1 from "../views/books/Book1";
import Book2 from "../views/books/book2";
import Book3 from "../views/books/book3";
import Book4 from "../views/books/book4";
import Initial from "../views/initial";
import Index from "../views/Signup";
import About from "../views/WebSocket";
import Manage from "../views/manager/manage"
import Users from "../views/manager/users";
import Books from "../views/manager/book"
import Orders from "../views/manager/orders";
import ManagerLogin from "../views/ManagerLogin";
import bookSearch from "../views/manager/bookSearch";
import BookDetail from "../views/BookDetail";
import BookSearch from "../views/manager/bookSearch";
import OrderTitleSearch from "../views/manager/orderTitleSearch";
import OrderTitleSearch2 from "../views/orderTitleSearch"
import OrderTimeSearch2 from "../views/orderTimeSearch";
import OrderTimeSearch from "../views/manager/orderTimeSearch";
import SearchAuthorByBookName from "../views/SearchAuthorByBookName";
import BookByTag from "../views/BookByTag"
import Test from "../views/test";
const Home = lazy(()=>import("../views/Home"))
const Page1 = lazy(()=>import("../views/Page1"))
const Page2 = lazy(()=>import("../views/Page2"))
const Page3 = lazy(()=>import("../views/Page3"))
const Page4 = lazy(()=>import("../views/Page4"))
//懒加载的模式需要我們給他添加一個loading組件

const withLoadingComponent = (comp:JSX.Element) =>(
    <React.Suspense fallback={<div>loading...</div>}>
        {comp}
    </React.Suspense>
)

const routes =[

    {
        path:"/",
        element:<Navigate to="/initial"/>
    },
    {
        path:"/",
        element: <Home/>,
        children:[
            {
                path: "/Page1",
                element: withLoadingComponent(<Page1/>)
            },
            {
                path: "/Page2",
                element: withLoadingComponent(<Page2/>)
            },
            {
                path: "/page3",
                element: withLoadingComponent(<Page3/>)
            },
            {
                path: "/page4",
                element: withLoadingComponent(<Page4/>)
            },
            {
                path: "*",
                element: withLoadingComponent(<Page1/>)
            },
            {
                path: "/SearchBookByTag/:bookTag",
                element: <BookByTag/>
            },
            {
                path: "/book1",
                element: <Book1 />
            },
            {
                path: "/book2",
                element: <Book2 />
            },
            {
                path: "/book3",
                element: <Book3 />
            },{
                path: "/book4",
                element: <Book4 />
            },{
                path: "/bookdetail/:bookId", // 添加bookId参数
                element: <BookDetail />
            },{
                path: "/ordertitlesearch/:bookId", // 添加bookId参数
                element: <OrderTitleSearch2 />
            },{
                path: "/ordertimesearch",
                element: <OrderTimeSearch2 />
            },{
                path:"searchauthorbybookname",
                element:<SearchAuthorByBookName/>
            },{
                path:"test",
                element:<Test/>
            },


        ]

    },
    {
        path: "/initial",
        element: <Initial />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/managerlogin",
        element: <ManagerLogin />
    },
    {
        path: "/signup",
        element: <Index />
    },
    {
        path:"/about",
        element: <About/>
    },

    {
        path:"/manage",
        element: <Manage/>,
        children:[
            {
                path:"users",
                element: <Users/>
            },
            {
                path:"orders",
                element: <Orders/>
            },
            {
                path:"books",
                element: <Books/>
            },
            {
                path:"booksearch/:bookId",
                element: <BookSearch/>
            },
            {
                path:"ordertitlesearch/:bookId",
                element: <OrderTitleSearch/>
            },{
                path: "ordertimesearch/", //
                element: <OrderTimeSearch />
            }
        ]
    }

]
export default routes
