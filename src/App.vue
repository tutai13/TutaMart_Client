<!-- src/App.vue -->
<template>
  <div
    class="d-flex flex-column vh-100 bg-light text-dark"
    style="font-size: 0.875rem"
  >
    <!-- Header chung -->
    <header
      class="bg-white shadow-sm border-bottom py-2 px-3 d-flex align-items-center justify-content-between flex-shrink-0"
    >
      <div class="d-flex align-items-center gap-2">
        <div class="bg-success bg-opacity-10 text-success rounded-2 p-1">
          <i class="bi bi-storefront fs-5"></i>
        </div>
        <div>
          <h5 class="mb-0 fw-bold">Tutamart POS</h5>
        </div>
      </div>

      <div class="d-flex align-items-center gap-3">
        <div
          class="d-none d-md-flex align-items-center bg-secondary bg-opacity-10 px-2 py-1 rounded-pill small fw-medium"
        >
          <i class="bi bi-calendar3 me-1"></i>
          {{ currentDate }} • {{ currentTime }}
        </div>

        <div
          class="d-flex align-items-center gap-2 border-start ps-3 border-secondary"
        >
          <div class="text-end d-none d-sm-block">
            <div class="fw-bold small">Alex Morgan</div>
            <small class="text-muted">ID: 8821</small>
          </div>
          <img
            :src="cashierAvatar"
            class="rounded-circle border border-white shadow-sm"
            width="32"
            height="32"
            alt="Cashier"
          />
        </div>
      </div>
    </header>

    <div class="d-flex flex-grow-1 overflow-hidden">
      <!-- Sidebar trái chung -->
      <nav
        class="d-none d-md-flex flex-column align-items-center py-3 bg-white border-end"
        style="width: 70px"
      >
        <router-link
          to="/"
          class="nav-link p-2 text-muted"
          active-class="text-success bg-success bg-opacity-10 rounded-2 shadow-sm"
        >
          <i class="bi bi-grid-3x3-gap fs-5"></i>
        </router-link>
        <router-link
          to="/Cashier"
          class="nav-link p-2 text-muted"
          active-class="text-success bg-success bg-opacity-10 rounded-2 shadow-sm"
        >
          <i class="bi bi-cart4 fs-5"></i>
        </router-link>
        <router-link
          to="/Inventory"
          class="nav-link p-2 text-muted"
          active-class="text-success bg-success bg-opacity-10 rounded-2 shadow-sm"
        >
          <i class="bi bi-box-seam fs-5"></i>
        </router-link>
        <router-link
          to="/OrderList"
          class="nav-link p-2 text-muted"
          active-class="text-success bg-success bg-opacity-10 rounded-2 shadow-sm"
        >
          <i class="bi bi-receipt fs-5"></i>
        </router-link>
        <router-link
          to="/OrderList1"
          class="nav-link p-2 text-muted"
          active-class="text-success bg-success bg-opacity-10 rounded-2 shadow-sm"
        >
          <i class="bi bi-bar-chart-line fs-5"></i>
        </router-link>
        <router-link
          to="/staff"
          class="nav-link p-2 text-muted"
          active-class="text-success bg-success bg-opacity-10 rounded-2 shadow-sm"
        >
          <i class="bi bi-people fs-5"></i>
        </router-link>
        <hr class="w-50 my-2 border-secondary" />
        <router-link
          to="/settings"
          class="nav-link p-2 text-muted mt-auto"
          active-class="text-success bg-success bg-opacity-10 rounded-2 shadow-sm"
        >
          <i class="bi bi-gear fs-5"></i>
        </router-link>
        <router-link to="/logout" class="nav-link p-2 text-danger">
          <i class="bi bi-box-arrow-right fs-5"></i>
        </router-link>
      </nav>

      <!-- Nội dung chính của từng trang -->
      <main class="flex-grow-1 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const cashierAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCpxMrRKW-izah0TzO2jLqmVXaJkl-DUpbzTIl8_F52YdfsTUeEdBm9IBGi2dfPbacTznh0lxyDfEP1j-P8CQHm4vB5CARJnbdiZm1cyDvhI7cA-bjUK_AOGVu-aPgTokCl8kqs_Xlydz3YlwxcYLaWXQdz2rQWbzdutiUXMKdvTKHOMrb-2agPeHx-MRweAltJdf67o4oM41c7halpG7mw3vrJyPPA4oKWkJWdGUradsYKAiJaPPbwnZKaSkhrTZ8nkte9pI5z7LRh";

const currentDate = ref("");
const currentTime = ref("");
let interval = null;

const updateTime = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  currentTime.value = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  updateTime();
  interval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.router-link-active {
  @apply text-success bg-success bg-opacity-10 rounded-2 shadow-sm;
}
</style>
