document.getElementById('studentForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the form from submitting

    const rollNo = document.getElementById('rollNo').value;
    const fatherName = document.getElementById('fatherName').value;

    // Fetch the Excel file
    fetch('students.xlsx')  // Ensure the path to students.xlsx is correct
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            // Convert the sheet to JSON
            const studentsData = XLSX.utils.sheet_to_json(sheet);

            // Find the student by roll number and father's name
            const student = studentsData.find(s => s.RollNo === rollNo && s.FatherName.toLowerCase() === fatherName.toLowerCase());

            if (student) {
                // Display the student data
                document.getElementById('result').style.display = 'block';
                document.getElementById('studentRollNo').textContent = student.RollNo;
                document.getElementById('name').textContent = student.Name;
                document.getElementById('english').textContent = student.English;
                document.getElementById('hindi').textContent = student.Hindi;
                document.getElementById('math').textContent = student.Math;
                document.getElementById('science').textContent = student.Science;
                document.getElementById('socialScience').textContent = student['Social Science'];
                document.getElementById('totalMarks').textContent = student.Total;
                document.getElementById('percentage').textContent = student.Percentage;
                document.getElementById('emailId').textContent = student.EmailId;
                document.getElementById('fatherNameDisplay').textContent = student.FatherName;
            } else {
                alert("Student not found. Please check the roll number and father's name.");
            }
        })
        .catch(error => {
            console.error("Error reading the Excel file:", error);
            alert("Failed to load student data.");
        });
});
