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
let taskList = [];
addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      
      resultHTML += `<div class="task">
        <div class = "task-done">${taskList[i].taskContent}</div>
        <div>
            <button onClick = "toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
            <button onClick = "deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div>
          <button onClick = "toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button onClick = "deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
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
  


function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
