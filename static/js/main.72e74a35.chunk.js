(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{129:function(e,t,a){e.exports=a(161)},134:function(e,t,a){},159:function(e,t,a){},161:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(42),o=a.n(c);a(134),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,s,l=a(21),u=a(215),d=a(213),m=a(217),f=a(218),p=a(219),b=a(196),g=a(220),h=r.a.memo((function(e){var t=e.status,a=e.isLoggedIn,n=e.logoutClickHandler;return r.a.createElement(r.a.Fragment,null,r.a.createElement(u.a,{position:"static"},"loading"===t&&r.a.createElement(m.a,{color:"secondary"}),r.a.createElement(f.a,null,r.a.createElement(d.a,{container:!0,direction:"row",justifyContent:"space-between",alignItems:"center"},r.a.createElement(d.a,{item:!0,xs:11},r.a.createElement(p.a,{edge:"start",color:"inherit","aria-label":"menu"},r.a.createElement(b.a,null))),r.a.createElement(d.a,{item:!0,xs:1},a?r.a.createElement(g.a,{color:"inherit",variant:"outlined",onClick:n},"Log out"):r.a.createElement(g.a,{color:"inherit",variant:"outlined"},"Login"))))))})),v=l.c,k=a(16),E=a.n(k),O=a(27),j=a(109),y=a.n(j).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-key":"c3ff16a4-4b9d-490a-b188-2440deac59e8"}}),L=function(e){return y.post("todo-lists",{title:e})},C=function(){return y.get("todo-lists")},I=function(e,t){return y.put("todo-lists/".concat(e),{title:t})},T=function(e){return y.delete("todo-lists/".concat(e))},w=function(e){return y.get("todo-lists/".concat(e,"/tasks"))},D=function(e,t){return y.post("todo-lists/".concat(e,"/tasks"),{title:t})},A=function(e,t){return y.delete("todo-lists/".concat(e,"/tasks/").concat(t))},x=function(e,t,a){return y.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},S=function(){return y.get("auth/me")},F=function(e){return y.post("auth/login",e)},z=function(){return y.delete("auth/login")},P=a(18),N=Object(P.b)("app/initializedApp",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(H.actions.changeAppStatus("loading")),e.prev=2,e.next=5,S().then((function(e){0===e.data.resultCode?n(_(!0)):J(e.data,n),n(H.actions.setIsInitialized(!0))}));case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),Z(e.t0,n);case 10:n(H.actions.changeAppStatus("succeed"));case 11:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(t,a){return e.apply(this,arguments)}}()),H=Object(P.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1,modal:{isOpen:!0,modalTitle:"title",modalStatus:"no-status",itemID:"a06d9807-03c2-484c-a192-010e89981528"}},reducers:{changeAppStatus:function(e,t){e.status=t.payload},setError:function(e,t){e.error=t.payload},setIsInitialized:function(e,t){e.isInitialized=t.payload},setModalStatus:function(e,t){e.modal=t.payload}}}),M=H.actions,B=M.changeAppStatus,U=M.setError,R=(M.setIsInitialized,M.setModalStatus),Z=(H.reducer,function(e,t){t(U(e)),t(B("succeed"))}),J=function(e,t){e.messages?t(U(e.messages[0])):t(U("Some error occurred")),t(B("succeed"))},K=Object(P.b)("auth/setIsLoggedIn",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=a.dispatch)(B("loading"));try{F(t).then((function(e){0===e.data.resultCode?n($.actions.setIsLoggedInAC(!0)):J(e.data,n)}))}catch(r){Z(r,n)}n(B("succeed"));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),W=Object(P.b)("auth/removeLogin",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=a.dispatch)(B("loading"));try{z().then((function(e){0===e.data.resultCode?n($.actions.setIsLoggedInAC(!1)):J(e.data,n)}))}catch(t){Z(t.message,n)}n(B("succeed"));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),$=Object(P.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(e,t){e.isLoggedIn=t.payload}}}),_=$.actions.setIsLoggedInAC,q=($.reducer,r.a.memo((function(){var e=v((function(e){return e.app.status})),t=v((function(e){return e.auth.isLoggedIn})),a=Object(l.b)(),c=Object(n.useCallback)((function(){a(W())}),[a]);return r.a.createElement(h,{status:e,isLoggedIn:t,logoutClickHandler:c})}))),G=a(209),V=function e(t){return r.a.createElement(e,Object.assign({elevation:6,variant:"filled"},t))},Q=r.a.memo((function(e){var t=e.error,a=e.isOpen,n=e.zeroingError,c=function(e,t){"clickaway"!==t&&n()};return r.a.createElement(G.a,{open:a,autoHideDuration:3e3,onClose:c},r.a.createElement(V,{onClose:c,severity:"error"},t))})),X=r.a.memo((function(){var e=v((function(e){return e.app.error})),t=Object(l.b)(),a=null!==e,c=Object(n.useCallback)((function(){t(U(null))}),[t]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,{error:e,isOpen:a,zeroingError:c}))})),Y=a(19),ee=a(13),te=a(205),ae=a(203),ne=r.a.memo((function(e){var t=Object(n.useState)(""),a=Object(ee.a)(t,2),c=a[0],o=a[1],i=Object(n.useState)(!1),s=Object(ee.a)(i,2),l=s[0],u=s[1],d=function(){var t=c.trim();t?e.addItem(t):u(!0),o("")};return r.a.createElement("div",null,r.a.createElement(te.a,{value:c,label:"Title",variant:"standard",error:l,disabled:e.disabled,onChange:function(e){null!==l&&u(!1),o(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&d()},onBlur:function(){return u(!1)}}),r.a.createElement(p.a,{onClick:d,disabled:e.disabled},r.a.createElement(ae.a,null)),l&&r.a.createElement("div",{className:"error-message"},"Title is required!"))})),re=a(221),ce=a(216),oe=(a(159),r.a.memo((function(e){var t=Object(n.useState)(!1),a=Object(ee.a)(t,2),c=a[0],o=a[1],i=Object(n.useState)(e.title),s=Object(ee.a)(i,2),l=s[0],u=s[1],d=function(){o(!1),e.changeItem(l)};return c?r.a.createElement(te.a,{value:l,autoFocus:!0,disabled:e.disabled,onBlur:d,onChange:function(e){u(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&d()}}):r.a.createElement("span",{onDoubleClick:function(){o(!0)}},e.title)}))),ie=a(204),se=a(208),le=a(14),ue=a(4),de=a(15),me=Object(P.b)("todoLists/fetchTodoLists",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),e.prev=2,e.next=5,C();case 5:r=e.sent,n(ge.actions.setTodoListsAC(r.data)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),Z(e.t0.message,n);case 12:n(B("succeed"));case 13:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,a){return e.apply(this,arguments)}}()),fe=Object(P.b)("todoLists/deleteTodoList",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),n(ge.actions.changeEntityStatusAC({entityStatus:"loading",todoListID:t})),e.prev=3,e.next=6,T(t);case 6:n(ge.actions.removeTodoListAC(t)),n(B("succeed")),n(ge.actions.changeEntityStatusAC({entityStatus:"idle",todoListID:t})),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),Z(e.t0.message,n);case 14:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(t,a){return e.apply(this,arguments)}}()),pe=Object(P.b)("todoLists/createTodoList",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),e.prev=2,e.next=5,L(t);case 5:0===(r=e.sent).data.resultCode?n(ge.actions.addTodoListAC(r.data.data.item)):J(r.data,n),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),Z(e.t0.message,n);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,a){return e.apply(this,arguments)}}()),be=Object(P.b)("todoLists/changeTodoListTitle",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),e.prev=2,e.next=5,I(t.todoListID,t.title);case 5:n(ge.actions.changeTodoListTitleAC(t)),n(B("succeed")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),Z(e.t0.message,n);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,a){return e.apply(this,arguments)}}()),ge=Object(P.c)({name:"todoList",initialState:[],reducers:{addTodoListAC:function(e,t){return[Object(de.a)(Object(de.a)({},t.payload),{},{filter:"all",entityStatus:"idle"})].concat(Object(le.a)(e))},removeTodoListAC:function(e,t){return e.filter((function(e){return e.id!==t.payload}))},changeTodoListFilterAC:function(e,t){return e.map((function(e){return e.id===t.payload.id?Object(de.a)(Object(de.a)({},e),{},{filter:t.payload.filter}):e}))},changeTodoListTitleAC:function(e,t){return e.map((function(e){return e.id===t.payload.todoListID?Object(de.a)(Object(de.a)({},e),{},{title:t.payload.title}):e}))},setTodoListsAC:function(e,t){return t.payload.map((function(e){return Object(de.a)(Object(de.a)({},e),{},{filter:"all",entityStatus:"idle"})}))},changeEntityStatusAC:function(e,t){return e.map((function(e){return e.id===t.payload.todoListID?Object(de.a)(Object(de.a)({},e),{},{entityStatus:t.payload.entityStatus}):e}))}}}),he=ge.actions,ve=he.addTodoListAC,ke=he.removeTodoListAC,Ee=he.changeTodoListFilterAC,Oe=he.setTodoListsAC;ge.reducer;!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(i||(i={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(s||(s={}));var je=Object(P.b)("tasks/fetchTasks",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n,r,c;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),e.prev=2,e.next=5,w(t);case 5:r=e.sent,c=r.data.items,n(Te.actions.setTasksAC({tasks:c,todoListID:t})),n(B("succeed")),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),Z(e.t0.message,n);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t,a){return e.apply(this,arguments)}}()),ye=Object(P.b)("tasks/removeTask",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),e.prev=2,e.next=5,A(t.todoListID,t.taskID);case 5:n(Te.actions.removeTaskAC(t)),n(B("succeed")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),Z(e.t0.message,n);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,a){return e.apply(this,arguments)}}()),Le=Object(P.b)("tasks/addTask",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n,r,c;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),e.prev=2,e.next=5,D(t.todoListID,t.taskTitle);case 5:r=e.sent,c=r.data.data.item,0===r.data.resultCode?n(Te.actions.addTaskAC(c)):J(r.data,n),n(B("succeed")),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),Z(e.t0.message,n);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t,a){return e.apply(this,arguments)}}()),Ce=Object(P.b)("tasks/changeTaskStatus",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=a.dispatch)(B("loading")),x(t.todoListID,t.taskID,{status:t.status}).then((function(){n(Te.actions.changeTaskStatusAC(t)),n(B("succeed"))})).catch((function(e){Z(e.message,n)}));case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ie=Object(P.b)("tasks/changeTaskStatus",function(){var e=Object(O.a)(E.a.mark((function e(t,a){var n;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=a.dispatch)(B("loading")),e.prev=2,e.next=5,x(t.todoListID,t.taskID,{title:t.taskTitle});case 5:n(Te.actions.changeTaskTitleAC(t)),n(B("succeed")),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(2),Z(e.t0.message,n);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t,a){return e.apply(this,arguments)}}()),Te=Object(P.c)({name:"tasks",initialState:{},reducers:{removeTaskAC:function(e,t){return Object(de.a)(Object(de.a)({},e),{},Object(ue.a)({},t.payload.todoListID,e[t.payload.todoListID].filter((function(e){return e.id!==t.payload.taskID}))))},addTaskAC:function(e,t){return Object(de.a)(Object(de.a)({},e),{},Object(ue.a)({},t.payload.todoListId,[t.payload].concat(Object(le.a)(e[t.payload.todoListId]))))},changeTaskStatusAC:function(e,t){return Object(de.a)(Object(de.a)({},e),{},Object(ue.a)({},t.payload.todoListID,e[t.payload.todoListID].map((function(e){return e.id===t.payload.taskID?Object(de.a)(Object(de.a)({},e),{},{status:t.payload.status}):e}))))},changeTaskTitleAC:function(e,t){return Object(de.a)(Object(de.a)({},e),{},Object(ue.a)({},t.payload.todoListID,e[t.payload.todoListID].map((function(e){return e.id===t.payload.taskID?Object(de.a)(Object(de.a)({},e),{},{title:t.payload.taskTitle}):e}))))},setTasksAC:function(e,t){return Object(de.a)(Object(de.a)({},e),{},Object(ue.a)({},t.payload.todoListID,t.payload.tasks))}},extraReducers:function(e){e.addCase(ve,(function(e,t){return Object(de.a)(Object(de.a)({},e),{},Object(ue.a)({},t.payload.id,[]))})).addCase(ke,(function(e,t){return delete e[t.payload],Object(de.a)({},e)})).addCase(Oe,(function(e,t){t.payload.forEach((function(t){e[t.id]=[]}))}))}}),we=r.a.memo((function(e){console.log("task");var t=e.task,a=e.deleteTask,c=e.changeTaskStatus,o=e.changeTaskTitle,s=Object(n.useCallback)((function(){a(t.id)}),[t.id]),l=Object(n.useCallback)((function(e){var a=e.currentTarget.checked?i.Completed:i.New;c(t.id,a)}),[t.id]),u=Object(n.useCallback)((function(e){o(t.id,e)}),[t.id]);return r.a.createElement("li",{className:t.status===i.Completed?"is-done":""},r.a.createElement(se.a,{color:"secondary",onChange:l,checked:t.status===i.Completed}),r.a.createElement(oe,{title:t.title,changeItem:u}),r.a.createElement(p.a,{onClick:s},r.a.createElement(ie.a,null)))})),De=function(e){console.log("task container");var t=v((function(e){return e.tasks})),a=Object(l.b)();Object(n.useEffect)((function(){a(je(e.todoListID))}),[]);var c=t[e.todoListID];"active"===e.filter&&(c=c.filter((function(e){return!e.status}))),"completed"===e.filter&&(c=c.filter((function(e){return e.status})));var o=Object(n.useCallback)((function(t){a(ye({todoListID:e.todoListID,taskID:t}))}),[a]),i=Object(n.useCallback)((function(t,n){a(Ce({todoListID:e.todoListID,taskID:t,status:n}))}),[a]),s=Object(n.useCallback)((function(t,n){a(Ie({todoListID:e.todoListID,taskID:t,taskTitle:n}))}),[a]),u=c.map((function(e){return r.a.createElement(we,{key:e.id,task:e,changeTaskTitle:s,changeTaskStatus:i,deleteTask:o})}));return r.a.createElement(r.a.Fragment,null,u)},Ae=r.a.memo((function(e){console.log("todolist");var t=e.todoList,a=e.disable,c=e.removeTodoList,o=e.changeTodoListFilter,i=e.changeTodoListTitle,s=e.addTaskForTodoList,l=Object(n.useCallback)((function(e){o(e.currentTarget.dataset.filter,t.id)}),[t.id]),u=Object(n.useCallback)((function(){c(t.id)}),[t.id]),d=Object(n.useCallback)((function(e){s(e,t.id)}),[t.id,s]),m=Object(n.useCallback)((function(e){i(e,t.id)}),[i,t.id]);return r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h3",null,r.a.createElement(oe,{title:e.todoList.title,changeItem:m,disabled:a}),r.a.createElement(p.a,{onClick:u,disabled:a},r.a.createElement(ie.a,null))),r.a.createElement(ne,{addItem:d,disabled:a}),r.a.createElement("ul",{className:"list-style"},r.a.createElement(De,{todoListID:t.id,filter:t.filter})),r.a.createElement("div",null,r.a.createElement(g.a,{"data-filter":"all",color:"all"===t.filter?"secondary":"primary",variant:"outlined",size:"small",onClick:l},"All"),r.a.createElement(g.a,{"data-filter":"active",color:"active"===t.filter?"secondary":"primary",variant:"outlined",size:"small",onClick:l},"Active"),r.a.createElement(g.a,{"data-filter":"completed",color:"completed"===t.filter?"secondary":"primary",variant:"outlined",size:"small",onClick:l},"Completed"))))})),xe=r.a.memo((function(){console.log("todo list container");var e=v((function(e){return e.todoLists})),t=v((function(e){return e.auth.isLoggedIn})),a=Object(l.b)();Object(n.useEffect)((function(){t&&a(me())}),[]);var c=Object(n.useCallback)((function(e,t){switch(e){case"all":return a(Ee({filter:"all",id:t}));case"active":return a(Ee({filter:"active",id:t}));case"completed":return a(Ee({filter:"completed",id:t}));default:return a(Ee({filter:"all",id:t}))}}),[a]),o=Object(n.useCallback)((function(e){a(pe(e))}),[a]),i=Object(n.useCallback)((function(e,t){a(be({title:e,todoListID:t}))}),[a]),s=Object(n.useCallback)((function(e){a(fe(e))}),[a]),u=Object(n.useCallback)((function(e,t){a(Le({todoListID:t,taskTitle:e}))}),[a]),m=e.map((function(e){var t="loading"===e.entityStatus;return r.a.createElement(d.a,{item:!0,key:e.id},r.a.createElement(ce.a,{elevation:10,style:{padding:"10px"}},r.a.createElement(Ae,{todoList:e,disable:t,changeTodoListFilter:c,addTaskForTodoList:u,changeTodoListTitle:i,removeTodoList:s})))}));return t?r.a.createElement(re.a,{fixed:!0},r.a.createElement(d.a,{container:!0,style:{margin:"20px 0px"}},r.a.createElement(ne,{addItem:o})),r.a.createElement(d.a,{container:!0,spacing:2},m)):r.a.createElement(Y.a,{to:"/login"})})),Se=a(210),Fe=a(200),ze=a(222),Pe=a(223),Ne=a(112),He=r.a.memo((function(e){var t=e.loginHandler,a=Object(Ne.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Invalid email address"):t.email="Enter your email",e.password?e.password.length<=2&&(t.password="Password must be more then 2 characters"):t.password="Enter password",t},onSubmit:function(e){t(e)}});return r.a.createElement(d.a,{container:!0,justifyContent:"center"},r.a.createElement(d.a,{item:!0,xs:4},r.a.createElement("form",{onSubmit:a.handleSubmit},r.a.createElement(Se.a,null,r.a.createElement(Fe.a,null,r.a.createElement("p",null,"To log in get registered",r.a.createElement("a",{href:"https://social-networ.samuraijs.com/",target:"_blank"},"here")),r.a.createElement("p",null,"or use common test account credentials:"),r.a.createElement("p",null,"Email: free@samuraijs.com"),r.a.createElement("p",null,"Password: free")),r.a.createElement(ze.a,null,r.a.createElement(te.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email?r.a.createElement("div",{style:{color:"red"}},a.errors.email):null,r.a.createElement(te.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password?r.a.createElement("div",{style:{color:"red"}},a.errors.password):null,r.a.createElement(Pe.a,{label:"Remember me",control:r.a.createElement(se.a,Object.assign({},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe}))}),r.a.createElement(g.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))})),Me=r.a.memo((function(){var e=v((function(e){return e.auth.isLoggedIn})),t=Object(l.b)(),a=Object(n.useCallback)((function(e){t(K(e))}),[]);return e?r.a.createElement(Y.a,{to:"/"}):r.a.createElement(He,{loginHandler:a})})),Be="/",Ue="/login",Re="/404",Ze=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Y.d,null,r.a.createElement(Y.b,{exact:!0,path:Be,render:function(){return r.a.createElement(xe,null)}}),r.a.createElement(Y.b,{path:Ue,render:function(){return r.a.createElement(Me,null)}}),r.a.createElement(Y.b,{path:Re,render:function(){return r.a.createElement("h1",null,"404: PAGE NOT FOUND")}}),r.a.createElement(Y.a,{from:"*",to:Re})))},Je=a(225),Ke=a(211),We=a(224),$e=Object(n.memo)((function(e){var t=e.title,a=e.addTitle;return r.a.createElement("div",null,r.a.createElement(We.a,{variant:"h5"},t),r.a.createElement(ne,{addItem:a}))})),_e=Object(n.memo)((function(){var e=v((function(e){return e.app.modal})),t=Object(l.b)(),a=Object(n.useCallback)((function(a){"add-list"===e.modalStatus&&t(pe(a)),"add-task"===e.modalStatus&&e.itemID&&t(Le({todoListID:e.itemID,taskTitle:a}))}),[t]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ke.a,{open:e.isOpen,onClose:function(){t(R({modalStatus:"no-status",isOpen:!1,modalTitle:null}))}},r.a.createElement(ce.a,null,r.a.createElement($e,{title:e.modalTitle&&e.modalTitle,addTitle:a}))))})),qe=function(){console.log("app");var e=v((function(e){return e.app.isInitialized})),t=Object(l.b)();return Object(n.useEffect)((function(){t(N())}),[]),e?r.a.createElement("div",null,r.a.createElement(q,null),r.a.createElement(Ze,null),r.a.createElement(X,null),r.a.createElement(_e,null)):r.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},r.a.createElement(Je.a,null))},Ge=a(63),Ve=Object(P.a)({reducer:{app:H.reducer,auth:$.reducer,todoLists:ge.reducer,tasks:Te.reducer}});o.a.render(r.a.createElement(Ge.a,null,r.a.createElement(l.a,{store:Ve},r.a.createElement(qe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[129,1,2]]]);
//# sourceMappingURL=main.72e74a35.chunk.js.map