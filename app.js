const students=[];

const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

function procesarForm(e) {
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

document.getElementById("studentForm").addEventListener("submit", procesarForm);

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td><button class="edit">Editar</button>
    <button class="delete">Eliminar</button></td>`;
    
    // Eventos al presionar botón
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

const totalSpan = document.getElementById("total");
const aprobadosSpan = document.getElementById("aprobados");
const reprobadosSpan = document.getElementById("reprobados");

function calcularPromedio(){
  // Condicional que cambia el texto cuando no hayan alumnos consultados
  if(students.length === 0){
    averageDiv.textContent=`Promedio General del Curso: No Disponible`
    totalSpan.textContent = `Total de estudiantes: 0`;
    aprobadosSpan.textContent = `Alumnos aprobados (≥ 4): 0`;
    reprobadosSpan.textContent = `Alumnos reprobados (< 4): 0`;
    return;
  }

  const total = students.reduce((sum, s) => sum + s.grade, 0);
  const average = total / students.length;

  const aprobadosCount = students.filter(s => s.grade >= 4.0).length;
  const reprobadosCount = students.length - aprobadosCount;
    
  averageDiv.textContent=`Promedio General del Curso: ${average.toFixed(2)}`;
  totalSpan.textContent = `Total de estudiantes: ${students.length}`;
  aprobadosSpan.textContent = `Alumnos aprobados (≥ 4): ${aprobadosCount}`;
  reprobadosSpan.textContent = `Alumnos reprobados (< 4): ${reprobadosCount}`;
}

// Funcion para editar a estudiantes
function editEstudiante(student, row) {
  
  // Carga de datos en el form
  document.getElementById("name").value = student.name;
  document.getElementById("lastName").value = student.lastName;
  document.getElementById("grade").value = student.grade;

  // Cambia texto del botón para guardar cambios de edición
  const submitButton = document.querySelector("#studentForm button");
  submitButton.textContent = "Guardar Cambios";

  // Remueve al estudiante del array y la tabla
  const index = students.indexOf(student);
  if (index > -1) {
    students.splice(index, 1);
  }
  row.remove();
  calcularPromedio();

  // Cambia el comportamiento del guardar temporalmente
  const form = document.getElementById("studentForm");
  form.removeEventListener("submit", procesarForm); // Quita listener original

  form.addEventListener("submit", guardarEdit);

  function guardarEdit(e) {
    e.preventDefault();

    // Obtiene nuevos datos
    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = parseFloat(document.getElementById("grade").value.trim());

    const updatedStudent = {name, lastName, grade};
    students.push(updatedStudent);
    addStudentToTable(updatedStudent);
    calcularPromedio();
    form.reset();

    // Restaura comportamiento original
    form.removeEventListener("submit", guardarEdit);
    form.addEventListener("submit", procesarForm);
    submitButton.textContent = "Agregar Estudiante";
  }
}
