const Home = {
  template: `
  <div class="container mt-5">
      <h1 class="text-center mb-4">Parent Customer Entry</h1>
      <form @submit.prevent="submitForm" class="needs-validation" novalidate>
          <div class="mb-3">
              <label for="parentName" class="form-label">Parent Name:</label>
              <input type="text" id="parentName" v-model="formData.parentName" class="form-control" required>
          </div>
          <div class="mb-3">
              <label for="address" class="form-label">Address:</label>
              <input type="text" id="address" v-model="formData.address" class="form-control" required>
          </div>
          <div class="mb-3">
              <label for="visitingDate" class="form-label">Visiting Date:</label>
              <input type="date" id="visitingDate" v-model="formData.visitingDate" class="form-control" required>
          </div>
          <div class="mb-3">
              <label for="childName" class="form-label">Child Name:</label>
              <input type="text" id="childName" v-model="formData.childName" class="form-control" required>
          </div>
          <div class="mb-3">
              <label for="courseEnrolled" class="form-label">Course Enrolled:</label>
              <input type="text" id="courseEnrolled" v-model="formData.courseEnrolled" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary w-100" @click="submitForm">Submit</button>
      </form>
      <div class="mt-5">
          <h1 class="text-center mb-4">Parent Customer Entries</h1>
          <table class="table table-striped table-bordered">
              <thead class="table-dark">
                  <tr>
                      <th>Parent Name</th>
                      <th>Address</th>
                      <th>Visiting Date</th>
                      <th>Child Name</th>
                      <th>Course Enrolled</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="entry in entries" :key="entry.id">
                      <td>{{ entry.parentName }}</td>
                      <td>{{ entry.address }}</td>
                      <td>{{ entry.visitingDate }}</td>
                      <td>{{ entry.childName }}</td>
                      <td>{{ entry.courseEnrolled }}</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
  `,
  
  data() {
    return {
      formData: {
        parentName: '',
        address: '',
        visitingDate: '',
        childName: '',
        courseEnrolled: ''
      },
      entries: []
    };
  },
  methods: {
    submitForm() {
      const newEntry = { ...this.formData }; // Create a new entry object from form data
      newEntry.id = Date.now(); // Assign a unique ID based on timestamp 
      this.entries.push(newEntry); // Add the new entry to the entries array
      this.formData = {
        parentName: '',
        address: '',
        visitingDate: '',
        childName: '',
        courseEnrolled: ''
      }; // Reset form data after submission
      // Save entries to local storage or send to an API
      localStorage.setItem('entries', JSON.stringify(this.entries));
      // Optionally, you can send the data to an API endpoint here
      

    }
  },
  mounted() {
    // Fetch existing entries from local storage or API if needed
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    this.entries = storedEntries;
  },
};

export default Home;
