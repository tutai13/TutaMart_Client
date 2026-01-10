<template>
  <div class="container-fluid py-3 px-3 px-lg-4" style="font-size: 0.875rem">
    <!-- Page Title & Actions -->
    <div class="row g-3 mb-4 align-items-center">
      <div class="col-12 col-lg-7">
        <h3 class="fw-bold mb-1">Order History</h3>
        <p class="text-muted small mb-0">
          Quản lý và theo dõi tất cả đơn hàng, thanh toán và trạng thái hoàn
          thành.
        </p>
      </div>
      <div class="col-12 col-lg-5 text-lg-end">
        <div class="d-flex gap-2 justify-content-lg-end">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-file-earmark-arrow-down me-1"></i> Export
          </button>
          <button class="btn btn-success btn-sm fw-bold">
            <i class="bi bi-plus-lg me-1"></i> Tạo đơn mới
          </button>
        </div>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-3">
        <div class="row g-3 align-items-center">
          <!-- Search -->
          <div class="col-12 col-md-4 col-lg-3">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control border-start-0 ps-0 small"
                placeholder="Tìm theo ID đơn hoặc tên khách"
                @keyup.enter="fetchOrders(1)"
              />
            </div>
          </div>

          <!-- Date Range -->
          <div class="col-12 col-md-5 col-lg-4">
            <div class="row g-2">
              <div class="col-6">
                <input
                  v-model="dateFrom"
                  type="date"
                  class="form-control form-control-sm small"
                  :max="dateTo || maxDate"
                />
              </div>
              <div class="col-6">
                <input
                  v-model="dateTo"
                  type="date"
                  class="form-control form-control-sm small"
                  :min="dateFrom"
                  :max="maxDate"
                />
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="col-12 col-md-3 col-lg-5 text-md-end">
            <div class="d-flex gap-2 justify-content-md-end flex-wrap">
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="resetFilters"
              >
                <i class="bi bi-arrow-counterclockwise me-1"></i> Reset
              </button>
              <button class="btn btn-primary btn-sm" @click="fetchOrders(1)">
                <i class="bi bi-filter me-1"></i> Lọc
              </button>
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="fetchOrders(1)"
              >
                <i class="bi bi-arrow-repeat me-1"></i> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card border-0 shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover mb-0 align-middle small">
          <thead class="bg-light">
            <tr>
              <th class="text-uppercase text-muted small ps-4">Order ID</th>
              <th class="text-uppercase text-muted small">Ngày & Giờ</th>
              <th class="text-uppercase text-muted small">Khách hàng</th>
              <th class="text-uppercase text-muted small text-end">
                Tổng tiền
              </th>
              <th class="text-uppercase text-muted small">Thanh toán</th>
              <th class="text-uppercase text-muted small text-center">
                Số món
              </th>
              <th class="text-uppercase text-muted small text-center">
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.orderId"
              class="hover-bg-light"
            >
              <td class="ps-4 py-3 fw-bold">#{{ order.orderId }}</td>
              <td class="py-3">
                <div>{{ formatDate(order.orderDate) }}</div>
                <small class="text-muted">{{
                  formatTime(order.orderDate)
                }}</small>
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center gap-2">
                  <div
                    class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center text-xs fw-bold"
                    style="width: 32px; height: 32px"
                  >
                    {{ getInitials(order.customerName) }}
                  </div>
                  <span>{{ order.customerName || "Khách vãng lai" }}</span>
                </div>
              </td>
              <td class="py-3 text-end fw-bold">
                {{ formatCurrency(order.totalAmount) }}
              </td>
              <td class="py-3">
                <span
                  class="badge rounded-pill px-3 py-2 fw-medium"
                  :class="getPaymentBadgeClass(order.paymentMethod)"
                >
                  {{ order.paymentMethod || "—" }}
                </span>
              </td>
              <td class="py-3 text-center fw-medium">
                {{ order.totalItems }}
              </td>
              <td class="py-3 text-center">
                <router-link
                  :to="{ name: 'OrderDetail', params: { id: order.orderId } }"
                  class="btn btn-link text-primary small fw-medium p-0"
                >
                  View <i class="bi bi-arrow-right ms-1"></i>
                </router-link>
              </td>
            </tr>

            <tr v-if="loading">
              <td colspan="7" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Đang tải...</span>
                </div>
              </td>
            </tr>

            <tr v-else-if="orders.length === 0">
              <td colspan="7" class="text-center py-5 text-muted">
                Không tìm thấy đơn hàng nào
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="card-footer bg-transparent border-top d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 px-4 gap-3"
      >
        <small class="text-muted">
          Hiển thị <strong>{{ pagination.from }}</strong> đến
          <strong>{{ pagination.to }}</strong> trong tổng số
          <strong>{{ pagination.totalRecords }}</strong> đơn hàng
        </small>

        <nav aria-label="Page navigation" v-if="pagination.totalPages > 1">
          <ul class="pagination pagination-sm mb-0">
            <li
              class="page-item"
              :class="{ disabled: pagination.currentPage === 1 }"
            >
              <button class="page-link" @click="fetchOrders(1)">Đầu</button>
            </li>
            <li
              class="page-item"
              :class="{ disabled: pagination.currentPage === 1 }"
            >
              <button
                class="page-link"
                @click="fetchOrders(pagination.currentPage - 1)"
              >
                <i class="bi bi-chevron-left"></i>
              </button>
            </li>

            <li
              v-for="n in Math.min(pagination.totalPages, 7)"
              :key="n"
              class="page-item"
              :class="{
                active: n === pagination.currentPage,
                'd-none':
                  n > 3 &&
                  n < pagination.totalPages - 3 &&
                  pagination.totalPages > 7,
              }"
            >
              <button
                v-if="
                  n <= 3 ||
                  n >= pagination.totalPages - 3 ||
                  pagination.totalPages <= 7
                "
                class="page-link"
                @click="fetchOrders(n)"
              >
                {{ n }}
              </button>
            </li>

            <li
              class="page-item"
              :class="{
                disabled: pagination.currentPage === pagination.totalPages,
              }"
            >
              <button
                class="page-link"
                @click="fetchOrders(pagination.currentPage + 1)"
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const orders = ref([]);
const loading = ref(false);
const searchQuery = ref("");
const dateFrom = ref("");
const dateTo = ref("");

const maxDate = computed(() => new Date().toISOString().split("T")[0]); // hôm nay

const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  totalRecords: 0,
  totalPages: 1,
  from: 1,
  to: 5,
});

const API_BASE = "https://localhost:7189/api"; // thay đổi khi deploy

async function fetchOrders(page = 1) {
  try {
    loading.value = true;
    pagination.value.currentPage = page;

    const params = {
      page,
      pageSize: pagination.value.pageSize,
    };

    // Chỉ gửi khi có giá trị
    if (dateFrom.value)
      params.fromDate = new Date(dateFrom.value).toISOString();
    if (dateTo.value) params.toDate = new Date(dateTo.value).toISOString();

    // Search (nếu backend sau này hỗ trợ thì mở)
    // if (searchQuery.value.trim()) params.search = searchQuery.value.trim()

    const response = await axios.get(`${API_BASE}/Orders`, { params });

    const {
      data,
      page: curPage,
      pageSize,
      totalRecords,
      totalPages,
    } = response.data;

    orders.value = data;
    pagination.value = {
      currentPage: curPage,
      pageSize,
      totalRecords,
      totalPages,
      from: totalRecords === 0 ? 0 : (curPage - 1) * pageSize + 1,
      to: Math.min(curPage * pageSize, totalRecords),
    };
  } catch (error) {
    console.error("Lỗi tải danh sách đơn hàng:", error);
    alert("Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.");
  } finally {
    loading.value = false;
  }
}

function resetFilters() {
  searchQuery.value = "";
  dateFrom.value = "";
  dateTo.value = "";
  fetchOrders(1);
}

// Helpers
const formatDate = (iso) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

const getInitials = (name) => {
  if (!name?.trim()) return "??";
  const parts = name.trim().split(/\s+/);
  return (
    parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")
  ).toUpperCase();
};

const getPaymentBadgeClass = (method) => {
  if (!method) return "bg-secondary bg-opacity-10 text-secondary";
  const m = method.toLowerCase();
  if (
    m.includes("qr") ||
    m.includes("vnpay") ||
    m.includes("momo") ||
    m.includes("bank")
  ) {
    return "bg-info bg-opacity-10 text-info";
  }
  if (m.includes("cash") || m.includes("tiền mặt")) {
    return "bg-success bg-opacity-10 text-success";
  }
  return "bg-primary bg-opacity-10 text-primary";
};

onMounted(() => {
  fetchOrders(1);
});
</script>

<style scoped>
.hover-bg-light:hover {
  background-color: rgba(0, 123, 255, 0.04);
}
.card {
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}
.badge.rounded-pill {
  font-size: 0.8rem;
}
</style>
