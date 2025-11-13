// Add a new prisoner to the database
document.getElementById('addPrisonerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('prisonerName').value;
    const file = document.getElementById('prisonerPhoto').files[0];

    // Upload prisoner photo to Firebase Storage
    const storageRef = storage.ref('prisoner_photos/' + file.name);
    const uploadTask = storageRef.put(file);

    uploadTask.on('state_changed', null, (error) => {
        console.error(error);
    }, async () => {
        // Get the download URL
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

        // Save prisoner data to Firebase Realtime Database
        const prisonerId = database.ref('prisoners').push().key;
        await database.ref('prisoners/' + prisonerId).set({
            name: name,
            photoUrl: downloadURL,
            status: 'In Cell',
            assignedCell: 'Cell 1',
            dateAdmitted: Date.now(),
        });

        alert('Prisoner added successfully!');
    });
});
