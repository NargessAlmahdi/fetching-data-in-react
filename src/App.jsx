import { useState, useEffect } from 'react'
import './App.css'
import * as studentServices from './services/studentsService'

const App = () => {

  const [students, setStudents] = useState([])
  const [refreshTrigger, setRefreshTrigger] = useState(true)

  const fetchAllStudents = async () => {
    const studentData = await studentServices.index()
    setStudents(studentData)
  }

  useEffect(() => {
    fetchAllStudents()

  }, [refreshTrigger])

  const handleDelete = async(id) => {
    await studentServices.deleteStudent(id)
    setRefreshTrigger(!refreshTrigger)
  }

  return (
    <>
    <h1>Fetch all Students!</h1>
    <ul>
      {students.map((student) => (
        <li key={student._id}>{student.name}
        <button onClick={() => handleDelete(student._id)}>x</button>
        </li>
      ))}
    </ul>
    </>
  );
}

export default App
