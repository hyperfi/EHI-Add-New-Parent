const Home = {
  template: `
  <div class="container mt-5">
      <h1 class="text-center mb-4">Parent Customer Entry</h1>
      <form class="needs-validation" novalidate>
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
          <div class="mb-3">
              <label for="parentContact" class="form-label">Parent Contact:</label>
              <input type="text" id="parentContact" v-model="formData.parentContact" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary w-100" @click="submitForm">Submit</button>
      </form>
      <div class="mt-5" v-if="entries.length > 0">
          <h2 class="text-center mb-4">Existing Entries</h2>
          <h1 class="text-center mb-4">Parent Customer Entries</h1>
          <table class="table table-striped table-bordered">
              <thead class="table-dark">
                  <tr>
                      <th>Parent Name</th>
                      <th>Address</th>
                      <th>Visiting Date</th>
                      <th>Child Name</th>
                      <th>Course Enrolled</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="entry in entries" :key="entry.id">
                      <td>{{ entry.parentName }}</td>
                      <td>{{ entry.address }}</td>
                      <td>{{ entry.visitingDate }}</td>
                      <td>{{ entry.childName }}</td>
                      <td>{{ entry.courseEnrolled }}</td>
                      <td><button class="btn btn-danger" @click="deleteEntry(entry.parentContact)">Delete</button></td>
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
        courseEnrolled: '',
        parentContact: '',
      },
      entries: []
    };
  },
  methods: {
    async submitForm() {
      let newEntry = { ...this.formData }; // Create a new entry object from form data
      // Pervent sending the post request twice
      newEntry.id = Math.floor(Math.random() * 1000000); // Generate a random ID for the new entry
      // console.log('submitForm called with data:', newEntry);
      const url = window.location.origin;
      const response = await fetch(url+"/api/entry", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      });
      if (!response.ok) {
        let data = await response.json();
        console.error('Failed to send data to API:', data.message);
      } else {
        console.log('Data sent to API successfully');
        // Optionally, refresh the entries list after submission
        await this.fetchEntries();
        // console.log('New entry added:', newEntry);
        // newEntry = {}; // Reset the new entry object
      }
      this.formData = {
        parentName: '',
        address: '',
        visitingDate: '',
        childName: '',
        courseEnrolled: '',
        parentContact: '',
      };
    },

    async fetchEntries() {
      const url = window.location.origin;
      const response = await fetch(url+"/api/entry");
      if (!response.ok) {
        let data = await response.json();
        console.error('Failed to fetch entries:', data.message);
      } else {
        this.entries = await response.json(); // Assuming the API returns an array of entries
      }
    }
    ,
    async deleteEntry(parentContact) {
      const url = window.location.origin;
      const response = await fetch(url+"/api/entry"+"/"+parentContact, {
        method: 'DELETE'
      });
      if (!response.ok) {
        let data = await response.json();
        console.error('Failed to delete entry:', data.message);
      } else {
        console.log('Entry deleted successfully');
        // Optionally, refresh the entries list after deletion
        this.fetchEntries();
      }
    }
  },
  mounted() {
    // Fetch existing entries from API if needed
    this.fetchEntries();


  },
};

export default Home;
