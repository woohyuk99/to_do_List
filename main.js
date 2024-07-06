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
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = "all";

let a = document.getElementById("under-line");
let b = document.querySelectorAll(".task-tabs div"); // querySelectorAll : 조건에 맞는 모든 것을 가져온다

addButton.addEventListener("click", addTask);
addButton.disabled = true;

// Mission 2. 엔터를 통해 할일을 입력할 수 있음
taskInput.addEventListener("keyup", function () {
  taskInput.value == ""
    ? (addButton.disabled = true)
    : (addButton.disabled = false);
});

taskInput.addEventListener("keydown", function (event) {
  event.key == "Enter" && taskInput.value != "" && addTask();
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}


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
  taskInput.value = "";
  // Mission 3. 입력한 할일이 없다면 할일 추가가 안됨 (즉 비어있는 할일 추가가 안됨)
  addButton.disabled = true;
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let result = ""
  list = [];
  if (mode == "all") {
    list = taskList;
    // all taskLisk
  } else {
    list = filterList;
    // filterlist
  }
  // 2. 리스트를 달리 보여준다
  // all taskList
  // ongoing, done   filterlist

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task">
        <div class = "task-done">${list[i].taskContent}</div>
        <div>
            <button onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
            <button onclick = "deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${list[i].taskContent}</div>
      <div>
          <button onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
          <button onclick = "deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
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
  filter()
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter()
}

// Mission 5, 6: 탭 상태에 따른 이동 및 삭제 시 UI에 적용
function filter(event) {
  if (event) {
    mode = event.target.id;
    a.style.width = event.target.offsetWidth + "px";
    a.style.left = event.target.offsetLeft + "px";
    a.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가
  }

  filterList = [];
  if (mode == "ongoing") {
    // 진행 중인 아이템을 보여준다
    // task.isComplete == false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    // 끝나는 케이스에 대해 보여준다
    // task.isComplete == true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
