const Home = {
  template: `
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card shadow-lg p-4" style="width: 70%; max-height: 90%; overflow-y: auto;">
          <h1 class="text-center mb-5">Parent Customer Entry</h1>
          <!-- Display error message if it exists -->
          <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
              {{ errorMessage }}
          </div>
          <form class="needs-validation" novalidate>
              <div class="mb-3">
                  <label for="parentName" class="form-label">Parent Name:</label>
                  <input type="text" id="parentName" v-model="formData.parentName" @input="validateParentName" class="form-control" required>
                  <small class="text-danger" v-if="errors.parentName">{{ errors.parentName }}</small>
              </div>
              <div class="mb-3">
                  <label for="address" class="form-label">Address:</label>
                  <input type="text" id="address" v-model="formData.address" class="form-control" required>
              </div>
              <div class="mb-3">
                  <label for="visitingDate" class="form-label">Visiting Date:</label>
                  <input type="date" id="visitingDate" v-model="formData.visitingDate" @input="validateVisitingDate" class="form-control" required>
                  <small class="text-danger" v-if="errors.visitingDate">{{ errors.visitingDate }}</small>
              </div>
              <div class="mb-3">
                  <label for="childName" class="form-label">Child Name:</label>
                  <input type="text" id="childName" v-model="formData.childName" @input="validateChildName" class="form-control" required>
                  <small class="text-danger" v-if="errors.childName">{{ errors.childName }}</small>
              </div>
              <div class="mb-3">
                  <label for="courseEnrolled" class="form-label">Course Enrolled:</label>
                  <select id="courseEnrolled" v-model="formData.courseEnrolled" class="form-select" required>
                      <option value="" disabled>Select a course</option>
                      <option v-for="course in courses" :key="course.id" :value="course.course_name">{{ course.course_name }}</option>
                  </select>
              </div>
              <div class="mb-3">
                  <label for="parentContact" class="form-label">Parent Contact:</label>
                  <input type="text" id="parentContact" v-model="formData.parentContact" @input="validateParentContact" class="form-control" required>
                  <small class="text-danger" v-if="errors.parentContact">{{ errors.parentContact }}</small>
              </div>
              <button type="submit" class="btn btn-primary w-100" @click="submitForm" :disabled="isFormInvalid">Submit</button>
          </form>
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
      courses: [], // Array to store courses fetched from the API
      entries: [],
      errors: {
        parentName: '',
        childName: '',
        parentContact: '',
        visitingDate: '',
      },
      errorMessage: '', // To store the error message for display
    };
  },
  computed: {
    isFormInvalid() {
      // Check if any validation errors exist or if required fields are empty
      return (
        this.errors.parentName ||
        this.errors.childName ||
        this.errors.parentContact ||
        this.errors.visitingDate ||
        !this.formData.parentName ||
        !this.formData.childName ||
        !this.formData.parentContact ||
        !this.formData.address ||
        !this.formData.visitingDate ||
        !this.formData.courseEnrolled
      );
    }
  },
  methods: {
    validateParentName() {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!this.formData.parentName) {
        this.errors.parentName = 'Parent Name is required.';
      } else if (!nameRegex.test(this.formData.parentName)) {
        this.errors.parentName = 'Parent Name must contain only letters and spaces.';
      } else {
        this.errors.parentName = '';
      }
    },
    validateChildName() {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!this.formData.childName) {
        this.errors.childName = 'Child Name is required.';
      } else if (!nameRegex.test(this.formData.childName)) {
        this.errors.childName = 'Child Name must contain only letters and spaces.';
      } else {
        this.errors.childName = '';
      }
    },
    validateParentContact() {
      const contactRegex = /^[0-9]{10}$/;
      if (!this.formData.parentContact) {
        this.errors.parentContact = 'Parent Contact is required.';
      } else if (!contactRegex.test(this.formData.parentContact)) {
        this.errors.parentContact = 'Parent Contact must be a 10-digit number.';
      } else {
        this.errors.parentContact = '';
      }
    },
    validateVisitingDate() {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      if (!this.formData.visitingDate) {
        this.errors.visitingDate = 'Visiting Date is required.';
      } else if (this.formData.visitingDate < today) {
        this.errors.visitingDate = 'Visiting Date cannot be in the past.';
      } else {
        this.errors.visitingDate = '';
      }
    },
    async fetchCourses() {
      const url = window.location.origin + "/api/get_courses";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          let data = await response.json();
          console.error('Failed to fetch courses:', data.message);
        } else {
          this.courses = await response.json(); // Assuming the API returns an array of courses
          console.log('Courses fetched successfully:', this.courses);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
    async submitForm() {
      this.validateParentName();
      this.validateChildName();
      this.validateParentContact();
      this.validateVisitingDate();
      if (this.isFormInvalid) {
        console.error('Form contains errors. Please fix them before submitting.');
        return;
      }
      let newEntry = { ...this.formData }; // Create a new entry object from form data
      newEntry.id = Math.floor(Math.random() * 1000000); // Generate a random ID for the new entry
      const url = window.location.origin;
      const response = await fetch(url + "/api/entry", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
      });
      if (!response.ok) {
        let data = await response.json();

        if (data.message === "Entry already exists") {
          this.errorMessage = "Entry already exists. Please use a different contact number.";
        } else {
          console.error('Failed to send data to API:', data.message);
        }
      } else {
        console.log('Data sent to API successfully');
        this.errorMessage = ''; // Clear any previous error message
        this.formData = {
          parentName: '',
          address: '',
          visitingDate: '',
          childName: '',
          courseEnrolled: '',
          parentContact: '',
        };
      }
    },
  },
  mounted() {
    this.fetchCourses(); // Fetch courses when the component is mounted
  },
};

export default Home;
