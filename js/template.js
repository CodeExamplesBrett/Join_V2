function cardHTML(tasks, i) {
  return /*html*/ `
    <div draggable="true" onclick="addToBoard(${i})" ondragstart="startDragging(${i})" class="task-each-category">
        <div class="status">
            
            <div class="category-label" style="background-color:var(--color-${tasks.category})">${tasks.category} </div>
        </div>

         <h4 class="task-h4">${tasks.title}</h4>
         <p class="task-description">${tasks.description}</p>
         

         <!-- commented out
         <div class="time-date">
                 <img src="./img/clock.svg" alt="">
                <p class="date">${tasks.date}</p>
        </div>  -->

         <div class="members-and-prio">
             
            <div class="task-member">
                <div class="member-symbol" id="task-member${i}"></div>
                <div id="number-of-member${i}"></div>

                
        
                </div>
                <img src="${tasks.PrioUrlLink}" alt="">
            </div>
        </div>
    </div>
    `;
}

function memberNUmberHTML(length) {
  return /*html*/ `
    <span class="number-of-member">+${length}</span>
    `;
}

function memberHTML(initials, colorId) {
  return /*html*/ `
        <div style="background-color:var(--color-${colorId})" class="avatar"><p class="initial-text">${initials}</p></div>
    `;
}


function overlayTaskHTML(i) {
  return /*html*/ `
    
    
    <div class="category-label" style="background-color:var(--color-${tasks[i].category})">${tasks[i].category} </div>
    <div class="dialog-title">${tasks[i].title}</div>
    <div class="dialog-description">${tasks[i].description}</div>

    <div style="display: flex">
    <span class="dialog-detail-text">Due Date:</span>
    <div class="">${tasks[i].date}</div>
    </div>

    <div style="display: flex">
    <span class="dialog-detail-text">Priority:</span>
    <div class="">${tasks[i].date}</div>
    </div>

    <div style="display: flex">
    <span class="dialog-detail-text">Assigned to:</span>
    <div class="">${tasks[i].date}</div>
    </div>
    

    

      <div class="user-box-dialog">
        
          <span class="gray-color">Added to</span>
          <span class="user-names-dialog" id="user-names${i}"></span>
      </div>
        
            
          </div>
    

    <div class="mobile-move-category">
            <div>
                <span class="gray-color">Move to category</span>
            </div>
        <button class="category-btn" onclick="moveToCategoryButton(${i}, 'todo')">to do</button>
        <button class="category-btn" onclick="moveToCategoryButton(${i}, 'inProgress')">In Progress</button>
        <button class="category-btn" onclick="moveToCategoryButton(${i}, 'testing')">Testing</button>
        <button class="category-btn" onclick="moveToCategoryButton(${i}, 'done')">Done</button>
    </div>
    
    <div class="dialog-btn">
        <button class="close-btn" onclick="closeBox()">Close</button>
        <button class="add-btn" onclick="deletefromBoard(${i})">Löschen</button>
    </div>

    
    `;
}


function backlogTableHTML(i, colorOfUrgency) {
  return /*html*/ `
            <table>
            <tbody>
                <tr id="liveAlertBtn"  class="taskButton responsive-display" onclick="addToBoard(${i})">
                    <td title="Add task to board" class="priority-con urgency-img-center" id="urgency-img"  style="background: url(${colorOfUrgency}) no-repeat center">
                    <!-- ${tasks[i].urgency} -->
                    </td>
                    <!-- <td class="users-con" id="user-names${i}"> -->
                        <!-- load images -->
                    <!-- </td> -->
                    <td  class="category-con" id="category">${tasks[i].category}</td>
                    <td class="status-con" id="status">${tasks[i].status}</td>
                    <td class="details-con">${tasks[i].description}</td>
                    <div id="liveAlertPlaceholder"></div>
                </tr>
            </tbody>
            </table>
            <div class="mobile-display">
                <div title="Add task to board" class="mobile-version-con" onclick="addToBoard(${i})">
                    <div  class="mobile-urgency" style="background: url(${colorOfUrgency}) no-repeat center"></div>
                    <span class="info-con-mobile">
                        <span class="title-mobile">${tasks[i].title}</span>
                        <div class="category-mobile">${tasks[i].category}</div>
                    </span>
                    <div class="details-con-mobile">
                    <span>Details</span>
                    <span class="max-width-ch">${tasks[i].description}</span>
                    </div>

                </div>
            </div>
            `;
}



// From addTasks.js  ... showUser function
function addUserDataToDialogbox(i, userName, userImg){
    return /*html*/ `
    <!-- <div class="individualUser" onclick="addUser(${i}, '${userName}')"> -->
    <div class="individualUser" onclick="addUser(${i})">
        <div class="user-show-box">
          <img class="avatar" src="${userImg}">
          <div class="userDetails">
            <span class="userName">${userName}</span>
         </div>
        </div>
        
       <!-- div for check symbol -->
       <div id="checked_${i}"></div>
    </div>`;

}
