import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Dialog, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentUserRole: null, // can be 'admin', 'teacher' or 'student'
      loginDialogOpen: false,
      registerDialogOpen: false,
      usernameInput: '',
      passwordInput: '',
      selectedFile: null,  // Add this line
      users: [
        { username: 'admin', password: 'admin', role: 'admin' },
        { username: 'teacher', password: 'teacher', role: 'teacher' },
        // More users can be added here...
      ],
      students: [
        { id: 1, name: 'Student 1', present: false },
        { id: 2, name: 'Student 2', present: false },
        { id: 3, name: 'Student 3', present: false },
        // More students here...
      ],
      semesters: [
        { id: 1, name: 'Fall 2023', startDate: '2023-09-01', endDate: '2024-01-01' },
        // More semesters can be added here...
      ],
      courses: [
        { id: 1, name: 'Course 1', teacher: 'Teacher 1', semester: 'Fall 2023' },
        // More courses can be added here...
      ],
      classes: [
        { id: 1, name: 'Class 1', teacher: null },
        // More classes can be added here...
      ],
      teachers: [
        { id: 1, name: 'Teacher 1' },
        // More teachers can be added here...
      ],
    };
  }


  sendEmail = (student) => {
    axios.post('http://localhost:8000/send-email', {
      to: student.email,
      subject: 'Your attendance is low',
      text: 'Please improve your attendance.',
    }).then((response) => {
      alert('Email sent successfully');
    }).catch((error) => {
      console.error('Error sending email', error);
    });
  };

  handleFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    
    axios.post('http://127.0.0.1:8000/upload/', formData)
      .then((response) => {
        alert('File uploaded successfully');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  assignTeacher = (classId, teacherId) => {
    this.setState((prevState) => ({
      classes: prevState.classes.map((classItem) =>
        classItem.id === classId ? { ...classItem, teacher: teacherId } : classItem
      ),
    }));
  };

  removeTeacher = (classId) => {
    this.setState((prevState) => ({
      classes: prevState.classes.map((classItem) =>
        classItem.id === classId ? { ...classItem, teacher: null } : classItem
      ),
    }));
  };


  addTeacher = () => {
    const newId = this.state.teachers.length + 1;
    const newTeacher = { id: newId, name: `Teacher ${newId}` };
    this.setState((prevState) => ({
      teachers: [...prevState.teachers, newTeacher],
    }));
  };

  updateTeacher = (id) => {
    this.setState((prevState) => ({
      teachers: prevState.teachers.map((teacher) =>
        teacher.id === id ? { ...teacher, name: `Teacher ${teacher.id} (Updated)` } : teacher
      ),
    }));
  };

  deleteTeacher = (id) => {
    this.setState((prevState) => ({
      teachers: prevState.teachers.filter((teacher) => teacher.id !== id),
    }));
  };


  addClass = () => {
    const newId = this.state.classes.length + 1;
    const newClass = { id: newId, name: `Class ${newId}` };
    this.setState((prevState) => ({
      classes: [...prevState.classes, newClass],
    }));
  };

  updateClass = (id) => {
    this.setState((prevState) => ({
      classes: prevState.classes.map((classItem) =>
        classItem.id === id ? { ...classItem, name: `Class ${classItem.id} (Updated)` } : classItem
      ),
    }));
  };

  deleteClass = (id) => {
    this.setState((prevState) => ({
      classes: prevState.classes.filter((classItem) => classItem.id !== id),
    }));
  };

  addCourse = () => {
    const newId = this.state.courses.length + 1;
    const newCourse = { id: newId, name: `Course ${newId}`, teacher: `Teacher ${newId}`, semester: 'Fall 2023' };
    this.setState((prevState) => ({
      courses: [...prevState.courses, newCourse],
    }));
  };
  
  updateCourse = (id) => {
    this.setState((prevState) => ({
      courses: prevState.courses.map((course) => 
        course.id === id ? { ...course, name: `Course ${course.id} (Updated)` } : course
      ),
    }));
  };
  
  deleteCourse = (id) => {
    this.setState((prevState) => ({
      courses: prevState.courses.filter((course) => course.id !== id),
    }));
  };

  addSemester = () => {
    const newId = this.state.semesters.length + 1;
    const newSemester = { id: newId, name: `Semester ${newId}`, startDate: '2023-09-01', endDate: '2024-01-01' };
    this.setState((prevState) => ({
      semesters: [...prevState.semesters, newSemester],
    }));
  };

  deleteSemester = (id) => {
    this.setState((prevState) => ({
      semesters: prevState.semesters.filter((semester) => semester.id !== id),
    }));
  };

  updateSemester = (id) => {
    // Note: Here, we're just toggling the year in the name for simplicity.
    // In a real application, you'd likely open a dialog for the admin to enter the new info.
    this.setState((prevState) => ({
      semesters: prevState.semesters.map((semester) => 
        semester.id === id ? { ...semester, name: `Semester ${semester.id} (Updated)` } : semester
      ),
    }));
  };

  handleAttendanceChange = (id) => {
    this.setState((prevState) => {
      const students = prevState.students.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      );
      return { students };
    });
  };

  addStudent = () => {
    const newId = this.state.students.length + 1;
    const newStudent = { id: newId, name: `Student ${newId}`, present: false };
    this.setState((prevState) => ({
      students: [...prevState.students, newStudent],
    }));
  };

  deleteStudent = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.filter((student) => student.id !== id),
    }));
  };

  switchUserRole = () => {
    this.setState((prevState) => ({
      currentUserRole: prevState.currentUserRole === 'admin' ? 'student' : 'admin',
    }));
  };

  handleLoginDialogOpen = () => {
    this.setState({ loginDialogOpen: true });
  };

  handleLoginDialogClose = () => {
    this.setState({ loginDialogOpen: false, usernameInput: '', passwordInput: '' });
  };

  handleRegisterDialogOpen = () => {
    this.setState({ registerDialogOpen: true });
  };

  handleRegisterDialogClose = () => {
    this.setState({ registerDialogOpen: false, usernameInput: '', passwordInput: '' });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = () => {
    const { usernameInput, passwordInput } = this.state;
    
    axios.post('http://127.0.0.1:8000/login/', {
      username: usernameInput,
      password: passwordInput
    })
    .then((response) => {
      if (response.data.status === 'ok') {
        this.setState({ currentUser: usernameInput, currentUserRole: response.data.role });
      } else {
        alert('Invalid username or password');
      }
    })
    .catch((error) => {
      console.error(error);
    });
    
    this.handleLoginDialogClose();
  };

  handleRegister = () => {
    const { usernameInput, passwordInput } = this.state;
  
    axios.post('http://127.0.0.1:8000/register/', {
      username: usernameInput,
      password: passwordInput
    })
    .then((response) => {
      if (response.data.status === 'ok') {
        alert('Registration successful');
        this.setState({ currentUser: usernameInput, currentUserRole: 'student' });
      } else {
        alert(response.data.error);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  
    this.handleRegisterDialogClose();
  };

  handleLogout = () => {
    this.setState({ currentUser: null, currentUserRole: null });
  };


  render() {
    const { currentUser, currentUserRole, loginDialogOpen, registerDialogOpen, usernameInput, passwordInput, students, semesters, courses, classes, teachers } = this.state;
    const isAdmin = currentUserRole === 'admin';
    const canEditAttendance = currentUserRole === 'admin' || currentUserRole === 'teacher';
  

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              school attendance
            </Typography>

            {/* Login, register, and logout buttons */}
            {currentUser ? (
              <>
                <Typography variant="subtitle1">
                  Logged in as {currentUser} ({currentUserRole})
                </Typography>
                <Button color="inherit" onClick={this.handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={this.handleLoginDialogOpen}>
                  Login
                </Button>
                <Button color="inherit" onClick={this.handleRegisterDialogOpen}>
                  Register
                </Button>
              </>
            )}

            {/* Login dialog */}
            <Dialog open={loginDialogOpen} onClose={this.handleLoginDialogClose}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="usernameInput"
                  label="Username"
                  type="text"
                  fullWidth
                  value={usernameInput}
                  onChange={this.handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="passwordInput"
                  label="Password"
                  type="password"
                  fullWidth
                  value={passwordInput}
                  onChange={this.handleInputChange}
                />
                           </DialogContent>
              <DialogActions>
                <Button onClick={this.handleLoginDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleLogin} color="primary">
                  Login
                </Button>
              </DialogActions>
            </Dialog>

            {/* Register dialog */}
            <Dialog open={registerDialogOpen} onClose={this.handleRegisterDialogClose}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="usernameInput"
                  label="Username"
                  type="text"
                  fullWidth
                  value={usernameInput}
                  onChange={this.handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="passwordInput"
                  label="Password"
                  type="password"
                  fullWidth
                  value={passwordInput}
                  onChange={this.handleInputChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRegisterDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleRegister} color="primary">
                  Register
                </Button>
              </DialogActions>
            </Dialog>

            {/* Other app content */}
            {/* ... */}
          </Toolbar>
        </AppBar>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>attendance</TableCell>
                {isAdmin && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={student.present}
                      onChange={() => this.handleAttendanceChange(student.id)}
                      disabled={!canEditAttendance}
                    />
                  </TableCell>
                  {canEditAttendance && (
                    <TableCell>
                      <Button onClick={() => this.deleteStudent(student.id)}>Delete</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>




        {isAdmin && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Semester name</TableCell>
                  <TableCell>start date</TableCell>
                  <TableCell>end date</TableCell>
                  <TableCell>operate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {semesters.map((semester) => (
                  <TableRow key={semester.id}>
                    <TableCell>{semester.name}</TableCell>
                    <TableCell>{semester.startDate}</TableCell>
                    <TableCell>{semester.endDate}</TableCell>
                    <TableCell>
                      <Button onClick={() => this.updateSemester(semester.id)}>更新</Button>
                      <Button onClick={() => this.deleteSemester(semester.id)}>删除</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {isAdmin && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>{course.teacher}</TableCell>
                    <TableCell>{course.semester}</TableCell>
                    <TableCell>
                      <Button onClick={() => this.updateCourse(course.id)}>Update</Button>
                      <Button onClick={() => this.deleteCourse(course.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

{isAdmin && (
          <>
            <h2>Classes</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class Name</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell>{classItem.name}</TableCell>
                      <TableCell>{classItem.teacher ? classItem.teacher : 'No teacher assigned'}</TableCell>
                      <TableCell>
                        {/* Add dropdown menu */}
                        <select onChange={(e) => this.assignTeacher(classItem.id, e.target.value)}>
                          <option value="">Select a teacher</option>
                          {teachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.name}
                            </option>
                          ))}
                        </select>
                        <Button onClick={() => this.removeTeacher(classItem.id)}>Remove Teacher</Button>
                        <Button onClick={() => this.updateClass(classItem.id)}>Update</Button>
                        <Button onClick={() => this.deleteClass(classItem.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={this.addClass}>Add Class</Button>
          </>
        )}

        {isAdmin && (
          <>
            <h2>Teachers</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>
                        <Button onClick={() => this.updateTeacher(teacher.id)}>Update</Button>
                        <Button onClick={() => this.deleteTeacher(teacher.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={this.addTeacher}>Add Teacher</Button>
          </>
        )}

        {isAdmin && (
          <>
            <h2>Upload Student Excel File</h2>
            <input type="file" onChange={this.handleFileChange} />
            <Button onClick={this.handleFileUpload}>Upload</Button>
          </>
        )}



        {isAdmin && <Button onClick={this.addCourse}>Add Course</Button>}

        

        {isAdmin && <Button onClick={this.addSemester}>Add term</Button>}
        
        {canEditAttendance && <Button onClick={this.addStudent}>Add students</Button>}
      </div>
    );
  }
}

export default App;