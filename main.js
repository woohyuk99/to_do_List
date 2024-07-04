// 유저가 값을 입력
// + 버튼 클릭, 할 일이 추가된다
// delete 버튼 누르면 할 일 삭제
// check 버튼 누르면 할 일 종료, 밑줄
// 1. check 버튼 클릭하면 true false
// 2. true이면 끝난 걸로 간주하고 밑줄
// 3. false이면 안 끝난 걸로 간주하고 그대로
// Not done 버튼 종료 탭 누르면 밑줄 이동
// Done, not done
// All 탭 누르면 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let filterList = [];
let mode = 'all'

addButton.addEventListener("click", addTask);
addButton.disabled = true

// Mission 2. 엔터를 통해 할일을 입력할 수 있음
taskInput.addEventListener("keyup", function() {
  taskInput.value == "" ? (addButton.disabled = true) : (addButton.disabled = false)
})

taskInput.addEventListener("keydown", function(event){
  event.key == "Enter" && taskInput.value != "" && addTask()
})


for(let i=1; i<tabs.length; i++){
  tabs[i].addEventListener("click", function(event) {
    filter(event)
  })
}
console.log(tabs)

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  //console.log(taskList);
  render();
  // Mission 1. 할일을 입력하고 나면 입력창이 자동으로 비워짐
  taskInput.value = "" 
  // Mission 3. 입력한 할일이 없다면 할일 추가가 안됨 (즉 비어있는 할일 추가가 안됨)
  addButton.disabled = true
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = []
  if(mode == "all"){
    list = taskList
   // all taskLisk
  } else if(mode == "ongoing" || mode == "done"){
    list = filterList
    // filterlist
  }
  // 2. 리스트를 달리 보여준다
  // all taskList
  // ongoing, done   filterlist


  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      
      resultHTML += `<div class="task">
        <div class = "task-done">${list[i].taskContent}</div>
        <div>
            <button onClick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
            <button onClick = "deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
          <button onClick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button onClick = "deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
      </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }

  render();
  console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].id == id){
        taskList.splice(i, 1)
        break;
      }
    }
    render()
  }
  
function filter(event){
  mode = event.target.id
  filterList = []
  if(mode == "all"){
    // 전체 리스트를 보여준다
    render()
  } else if(mode == "ongoing"){
      // 진행 중인 아이템을 보여준다
      // task.isComplete == false
      for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == false){
          filterList.push(taskList[i])

        }
      }
      render()
      console.log("진행 중", filterList)

  } else if(mode == "done") {
      // 끝나는 케이스에 대해 보여준다
      // task.isComplete == true
      for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true) {
          filterList.push(taskList[i])
        }
      }
      render()
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}







