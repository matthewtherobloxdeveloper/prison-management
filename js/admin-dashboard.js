// Get the admin dashboard container
const logoutBtn = document.getElementById('logoutBtn');
const addUserBtn = document.getElementById('addUserBtn');
const userList = document.getElementById('userList');
const viewScheduleBtn = document.getElementById('viewScheduleBtn');

// Sign out logic
logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut();
    window.location.href = 'index.html';  // Redirect to login
});

// Check if the user is authenticated and has the correct role
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        // Get the user's role (you should store role in database or as a custom claim)
        const userRef = firebase.database().ref('users/' + user.uid);
        userRef.once('value').then(snapshot => {
            const userData = snapshot.val();
            if (userData && userData.role === 'Commanding Staff') {
                loadUserList(); // Load user list if the user is a Commanding Staff
            } else {
                window.location.href = 'dashboard.html';  // Redirect non-commanding staff to dashboard
            }
        });
    } else {
        window.location.href = 'index.html';  // Redirect to login page if not authenticated
    }
});

// Load all users in the system for management (for Commanding Staff only)
async function loadUserList() {
    const usersRef = firebase.database().ref('users');
    usersRef.on('child_added', snapshot => {
        const userId = snapshot.key;
        const userData = snapshot.val();
        if (userData.role !== 'Commanding Staff') {
            const listItem = document.createElement('li');
            listItem.textContent = `${userData.username} - ${userData.role}`;
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editUser(userId));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteUser(userId));

            listItem.appendChild(editBtn);
            listItem.appendChild(deleteBtn);
            userList.appendChild(listItem);
        }
    });
}

// Edit user data (e.g., changing role or username)
function editUser(userId) {
    const newRole = prompt("Enter new role (e.g., Officer, Booking Officer, etc.)");
    if (newRole) {
        const userRef = firebase.database().ref('users/' + userId);
        userRef.update({ role: newRole })
            .then(() => {
                alert('User role updated!');
                location.reload();  // Reload the page to reflect changes
            })
            .catch(error => {
                alert('Error updating user: ' + error.message);
            });
    }
}

// Delete user from the system
function deleteUser(userId) {
    const userRef = firebase.database().ref('users/' + userId);
    userRef.remove()
        .then(() => {
            alert('User deleted!');
            location.reload();  // Reload the page to reflect changes
        })
        .catch(error => {
            alert('Error deleting user: ' + error.message);
        });
}

// View the schedule (Commanding Staff only)
viewScheduleBtn.addEventListener('click', () => {
    const scheduleRef = firebase.database().ref('schedule');
    scheduleRef.once('value').then(snapshot => {
        let scheduleHtml = "<h3>Prisoner Schedule:</h3><ul>";
        snapshot.forEach(childSnapshot => {
            const scheduleData = childSnapshot.val();
            scheduleHtml += `<li>Prisoner ID: ${scheduleData.prisonerId}, Location: ${scheduleData.location}, Time: ${new Date(scheduleData.time).toLocaleString()}</li>`;
        });
        scheduleHtml += "</ul>";
        document.getElementById('scheduleManagement').innerHTML = scheduleHtml;
    });
});
