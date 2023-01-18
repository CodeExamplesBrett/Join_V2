function cardHTML(tasks, i) {
  return /*html*/ `
    <div draggable="true" onclick="addToBoard(${i})" ondragstart="startDragging(${i})" class="task-each-category">
        <div class="status">
            <div class="color-field" style="background-color:var(--color-${
              tasks.urgency
            })"></div>
            <div>${tasks.category.toUpperCase()}</div>
        </div>
        <h4 class="task-h4">${tasks.title}</h4>
         <p class="task-description">${tasks.description}</p>
         <div class="time-and-members">
             <div class="time-date">
                 <img src="./img/clock.svg" alt="">
                <p class="date">${tasks.date}</p>
            </div>
            <div class="task-member" onmouseover="showMembers(${i})" onmouseout="hideMembers(${i})">
                <div id="task-member${i}">
                    
                </div>
                <div id="number-of-member${i}">
                    
                </div>
                <div class="member-overview d-none" id="member-overview${i}">
                    
                </div>
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

function memberHTML(img) {
  return /*html*/ `
        <img class="avatar" src="${img}" alt="">
    `;
}

function memberOverviewHTML(img) {
  return /*html*/ `
        <img class="avatar-ov" src="${img}" alt="">
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

function overlayTaskHTML(i) {
  return /*html*/ `
  
    <div class="dialog-title">${tasks[i].title}</div>

    

      <div class="user-box-dialog">
          <span class="gray-color">Added to</span>
          <span class="user-names-dialog" id="user-names${i}"></span>
      </div>
        <div class="table-con"> 
          <div class="info-table">
            <table class="dialog-table">
                  <tr>
                    <th>Category</th>
                    <td class="font-variant">${tasks[i].category}</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>${tasks[i].status}</td>
                  </tr>

                  <tr></tr>
                    <th class="display-block">Details</th>
                    <td>${tasks[i].description}</td>
                  </tr>
              </table>
          </div>
    <div class="date-con">${tasks[i].date}</div>

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

// From addTasks.js  ... showUser function
function addUserDataToDialogbox(i, userName, userImg, userMail){
    return /*html*/ `
    <!-- <div class="individualUser" onclick="addUser(${i}, '${userName}')"> -->
    <div class="individualUser" onclick="addUser(${i})">
        <div class="user-show-box">
          <img class="avatar" src="${userImg}">
          <div class="userDetails">
            <span class="userName">${userName}</span>
            <span class="userName">${userMail}</span>
         </div>
        </div>
        
       <!-- div for check symbol -->
       <div id="checked_${i}"></div>
    </div>`;

}
