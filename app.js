const students=[];

const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

function handleSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const grade = parseFloat(document.getElementById("grade").value.trim());

  const student = { name, lastName, grade };
  students.push(student);
  addStudentToTable(student);
  calcularPromedio();

  this.reset();
}

document.getElementById("studentForm").addEventListener("submit", handleSubmit);

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td><button class="edit">Editar</button>
    <button class="delete">Eliminar</button></td>`;
    row.querySelector(".edit").addEventListener("click", function () {
  editEstudiante(student, row);
});
    row.querySelector(".delete").addEventListener("click",function(){
    deleteEstudiante(student,row);
 });
   tableBody.appendChild(row);
   
}

function deleteEstudiante(student,row){
    // buscar el estudiante en el array
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}

function calcularPromedio(){
    if(students.length === 0){
   averageDiv.textContent=`Promedio General del Curso: No Disponible`
   return;
}
    const total=students.reduce((sum,s)=>sum+s.grade,0);
    console.log(total)
    const average=total/students.length;
    console.log(average)
    averageDiv.textContent=`Promedio General del Curso: ${average.toFixed(2)}`;
}

function editEstudiante(student, row) {
  // Cargar los datos en el formulario
  document.getElementById("name").value = student.name;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("grade").value = student.grade;

  // Cambiar texto del botón para reflejar que estamos editando
  const submitButton = document.querySelector("#studentForm button");
  submitButton.textContent = "Guardar Cambios";

  // Remover el estudiante actual del array y la tabla
  const index = students.indexOf(student);
  if (index > -1) {
    students.splice(index, 1);
  }
  row.remove();
  calcularPromedio();

  // Cambiar el comportamiento del submit temporalmente
  const form = document.getElementById("studentForm");
  form.removeEventListener("submit", handleSubmit); // Quitar listener original

  form.addEventListener("submit", handleEdit);

  function handleEdit(e) {
    e.preventDefault();

    // Obtener nuevos datos
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value.trim());

    const updatedStudent = { name, lastName, grade };
    students.push(updatedStudent);
    addStudentToTable(updatedStudent);
    calcularPromedio();
    form.reset();

    // Restaurar comportamiento original
    form.removeEventListener("submit", handleEdit);
    form.addEventListener("submit", handleSubmit);
    submitButton.textContent = "Agregar Estudiante";
  }
}
