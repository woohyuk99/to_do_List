// 유저가 값을 입력
// + 버튼 클릭, 할 일이 추가된다
// delete 버튼 누르면 할 일 삭제
// check 버튼 누르면 할 일 종료, 밑줄
// Not done 버튼 종료 탭 누르면 밑줄 이동
// Done, not done 
// All 탭 누르면 돌아옴

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []
addButton.addEventListener("click", addTask)


function addTask(){
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList)
    render();
}


function render(){
    let resultHTML = ``;
    for(let i=0; i<taskList.length; i++){
        resultHTML += `<div class="task">
        <div>집가기</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML
}