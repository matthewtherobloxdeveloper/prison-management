firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Check user role in the database or from custom claims
        const userRole = user.uid;  // Assuming you're using Firebase UID as the role in your database
        displayUserOptions(userRole);
    } else {
        window.location.href = 'index.html';  // Redirect to login if not authenticated
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    auth.signOut();
    window.location.href = 'index.html';  // Redirect to login page after logout
});

function displayUserOptions(role) {
    const userOptions = document.getElementById('userOptions');
    
    // Based on the user role, show appropriate options
    if (role === 'Commanding Staff') {
        userOptions.innerHTML = `<a href="prisoner-management.html">Manage Prisoners</a>`;
    } else if (role === 'Officer' || role === 'Booking Officer') {
        userOptions.innerHTML = `<a href="prisoner-management.html">View Prisoners</a>`;
    }
}
