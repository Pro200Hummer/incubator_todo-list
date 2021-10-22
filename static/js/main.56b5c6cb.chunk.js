(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{116:function(e,t,a){e.exports={container:"ModalWindow_container__10P4q"}},134:function(e,t,a){e.exports=a(171)},139:function(e,t,a){},166:function(e,t,a){},171:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(41),i=a.n(o);a(139),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var s,c,l=a(66),u=a(244),d=a(241),m=a(246),f=a(247),p=a(248),b=a(221),h=a(249),g=n.a.memo((function(e){var t=e.status,a=e.isLoggedIn,r=e.logoutClickHandler;return n.a.createElement(n.a.Fragment,null,n.a.createElement(u.a,{position:"static"},"loading"===t&&n.a.createElement(m.a,{color:"secondary"}),n.a.createElement(f.a,null,n.a.createElement(d.a,{container:!0,direction:"row",justifyContent:"space-between",alignItems:"center"},n.a.createElement(d.a,{item:!0,xs:11},n.a.createElement(p.a,{edge:"start",color:"inherit","aria-label":"menu"},n.a.createElement(b.a,null))),n.a.createElement(d.a,{item:!0,xs:1},a?n.a.createElement(h.a,{color:"inherit",variant:"outlined",onClick:r},"Log out"):n.a.createElement(h.a,{color:"inherit",variant:"outlined"},"Login"))))))})),E=function(){return Object(l.b)()},v=l.c,k=a(14),j=a.n(k),y=a(23),L=a(19),O=a(112),I=a.n(O).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-key":"c3ff16a4-4b9d-490a-b188-2440deac59e8"}}),C=function(){return I.get("auth/me")},T=function(e){return I.post("auth/login",e)},w=function(){return I.delete("auth/login")},x=function(e){return I.post("todo-lists",{title:e})},D=function(){return I.get("todo-lists")},S=function(e,t){return I.put("todo-lists/".concat(e),{title:t})},W=function(e){return I.delete("todo-lists/".concat(e))},A=function(e){return I.get("todo-lists/".concat(e,"/tasks"))},V=function(e,t){return I.post("todo-lists/".concat(e,"/tasks"),{title:t})},F=function(e,t){return I.delete("todo-lists/".concat(e,"/tasks/").concat(t))},P=function(e,t,a){return I.put("todo-lists/".concat(e,"/tasks/").concat(t),a)},z=Object(L.b)("app/initializedApp",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,C();case 4:if(0!==(r=e.sent).data.resultCode){e.next=10;break}return a.dispatch(H("succeed")),e.abrupt("return",a.dispatch(G(!0)));case 10:return Z(r.data,a.dispatch),e.abrupt("return",a.dispatch(G(!1)));case 12:e.next=18;break;case 14:return e.prev=14,e.t0=e.catch(1),U(e.t0,a.dispatch),e.abrupt("return",a.dispatch(G(!1)));case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t,a){return e.apply(this,arguments)}}()),N=Object(L.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1,modal:{isOpen:!1,modalTitle:"",modalStatus:"no-status",itemID:""}},reducers:{changeAppStatus:function(e,t){e.status=t.payload},setError:function(e,t){e.error=t.payload},setModalStatus:function(e,t){e.modal=t.payload}},extraReducers:function(e){e.addCase(z.fulfilled,(function(e){e.isInitialized=!0}))}}),M=N.actions,H=M.changeAppStatus,R=M.setError,_=M.setModalStatus,B=N.reducer,U=function(e,t){console.log(e),t(R(e)),t(H("succeed"))},Z=function(e,t){e.messages?(console.log(e.messages[0]),t(R(e.messages[0]))):t(R("Some error occurred")),t(H("succeed"))},q=function(e,t,a){var r=e.currentTarget.children[0].attributes.getNamedItem("data-action");null!==r&&("add-list"===r.value&&t(_({isOpen:!0,modalStatus:"add-list",modalTitle:"Enter new to-do list name"})),"add-task"===r.value&&t(_({isOpen:!0,modalStatus:"add-task",modalTitle:"Enter the new task name",itemID:a})))},J=Object(L.b)("auth/login",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,T(t);case 4:if(0!==(r=e.sent).data.resultCode){e.next=10;break}return a.dispatch(H("succeed")),e.abrupt("return");case 10:return Z(r.data,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:e.next=19;break;case 14:return e.prev=14,e.t0=e.catch(1),n=e.t0,U(e.t0,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[n.message],fieldsErrors:[]}));case 19:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t,a){return e.apply(this,arguments)}}()),K=Object(L.b)("auth/logout",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,w();case 4:if(0!==(r=e.sent).data.resultCode){e.next=10;break}return a.dispatch(H("succeed")),e.abrupt("return");case 10:return Z(r.data,a.dispatch),e.abrupt("return",a.rejectWithValue({}));case 12:e.next=18;break;case 14:return e.prev=14,e.t0=e.catch(1),U(e.t0.message,a.dispatch),e.abrupt("return",a.rejectWithValue({}));case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t,a){return e.apply(this,arguments)}}()),$=Object(L.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedInAC:function(e,t){e.isLoggedIn=t.payload}},extraReducers:function(e){e.addCase(J.fulfilled,(function(e){e.isLoggedIn=!0})).addCase(K.fulfilled,(function(e){e.isLoggedIn=!1}))}}),G=$.actions.setIsLoggedInAC,Q={login:J,logout:K},X=$.reducer,Y=n.a.memo((function(){var e=v((function(e){return e.app.status})),t=v((function(e){return e.auth.isLoggedIn})),a=E(),o=Object(r.useCallback)((function(){a(Q.logout())}),[a]);return n.a.createElement(g,{status:e,isLoggedIn:t,logoutClickHandler:o})})),ee=a(238),te=a(236),ae=n.a.memo((function(e){var t=e.error,a=e.isOpen,r=e.zeroingError,o=function(e,t){"clickaway"!==t&&r()};return n.a.createElement(ee.a,{open:a,autoHideDuration:3e3,onClose:o},n.a.createElement(te.a,{onClose:o,severity:"error",elevation:6,variant:"filled"},t))})),re=n.a.memo((function(){var e=v((function(e){return e.app.error})),t=E(),a=null!==e,o=Object(r.useCallback)((function(){t(R(null))}),[t]);return n.a.createElement(n.a.Fragment,null,n.a.createElement(ae,{error:e,isOpen:a,zeroingError:o}))})),ne=a(18),oe=a(250),ie=a(231),se=a(229),ce=a(245),le=(a(166),a(12)),ue=a(232),de=n.a.memo((function(e){var t=Object(r.useState)(!1),a=Object(le.a)(t,2),o=a[0],i=a[1],s=Object(r.useState)(e.title),c=Object(le.a)(s,2),l=c[0],u=c[1],d=function(){i(!1),e.changeItem(l)};return o?n.a.createElement(ue.a,{value:l,autoFocus:!0,disabled:e.disabled,onBlur:d,onChange:function(e){u(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&d()}}):n.a.createElement("span",{onDoubleClick:function(){i(!0)}},e.title)})),me=a(228),fe=a(237);!function(e){e[e.New=0]="New",e[e.InProgress=1]="InProgress",e[e.Completed=2]="Completed",e[e.Draft=3]="Draft"}(s||(s={})),function(e){e[e.Low=0]="Low",e[e.Middle=1]="Middle",e[e.Hi=2]="Hi",e[e.Urgently=3]="Urgently",e[e.Later=4]="Later"}(c||(c={}));var pe=n.a.memo((function(e){console.log("task");var t=e.task,a=e.deleteTask,o=e.changeTaskStatus,i=e.changeTaskTitle,c=Object(r.useCallback)((function(){a(t.id)}),[a,t.id]),l=Object(r.useCallback)((function(e){var a=e.currentTarget.checked?s.Completed:s.New;o(t.id,a)}),[o,t.id]),u=Object(r.useCallback)((function(e){i(t.id,e)}),[i,t.id]);return n.a.createElement("li",{className:t.status===s.Completed?"is-done":""},n.a.createElement(fe.a,{color:"secondary",onChange:l,checked:t.status===s.Completed}),n.a.createElement(de,{title:t.title,changeItem:u}),n.a.createElement(ie.a,{title:"Delete Task: ".concat(t.title)},n.a.createElement(p.a,{onClick:c},n.a.createElement(me.a,null))))})),be=a(16),he=a(5),ge=a(20),Ee=Object(L.b)("todoLists/fetchTodoLists",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,D();case 4:return r=e.sent,a.dispatch(H("succeed")),e.abrupt("return",{todoLists:r.data});case 9:return e.prev=9,e.t0=e.catch(1),U(e.t0.message,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,a){return e.apply(this,arguments)}}()),ve=Object(L.b)("todoLists/deleteTodoList",function(){var e=Object(y.a)(j.a.mark((function e(t,a){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),a.dispatch(Ce({entityStatus:"loading",todoListID:t})),e.prev=2,e.next=5,W(t);case 5:return a.dispatch(H("succeed")),a.dispatch(Ce({entityStatus:"idle",todoListID:t})),e.abrupt("return",{todoListID:t});case 10:return e.prev=10,e.t0=e.catch(2),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 13:case"end":return e.stop()}}),e,null,[[2,10]])})));return function(t,a){return e.apply(this,arguments)}}()),ke=Object(L.b)("todoLists/createTodoList",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,x(t);case 4:if(0!==(r=e.sent).data.resultCode){e.next=9;break}return e.abrupt("return",{todoList:r.data.data.item});case 9:return Z(r.data,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 11:e.next=17;break;case 13:return e.prev=13,e.t0=e.catch(1),U(e.t0.message,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 17:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t,a){return e.apply(this,arguments)}}()),je=Object(L.b)("todoLists/changeTodoListTitle",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,S(t.todoListID,t.title);case 4:if(0!==(r=e.sent).data.resultCode){e.next=10;break}return a.dispatch(H("succeed")),e.abrupt("return",{todoListID:t.todoListID,title:t.title});case 10:return Z(r.data,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 12:e.next=18;break;case 14:return e.prev=14,e.t0=e.catch(1),U(e.t0.message,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 18:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t,a){return e.apply(this,arguments)}}()),ye=Object(L.c)({name:"todoList",initialState:[],reducers:{changeTodoListFilterAC:function(e,t){return e.map((function(e){return e.id===t.payload.id?Object(ge.a)(Object(ge.a)({},e),{},{filter:t.payload.filter}):e}))},changeEntityStatusAC:function(e,t){return e.map((function(e){return e.id===t.payload.todoListID?Object(ge.a)(Object(ge.a)({},e),{},{entityStatus:t.payload.entityStatus}):e}))}},extraReducers:function(e){e.addCase(Ee.fulfilled,(function(e,t){if(t.payload)return t.payload.todoLists.map((function(e){return Object(ge.a)(Object(ge.a)({},e),{},{filter:"all",entityStatus:"idle"})}))})).addCase(ke.fulfilled,(function(e,t){t.payload&&e.unshift(Object(ge.a)(Object(ge.a)({},t.payload.todoList),{},{filter:"all",entityStatus:"idle"}))})).addCase(ve.fulfilled,(function(e,t){e.splice(e.findIndex((function(e){return e.id===t.payload.todoListID})),1)})).addCase(je.fulfilled,(function(e,t){if(t.payload){var a=e.findIndex((function(e){if(t.payload)return e.id===t.payload.todoListID}));e[a].title=t.payload.title}}))}}),Le={fetchTodoLists:Ee,createTodoList:ke,changeTodoListTitle:je,deleteTodoList:ve},Oe=ye.actions,Ie=Oe.changeTodoListFilterAC,Ce=Oe.changeEntityStatusAC,Te=ye.reducer,we=Object(L.b)("tasks/fetchTasks",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,A(t);case 4:return r=e.sent,n=r.data.items,a.dispatch(H("succeed")),e.abrupt("return",{todoListID:t,tasks:n});case 10:return e.prev=10,e.t0=e.catch(1),U(e.t0.message,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,a){return e.apply(this,arguments)}}()),xe=Object(L.b)("tasks/removeTask",function(){var e=Object(y.a)(j.a.mark((function e(t,a){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,F(t.todoListID,t.taskID);case 4:return a.dispatch(H("succeed")),e.abrupt("return",{todoListID:t.todoListID,taskID:t.taskID});case 8:return e.prev=8,e.t0=e.catch(1),U(e.t0.message,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,a){return e.apply(this,arguments)}}()),De=Object(L.b)("tasks/addTask",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.dispatch(H("loading")),e.prev=1,e.next=4,V(t.todoListID,t.taskTitle);case 4:if(r=e.sent,n=r.data.data.item,0!==r.data.resultCode){e.next=11;break}return a.dispatch(H("succeed")),e.abrupt("return",{task:n,todoListID:t.todoListID});case 11:return Z(r.data,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:r.data.messages,fieldsErrors:r.data.fieldsErrors}));case 13:e.next=19;break;case 15:return e.prev=15,e.t0=e.catch(1),U(e.t0.message,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 19:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(t,a){return e.apply(this,arguments)}}()),Se=Object(L.b)("tasks/updateTask",function(){var e=Object(y.a)(j.a.mark((function e(t,a){var r,n,o,i;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=a.getState(),n=r.tasks[t.todoListID].find((function(e){return e.id===t.taskID}))){e.next=4;break}return e.abrupt("return",a.rejectWithValue({errors:["task not found in the state"],fieldsErrors:[]}));case 4:return o=Object(ge.a)({deadline:n.deadline,description:n.description,priority:n.priority,startDate:n.startDate,title:n.title,status:n.status},t.model),a.dispatch(H("loading")),e.prev=6,e.next=9,P(t.todoListID,t.taskID,o);case 9:if(0!==(i=e.sent).data.resultCode){e.next=15;break}return a.dispatch(H("succeed")),e.abrupt("return",{todoListID:t.todoListID,taskID:t.taskID,model:t.model});case 15:return Z(i.data,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:i.data.messages,fieldsErrors:i.data.fieldsErrors}));case 17:e.next=23;break;case 19:return e.prev=19,e.t0=e.catch(6),U(e.t0,a.dispatch),e.abrupt("return",a.rejectWithValue({errors:[e.t0.message],fieldsErrors:[]}));case 23:case"end":return e.stop()}}),e,null,[[6,19]])})));return function(t,a){return e.apply(this,arguments)}}()),We=Object(L.c)({name:"tasks",initialState:{},reducers:{},extraReducers:function(e){e.addCase(we.fulfilled,(function(e,t){if(t.payload)return Object(ge.a)(Object(ge.a)({},e),{},Object(he.a)({},t.payload.todoListID,t.payload.tasks))})).addCase(xe.fulfilled,(function(e,t){if(t.payload)return Object(ge.a)(Object(ge.a)({},e),{},Object(he.a)({},t.payload.todoListID,e[t.payload.todoListID].filter((function(e){if(t.payload)return e.id!==t.payload.taskID}))))})).addCase(De.fulfilled,(function(e,t){if(t.payload)return Object(ge.a)(Object(ge.a)({},e),{},Object(he.a)({},t.payload.todoListID,[t.payload.task].concat(Object(be.a)(e[t.payload.todoListID]))))})).addCase(Se.fulfilled,(function(e,t){if(t.payload){var a=e[t.payload.todoListID],r=a.findIndex((function(e){if(t.payload)return e.id===t.payload.taskID}));r>-1&&(a[r]=Object(ge.a)(Object(ge.a)({},a[r]),t.payload.model))}})).addCase(Le.createTodoList.fulfilled,(function(e,t){if(t.payload)return Object(ge.a)(Object(ge.a)({},e),{},Object(he.a)({},t.payload.todoList.id,[]))})).addCase(Le.deleteTodoList.fulfilled,(function(e,t){delete e[t.payload.todoListID]})).addCase(Le.fetchTodoLists.fulfilled,(function(e,t){t.payload&&t.payload.todoLists.forEach((function(t){e[t.id]=[]}))}))}}),Ae={fetchTasks:we,removeTask:xe,addTask:De,updateTask:Se},Ve=We.reducer,Fe=function(e){console.log("task container");var t=v((function(e){return e.tasks})),a=E();Object(r.useEffect)((function(){a(Ae.fetchTasks(e.todoListID))}),[a,e.todoListID]);var o=t[e.todoListID];"active"===e.filter&&(o=o.filter((function(e){return!e.status}))),"completed"===e.filter&&(o=o.filter((function(e){return e.status})));var i=Object(r.useCallback)((function(t){a(Ae.removeTask({todoListID:e.todoListID,taskID:t}))}),[a,e.todoListID]),s=Object(r.useCallback)((function(t,r){a(Ae.updateTask({todoListID:e.todoListID,taskID:t,model:{status:r}}))}),[a,e.todoListID]),c=Object(r.useCallback)((function(t,r){a(Ae.updateTask({todoListID:e.todoListID,taskID:t,model:{title:r}}))}),[a,e.todoListID]),l=o.map((function(e){return n.a.createElement(pe,{key:e.id,task:e,changeTaskTitle:c,changeTaskStatus:s,deleteTask:i})}));return n.a.createElement(n.a.Fragment,null,l)},Pe=n.a.memo((function(e){console.log("todolist");var t=E(),a=e.todoList,o=e.disable,i=e.removeTodoList,s=e.changeTodoListFilter,c=e.changeTodoListTitle,l=Object(r.useCallback)((function(e){s(e.currentTarget.dataset.filter,a.id)}),[s,a.id]),u=Object(r.useCallback)((function(){i(a.id)}),[i,a.id]),d=Object(r.useCallback)((function(e){c(e,a.id)}),[c,a.id]);return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement("h3",null,n.a.createElement(de,{title:e.todoList.title,changeItem:d,disabled:o}),n.a.createElement(ie.a,{title:"Delete List: ".concat(a.title)},n.a.createElement(p.a,{onClick:u,disabled:o},n.a.createElement(me.a,null))),n.a.createElement(ie.a,{title:"Add Task"},n.a.createElement(p.a,{onClick:function(e){return q(e,t,a.id)}},n.a.createElement(se.a,{fontSize:"medium",color:"primary","data-action":"add-task"})))),n.a.createElement("ul",{className:"list-style"},n.a.createElement(Fe,{todoListID:a.id,filter:a.filter})),n.a.createElement("div",null,n.a.createElement(h.a,{"data-filter":"all",color:"all"===a.filter?"secondary":"primary",variant:"outlined",size:"small",onClick:l},"All"),n.a.createElement(h.a,{"data-filter":"active",color:"active"===a.filter?"secondary":"primary",variant:"outlined",size:"small",onClick:l},"Active"),n.a.createElement(h.a,{"data-filter":"completed",color:"completed"===a.filter?"secondary":"primary",variant:"outlined",size:"small",onClick:l},"Completed"))))})),ze=n.a.memo((function(){console.log("todo list container");var e=v((function(e){return e.todoLists})),t=v((function(e){return e.auth.isLoggedIn})),a=E();Object(r.useEffect)((function(){t&&a(Le.fetchTodoLists())}),[a,t]);var o=Object(r.useCallback)((function(e,t){switch(e){case"all":return a(Ie({filter:"all",id:t}));case"active":return a(Ie({filter:"active",id:t}));case"completed":return a(Ie({filter:"completed",id:t}));default:return a(Ie({filter:"all",id:t}))}}),[a]),i=Object(r.useCallback)((function(e,t){a(Le.changeTodoListTitle({title:e,todoListID:t}))}),[a]),s=Object(r.useCallback)((function(e){a(Le.deleteTodoList(e))}),[a]),c=Object(r.useCallback)((function(e,t){a(Ae.addTask({todoListID:t,taskTitle:e}))}),[a]),l=e.map((function(e){var t="loading"===e.entityStatus;return n.a.createElement(d.a,{item:!0,key:e.id},n.a.createElement(ce.a,{elevation:10,style:{padding:"10px"}},n.a.createElement(Pe,{todoList:e,disable:t,changeTodoListFilter:o,addTaskForTodoList:c,changeTodoListTitle:i,removeTodoList:s})))}));return t?n.a.createElement(oe.a,{fixed:!0},n.a.createElement(d.a,{container:!0,style:{margin:"20px 0px"}},n.a.createElement(ie.a,{title:"Add List"},n.a.createElement(p.a,{onClick:function(e){return q(e,a)}},n.a.createElement(se.a,{fontSize:"large",color:"primary","data-action":"add-list"})))),n.a.createElement(d.a,{container:!0,spacing:2},l)):n.a.createElement(ne.a,{to:"/login"})})),Ne=a(239),Me=a(224),He=a(251),Re=a(252),_e=a(117),Be=n.a.memo((function(e){var t=E(),a=(e.loginHandler,Object(_e.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(e){var t={};return e.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.email)||(t.email="Enter valid email address"):t.email="Enter your email",e.password?e.password.length<=2&&(t.password="Password must be more then 2 characters"):t.password="Enter password",t},onSubmit:function(){var e=Object(y.a)(j.a.mark((function e(a,r){var n,o,i,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(Q.login(a));case 2:n=e.sent,console.log(n),J.rejected.match(n)&&(null===(o=n.payload)||void 0===o||null===(i=o.fieldsErrors)||void 0===i?void 0:i.length)&&(s=n.payload.fieldsErrors[0],r.setFieldError(s.field,s.error));case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()}));return n.a.createElement(d.a,{container:!0,justifyContent:"center"},n.a.createElement(d.a,{item:!0,xs:4},n.a.createElement("form",{onSubmit:a.handleSubmit},n.a.createElement(Ne.a,null,n.a.createElement(Me.a,null,n.a.createElement("p",null,"To log in get registered",n.a.createElement("a",{href:"https://social-networ.samuraijs.com/",target:"_blank",rel:"noopener noreferrer"},"here")),n.a.createElement("p",null,"or use common test account credentials:"),n.a.createElement("p",null,"Email: free@samuraijs.com"),n.a.createElement("p",null,"Password: free")),n.a.createElement(He.a,null,n.a.createElement(ue.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email?n.a.createElement("div",{style:{color:"red"}},a.errors.email):null,n.a.createElement(ue.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password?n.a.createElement("div",{style:{color:"red"}},a.errors.password):null,n.a.createElement(Re.a,{label:"Remember me",control:n.a.createElement(fe.a,Object.assign({},a.getFieldProps("rememberMe"),{checked:a.values.rememberMe}))}),n.a.createElement(h.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))})),Ue=n.a.memo((function(){var e=v((function(e){return e.auth.isLoggedIn})),t=E(),a=Object(r.useCallback)(function(){var e=Object(y.a)(j.a.mark((function e(a){var r,n,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t(Q.login(a));case 2:if(r=e.sent,!J.rejected.match(r)){e.next=6;break}if(!(null===(n=r.payload)||void 0===n||null===(o=n.fieldsErrors)||void 0===o?void 0:o.length)){e.next=6;break}return e.abrupt("return",r.payload.fieldsErrors);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[t]);return e?n.a.createElement(ne.a,{to:"/"}):n.a.createElement(Be,{loginHandler:a})})),Ze="/",qe="/login",Je="/404",Ke=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement(ne.d,null,n.a.createElement(ne.b,{exact:!0,path:Ze,render:function(){return n.a.createElement(ze,null)}}),n.a.createElement(ne.b,{path:qe,render:function(){return n.a.createElement(Ue,null)}}),n.a.createElement(ne.b,{path:Je,render:function(){return n.a.createElement("h1",null,"404: PAGE NOT FOUND")}}),n.a.createElement(ne.a,{from:"*",to:Je})))},$e=a(243),Ge=a(116),Qe=a.n(Ge),Xe=a(233),Ye=Object(Xe.a)("div")((function(){return{width:"100%",display:"flex",flexFlow:"row wrap",alignItems:"center",justifyContent:"space-around",marginTop:"10px"}})),et=n.a.memo((function(e){var t=Object(r.useState)(""),a=Object(le.a)(t,2),o=a[0],i=a[1],s=Object(r.useState)(!1),c=Object(le.a)(s,2),l=c[0],u=c[1],d=function(){var t=o.trim();t?e.addItem(t):u(!0),i("")};return n.a.createElement("div",null,n.a.createElement(ue.a,{value:o,label:"Title",variant:"standard",error:l,disabled:e.disabled,onChange:function(e){null!==l&&u(!1),i(e.currentTarget.value)},onKeyPress:function(e){"Enter"===e.key&&d()},onBlur:function(){return u(!1)}}),l&&n.a.createElement("div",{className:"error-message"},"Title is required!"),n.a.createElement(Ye,null,n.a.createElement("div",null,n.a.createElement(h.a,{variant:"text",color:"error",onClick:e.handleClose},"Cancel")),n.a.createElement("div",null,n.a.createElement(h.a,{variant:"text",onClick:d},"Save"))))})),tt=a(253),at=a(230),rt=Object(r.memo)((function(e){var t=e.title,a=e.addTitle,r=e.handleClose;return n.a.createElement("div",{className:Qe.a.container},n.a.createElement(d.a,{container:!0,direction:"row",justifyContent:"space-between",alignItems:"center"},n.a.createElement(d.a,{item:!0,xs:10},n.a.createElement(tt.a,{variant:"h5"},t)),n.a.createElement(d.a,{item:!0,xs:2},n.a.createElement(p.a,{onClick:r},n.a.createElement(at.a,{fontSize:"medium",color:"error"})))),n.a.createElement(et,{addItem:a,handleClose:r}))})),nt=Object(r.memo)((function(){var e=v((function(e){return e.app.modal})),t=E(),a=function(){t(_({modalStatus:"no-status",isOpen:!1,modalTitle:null}))},o=Object(r.useCallback)((function(a){"add-list"===e.modalStatus&&t(ke(a)),"add-task"===e.modalStatus&&e.itemID&&t(De({todoListID:e.itemID,taskTitle:a})),t(_({modalStatus:"no-status",isOpen:!1,modalTitle:null}))}),[t,e.itemID,e.modalStatus]);return n.a.createElement(n.a.Fragment,null,n.a.createElement($e.a,{open:e.isOpen,onClose:a},n.a.createElement(ce.a,null,n.a.createElement(rt,{title:e.modalTitle&&e.modalTitle,handleClose:a,addTitle:o}))))})),ot=a(254),it=function(){console.log("app");var e=v((function(e){return e.app.isInitialized})),t=E();return Object(r.useEffect)((function(){t(z())}),[t]),e?n.a.createElement("div",null,n.a.createElement(Y,null),n.a.createElement(Ke,null),n.a.createElement(re,null),n.a.createElement(nt,null)):n.a.createElement("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"}},n.a.createElement(ot.a,null))},st=a(61),ct=a(37),lt=a(65),ut=Object(ct.b)({app:B,auth:X,todoLists:Te,tasks:Ve}),dt=Object(L.a)({reducer:ut,middleware:[lt.a]});i.a.render(n.a.createElement(st.a,null,n.a.createElement(l.a,{store:dt},n.a.createElement(it,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[134,1,2]]]);
//# sourceMappingURL=main.56b5c6cb.chunk.js.map