<template>
  <div class="profile-container">
    <el-avatar :size="100" src="https://avatars.githubusercontent.com/u/86759249?v=4" class="profile-avatar" />
    <p class="profile-name">shimauma0312</p>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
}
</script>

<style scoped>
.profile-container {
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.profile-avatar {
  border: 3px solid var(--secondary-orange);
}

.profile-container:hover {
  transform: translateY(-5px);
}

.profile-name {
  margin-top: 15px;
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-orange);
}
</style>
