document.getElementById('rollNoForm').addEventListener('submit', function (e) {
   e.preventDefault();  // Prevent the form from submitting

   const rollNo = document.getElementById('rollNo').value;

   // Fetch and read the Excel file
   fetch('students.xlsx')
       .then(response => response.arrayBuffer())
       .then(data => {
           const workbook = XLSX.read(data, { type: "array" });
           const sheet = workbook.Sheets[workbook.SheetNames[0]];

           // Convert the sheet to JSON
           const studentsData = XLSX.utils.sheet_to_json(sheet);

           // Find the student by roll number
           const student = studentsData.find(s => s.RollNo == rollNo);

           if (student) {
               // Display the result
               document.getElementById('result').style.display = 'block';
               document.getElementById('name').textContent = student.Name;
               document.getElementById('english').textContent = student.English;
               document.getElementById('hindi').textContent = student.Hindi;
               document.getElementById('math').textContent = student.Math;
               document.getElementById('science').textContent = student.Science;
               document.getElementById('socialScience').textContent = student['Social Science'];
           } else {
               alert("Roll number not found.");
           }
       })
       .catch(error => {
           console.error("Error reading the Excel file:", error);
           alert("Failed to load student data.");
       });
});
