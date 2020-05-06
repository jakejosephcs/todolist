!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=document.querySelector(".main-page"),a=document.querySelector(".view-or-edit-page"),r=document.querySelector(".add-new-task-page"),s=document.querySelector(".tasks-container"),i=document.querySelector(".add-task-btn"),o=document.querySelector(".add-new-task"),d=document.querySelector(".update-task"),l=document.querySelector(".delete-task"),c=document.querySelector("#categorySelect"),u=document.querySelector(".sort-categories");let m,y=[];i.addEventListener("click",()=>{const e=document.querySelector("#name").value,t=document.querySelector("#dueDate").value,n=document.querySelector("#category").value,a=document.querySelector("#priority").value,r=document.querySelector("#notes").value;if(""==e||""==t||""==n)alert("Please enter a Name, Due Date and Category");else{let s=p(e,t,n,a,r);y.push(s),f.assignIds(),f.updateTaskList(),f.showTaskList(),v.setStorage()}}),s.addEventListener("click",e=>{"checkbox"==e.target.type&&f.deleteTask(e.target.id)}),u.addEventListener("click",()=>{f.sortByCategories(c.value)}),l.addEventListener("click",()=>{f.deleteTask(m)}),d.addEventListener("click",()=>{const e=document.querySelector("#nameEdit").value,t=document.querySelector("#dueDateEdit").value,n=document.querySelector("#categoryEdit").value;""==e||""==t||""==n?alert("Please enter a Name, Due Date and Category"):f.updateTask(m)}),o.addEventListener("click",()=>{f.showNewTaskForm()}),n.addEventListener("click",e=>{"view-or-edit-task"==e.target.classList[1]&&f.showViewOrEditList(e.target.classList[0])});const v={setStorage:()=>{localStorage.setItem("taskList",JSON.stringify(y))},getStorage:()=>{JSON.parse(localStorage.getItem("taskList")).length>0&&(y=JSON.parse(localStorage.getItem("taskList")),f.updateTaskList())}},p=(e,t,n,a,r)=>({name:e,dueDate:t,category:n,priority:a,notes:r}),f=(()=>{const e=()=>{s.innerHTML="",y.forEach(e=>{s.innerHTML+=`\n            <div class="task d-flex justify-content-center align-items-center pt-3 border-bottom pb-2">\n                <input type="checkbox" name="" id="${e.id} ">\n                <div class="task-info d-flex flex-column ml-3 align-items-center justify-content-center">\n                    <div class="task-name d-flex pr-2 pl-2 w-100 justify-self-center">${e.name}</div>\n                    <div class="task-details d-flex align-items-center justify-content-between">\n                        <div class="task-category pl-2 pr-2">${e.category}</div>\n                        <div class="task-priortiy pl-2 pr-2">${e.priority}</div>\n                        <div class="task-due-date pl-2 pr-2 text-black-50">${e.dueDate}</div>\n                    </div>\n                </div>\n                <button class="${e.id} view-or-edit-task h-50 ml-2 btn btn-primary btn-sm">View or Edit</button>\n            </div>\n            `}),v.setStorage(),d()},t=()=>{n.classList.remove("d-none"),n.classList.add("d-flex"),a.classList.remove("d-flex"),a.classList.add("d-none"),r.classList.remove("d-flex"),r.classList.add("d-none")},i=()=>{let e=0;y.forEach(t=>{t.id=e++})},o=e=>{document.querySelector("#nameEdit").value=y[e].name,document.querySelector("#dueDateEdit").value=y[e].dueDate,document.querySelector("#categoryEdit").value=y[e].category,document.querySelector("#priorityEdit").value=y[e].priority,document.querySelector("#notesEdit").value=y[e].notes,m=e},d=()=>{c.innerHTML='<option id="All" class="dropdown-item">All</option>',y.forEach(e=>{c.innerHTML.includes(e.category)||(c.innerHTML+=`<option id="${e.category}" class="dropdown-item">${e.category}</option>`)})};return{updateTaskList:e,showTaskList:t,showNewTaskForm:()=>{r.classList.remove("d-none"),r.classList.add("d-flex"),a.classList.remove("d-flex"),a.classList.add("d-none"),n.classList.remove("d-flex"),n.classList.add("d-none")},assignIds:i,showViewOrEditList:e=>{a.classList.remove("d-none"),a.classList.add("d-flex"),r.classList.remove("d-flex"),r.classList.add("d-none"),n.classList.remove("d-flex"),n.classList.add("d-none"),o(e)},updateTask:n=>{y[n].name=document.querySelector("#nameEdit").value,y[n].dueDate=document.querySelector("#dueDateEdit").value,y[n].category=document.querySelector("#categoryEdit").value,y[n].priority=document.querySelector("#priorityEdit").value,y[n].notes=document.querySelector("#notesEdit").value,e(),t()},deleteTask:n=>{y.forEach(e=>{e.id==n&&y.splice(n,1)}),i(),e(),t()},sortByCategories:e=>{s.innerHTML="",y.forEach(t=>{t.category==e?s.innerHTML+=`\n                <div class="task d-flex justify-content-center align-items-center pt-3 border-bottom pb-2">\n                    <input type="checkbox" name="" id="${t.id} ">\n                    <div class="task-info d-flex flex-column ml-3 align-items-center justify-content-center">\n                        <div class="task-name d-flex pr-2 pl-2 w-100 justify-self-center">${t.name}</div>\n                        <div class="task-details d-flex align-items-center justify-content-between">\n                            <div class="task-category pl-2 pr-2">${t.category}</div>\n                            <div class="task-priortiy pl-2 pr-2">${t.priority}</div>\n                            <div class="task-due-date pl-2 pr-2 text-black-50">${t.dueDate}</div>\n                        </div>\n                    </div>\n                    <button class="${t.id} view-or-edit-task h-50 ml-2 btn btn-primary btn-sm">View or Edit</button>\n                </div>\n                `:"All"!=e&&"all"!=e||(s.innerHTML+=`\n                <div class="task d-flex justify-content-center align-items-center pt-3 border-bottom pb-2">\n                    <input type="checkbox" name="" id="${t.id} ">\n                    <div class="task-info d-flex flex-column ml-3 align-items-center justify-content-center">\n                        <div class="task-name d-flex pr-2 pl-2 w-100 justify-self-center">${t.name}</div>\n                        <div class="task-details d-flex align-items-center justify-content-between">\n                            <div class="task-category pl-2 pr-2">${t.category}</div>\n                            <div class="task-priortiy pl-2 pr-2">${t.priority}</div>\n                            <div class="task-due-date pl-2 pr-2 text-black-50">${t.dueDate}</div>\n                        </div>\n                    </div>\n                    <button class="${t.id} view-or-edit-task h-50 ml-2 btn btn-primary btn-sm">View or Edit</button>\n                </div>\n                `)})}}})();v.getStorage()}]);