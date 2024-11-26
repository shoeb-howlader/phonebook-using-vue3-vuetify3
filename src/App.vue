<template>
  <v-app class="bg-gray-50">
    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.visible" :color="snackbar.color" top>
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.visible = false">Close</v-btn>
      </template>
    </v-snackbar>

    <!-- Delete Confirmation Dialog -->
<v-dialog v-model="confirmDeleteDialog" width="400">
  <v-card>
    <v-card-title class="text-h5">Confirm Deletion</v-card-title>
    <v-card-text>
      Are you sure you want to delete "{{ confirmDeleteContact.name }}"?
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="confirmDeleteDialog = false" color="grey">Cancel</v-btn>
      <v-btn @click="confirmDeletion" color="red">Delete</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

    <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <!-- App Bar -->
    <v-app-bar 
     image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      dark
      prominent
    >
    

      <template v-slot:prepend>
        <v-icon class="mr-3">mdi-phone-book</v-icon>
      </template>
      <v-app-bar-title class="text-white font-bold">
        <v-avatar color="white" :image="require('@/assets/logo.png')" size="60"></v-avatar>
        KDA Phonebook
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn 
        @click="toggleAdminView" 
        variant="outlined" 
        color="white"
        class="transition-all hover:bg-white hover:text-blue-600"
      >
        {{ isAdmin ? 'Logout Admin' : 'Admin Login' }}
      </v-btn>
    </v-app-bar>

    <v-main class="p-4">
      <v-container >
        <!-- Search Card -->
        <!--v-card 
          class="mb-6 shadow-lg"
          elevation="3"
        >
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search contacts by name, phone, designation or mobile"
              prepend-icon="mdi-magnify"
              variant="underlined"
              color="primary"
              clearable
              class="rounded-lg"
            ></v-text-field>
          </v-card-text>
        </!--v-card>

        <!--- --->
<div class="mb-6 shadow-lg"> 
    <v-card
    class="mx-auto"
    color="surface-light"
     elevation="16"
  >
    <v-card-text>
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
         v-model="search"
        density="default"
        label="Search contacts by name, phone, designation"
        variant="solo"
        color="primary"
        hide-details
       
        
      ></v-text-field>
    </v-card-text>
  </v-card>
</div>
       

        <!-- Admin Controls -->
        <div v-if="isAdmin" class="mb-6">
          <v-btn 
            color="primary" 
            size="large"
            variant="elevated"
            @click="openAddDialog"
            class="shadow-md hover:shadow-xl transition-all"
          >
            <v-icon start>mdi-plus-circle</v-icon>
            Add New Contact
          </v-btn>
        </div>

        <!-- Login Dialog -->
        <v-dialog v-model="loginDialog" width="400">
          <v-card class="rounded-xl">
            <v-card-title class="bg-blue-50 py-4 text-center">
              Admin Login
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="loginCredentials.username"
                label="Username"
                prepend-icon="mdi-account"
                required
              ></v-text-field>
              <v-text-field
                v-model="loginCredentials.password"
                label="Password"
                type="password"
                prepend-icon="mdi-lock"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center pb-4">
              <v-btn 
                @click="login" 
                color="primary" 
                variant="elevated"
                class="mr-2"
              >
                Login
              </v-btn>
              <v-btn 
                @click="loginDialog = false" 
                color="error" 
                variant="outlined"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Add/Edit Contact Dialog -->
        <v-dialog v-model="dialogVisible" width="500">
          <v-card class="rounded-xl">
            <v-card-title class="text-h5 bg-blue-50 py-4">
              {{ editedId ? 'Edit Contact' : 'New Contact' }}
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.name"
                      label="Name*"
                      prepend-icon="mdi-account"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.designation"
                      label="Designation*"
                      prepend-icon="mdi-briefcase"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.position"
                      label="Position*"
                      prepend-icon="mdi-badge-account"
                      required
                      :rules="nameRules"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.phone"
                      label="Phone*"
                      prepend-icon="mdi-phone"
                      
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="formData.mobile"
                      label="Mobile*"
                      prepend-icon="mdi-cellphone"
                      
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-file-input
                      v-model="imageFile"
                      accept="image/*"
                      label="Contact Image"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                color="grey-darken-1" 
                variant="text" 
                @click="closeDialog"
              >
                Cancel
              </v-btn>
              <v-btn 
                color="primary" 
                variant="elevated" 
                @click="saveContact"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

       <!-- Enhanced Contact List -->
        <v-row>
          <v-col
            v-for="contact in filteredContacts"
            :key="contact._id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="d-flex"
          >
            <v-card 
              class="flex-grow-1 transition-all hover:shadow-2xl rounded-xl overflow-hidden mx-auto"
              elevation="24"
              hover
              max-width="400"
            >
              <div class="card-content-wrapper">
                <!-- Image Container -->
                <div class="image-container">
                  <v-img
                    :src="contact.image ? `${apiUrl}/${contact.image.replace(/^\//, '')}` : 'https://fakeimg.pl/150x150?text=No+image+uploaded&font_size=20'"
                    class="contact-image"
                    max-height="300"
                    :aspect-ratio="4/4"
                    contain
                    position="center center"
                    :class="{'default-bg': !contact.image}"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </div>

                <!-- Name and Designation Section -->
<v-card-item class="name-section bg-primary py-2">
  <v-card-title class="text-center text-white pa-0 text-h6 font-weight-bold name-title">
    {{ contact.name }}
  </v-card-title>
  <v-card-subtitle class="text-center text-white-darken-1 mt-1 pb-0 designation-subtitle">
    {{ contact.designation }}
  </v-card-subtitle>
</v-card-item>

                <!-- Contact Details Section -->
                <v-card-text class="contact-details pa-4">
                  <div class="contact-info-grid">
                    <div class="info-item d-flex align-center">
                      <v-icon color="primary" size="20" class="mr-3">mdi-phone</v-icon>
                      <div class="info-content">
                        <span class="text-caption text-grey">Phone</span>
                        <span class="text-body-1">{{ contact.phone }}</span>
                      </div>
                    </div>
                    
                    <div class="info-item d-flex align-center">
                      <v-icon color="primary" size="20" class="mr-3">mdi-cellphone</v-icon>
                      <div class="info-content">
                        <span class="text-caption text-grey">Mobile</span>
                        <span class="text-body-1">{{ contact.mobile }}</span>
                      </div>
                    </div>

                    
                  </div>
                </v-card-text>

                <!-- Admin Actions -->
                <v-divider></v-divider>
                <v-card-actions v-if="isAdmin" class="admin-actions pa-2 bg-grey-lighten-4">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    variant="text"
                    density="comfortable"
                    @click="openEditDialog(contact)"
                    class="text-capitalize"
                    prepend-icon="mdi-pencil"
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    color="error"
                    variant="text"
                    density="comfortable"
                    @click="deleteContact(contact)"
                    class="text-capitalize"
                    prepend-icon="mdi-delete"
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <h-spacer></h-spacer>
      </v-container>
         

    </v-main>

    <!-- Loading Overlay -->
    <v-overlay :model-value="loading" class="align-center justify-center">
      <v-progress-circular
        size="80"
        width="6"
        color="primary"
        indeterminate
        class="animate-pulse"
      ></v-progress-circular>
    </v-overlay>
    </v-parallax>
    <!-- Footer outside of v-parallax to ensure it's always at the bottom -->
    <v-footer 
      class="bg-blue-50 py-4 text-center"
      elevation="3"
    >
      <v-container class="text-center">
        <div class="text-subtitle-2 text-grey-darken-1">
          Designed and developed with ❤️ by 
          <span class="font-weight-bold text-primary">Md Shoeb Howlader</span>
        </div>
      </v-container>
    </v-footer>
  </v-app>
  
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// State
const contacts = ref([]);
const search = ref('');
const isAdmin = ref(false);
const loginDialog = ref(false);
const dialogVisible = ref(false);
const loading = ref(false);
const imageFile = ref(null);
const editedId = ref(null);
const apiUrl=process.env.VUE_APP_API_URL || 'http://localhost:3001';
// State for confirmation dialog
const confirmDeleteDialog = ref(false);
const confirmDeleteContact = ref(null);

// Snackbar state
const snackbar = ref({
  visible: false,
  message: '',
  color: 'success',
});


// Function to show snackbar
const showSnackbar = (message, color = 'success') => {
  snackbar.value.message = message;
  snackbar.value.color = color;
  snackbar.value.visible = true;
};

const loginCredentials = ref({
  username: '',
  password: ''
});

const formData = ref({
  name: '',
  phone: '',
  position: '',
  mobile: '',
  designation:'', 
});

// Validation rules
const nameRules = [
  v => !!v || 'Name is required',
  v => v.length <= 50 || 'Name must be less than 50 characters'
];

const phoneRules = [
  v => !!v || 'Phone number is required',
  v => /^\d{3}$/.test(v) || 'Phone number must be 3 digits'
];
const mobileRules = [
  v => !!v || 'Mobile number is required',
  v => /^\d{11}$/.test(v) || 'Mobile number must be 11 digits'
];


// Axios Interceptor Setup
const setupAxiosInterceptors = () => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    isAdmin.value = true;
  }
};

// Login Method
const login = async () => {
  try {
    const response = await axios.post(`${apiUrl}/api/login`, loginCredentials.value);
    localStorage.setItem('adminToken', response.data.token);
    setupAxiosInterceptors();
    loginDialog.value = false;
    showSnackbar('Login successful!', 'success');
  } catch (error) {
    showSnackbar('Login failed', 'error');
  }
};

// Logout Method
const logout = () => {
  localStorage.removeItem('adminToken');
  delete axios.defaults.headers.common['Authorization'];
  isAdmin.value = false;
  showSnackbar('Logout successful!', 'success');
};

// Toggle Admin View
const toggleAdminView = () => {
  if (!isAdmin.value) {
    loginDialog.value = true;
  } else {
    logout();
  }
};

// Computed properties
const filteredContacts = computed(() => {
  return contacts.value
    .filter(contact =>
      contact.name.toLowerCase().includes(search.value.toLowerCase()) ||
       contact.designation.toLowerCase().includes(search.value.toLowerCase()) ||
      contact.phone.includes(search.value) 
    )
    .sort((a, b) => {
      const positionA = parseInt(a.position) || Number.MAX_SAFE_INTEGER;
      const positionB = parseInt(b.position) || Number.MAX_SAFE_INTEGER;
      
      return positionA - positionB;
    });
});

// Fetch Contacts
const fetchContacts = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`${apiUrl}/api/contacts`);
    contacts.value = response.data;
    //showSnackbar('Contacts fetched successfully!', 'success');
  } catch (error) {
    console.error('Error fetching contacts:', error);
    showSnackbar('Failed to fetch contacts', 'error');
  } finally {
    loading.value = false;
  }
};

// Add/Edit Contact Methods
const openAddDialog = () => {
  editedId.value = null;
  formData.value = {
    name: '',
    phone: '',
    position: '',
    mobile: '',
    designation:'', 
  };
  imageFile.value = null;
  dialogVisible.value = true;
};

const openEditDialog = (contact) => {
  editedId.value = contact._id;
  formData.value = {
    name: contact.name,
    phone: contact.phone,
    position: contact.position,
    mobile: contact.mobile,
    designation: contact.designation, 
  };
  imageFile.value = null;
  dialogVisible.value = true;
};

const closeDialog = () => {
  dialogVisible.value = false;
  editedId.value = null;
  formData.value = {
    name: '',
    phone: '',
    position: '',
    mobile: '',
    designation:'', 
  };
  imageFile.value = null;
};

// saving contac
const saveContact = async () => {
  loading.value = true;

  const formDataToSend = new FormData();
  formDataToSend.append('name', formData.value.name);
  formDataToSend.append('phone', formData.value.phone);
  formDataToSend.append('mobile', formData.value.mobile);
  formDataToSend.append('position', formData.value.position);
  formDataToSend.append('designation', formData.value.designation);

  if (imageFile.value) {
    formDataToSend.append('image', imageFile.value);
  }

  try {
    if (editedId.value) {
      await axios.put(`${apiUrl}/api/contacts/${editedId.value}`, formDataToSend);
      showSnackbar('Contact updated successfully!', 'success');
    } else {
      await axios.post(`${apiUrl}/api/contacts`, formDataToSend);
      showSnackbar('Contact added successfully!', 'success');
    }

    await fetchContacts();
    closeDialog();
  } catch (error) {
    console.error('Error saving contact:', error);
    showSnackbar('Failed to save contact', 'error');
  } finally {
    loading.value = false;
  }
};


// Method to delete contact
const deleteContact = (contact) => {
  confirmDeleteContact.value = contact; // Store the contact to be deleted
  confirmDeleteDialog.value = true; // Show the confirmation dialog
};

// Confirm deletion
const confirmDeletion = async () => {
  loading.value = true;
  try {
    await axios.delete(`${apiUrl}/api/contacts/${confirmDeleteContact.value._id}`);
    await fetchContacts();
    showSnackbar('Contact deleted successfully!', 'success');
  } catch (error) {
    console.error('Error deleting contact:', error);
    showSnackbar('Failed to delete contact', 'error');
  } finally {
    confirmDeleteDialog.value = false; // Hide the confirmation dialog
    loading.value = false;
  }
};


// Initialize
onMounted(() => {
  setupAxiosInterceptors();
  fetchContacts();
});
</script>

<style scoped>
.transition-all {
  transition: all 0.3s ease;
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.v-dialog > .v-card {
  border-radius: 16px;
  padding: 20px;
}

.card-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.image-container {
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.contact-image {
  transition: transform 0.3s ease;
  width: 100%;
}

.default-bg {
  background-color: #f5f5f5;
}

.v-card:hover .contact-image {
  transform: scale(1.02);
}

.name-section {
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.contact-details {
  flex-grow: 1;
  background: linear-gradient(to bottom, #ffffff, #f8f9fa);
}

.contact-info-grid {
  display: grid;
  gap: 0.75rem;
}

.info-item {
  padding: 0.75rem;
  border-radius: 8px;
  background: rgba(0,0,0,0.02);
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(0,0,0,0.05);
  transform: translateX(4px);
}

.info-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.info-content .text-body-1 {
  line-height: 1.2;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .v-col {
    padding: 8px;
  }
}

@media (max-width: 599px) {
  .contact-info-grid {
    gap: 0.5rem;
  }
  
  .info-item {
    padding: 0.5rem;
  }
  
  .v-card-title {
    font-size: 1.1rem !important;
  }
}

/* Animation classes */
.transition-all {
  transition: all 0.3s ease;
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
}

/* Card hover effect */
.v-card {
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
}
.name-title, .designation-subtitle {
  overflow: visible;        /* Allow overflow to be visible */
  text-overflow: clip;     /* No ellipsis */
  white-space: normal;      /* Allow text to wrap */
  max-width: 100%;         /* Ensure it doesn't exceed the container */
  word-wrap: break-word;   /* Break long words if necessary */
}
@media (max-width: 600px) {
  .name-title, .designation-subtitle {
    font-size: 0.9rem; /* Adjust font size for smaller screens */
  }
}
</style>