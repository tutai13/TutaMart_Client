<template>
  <div class="container-fluid py-3 px-3 px-lg-4" style="font-size: 0.875rem">
    <!-- Loading & Error -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-success" role="status"></div>
      <p class="mt-3 text-muted">Đang tải thông tin đơn hàng...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>

    <template v-else>
      <!-- Back Button & Title -->
      <div class="mb-4">
        <button
          class="btn btn-link text-muted small p-0"
          @click="$router.back()"
        >
          <i class="bi bi-arrow-left me-1"></i> Back to Orders
        </button>

        <div class="d-flex justify-content-between align-items-center mt-2">
          <div class="d-flex align-items-center gap-3">
            <h3 class="fw-bold mb-0">Đơn hàng #{{ orderIdFormatted }}</h3>
          </div>

          <button class="btn btn-success fw-bold shadow">
            <i class="bi bi-printer me-1"></i> In hóa đơn
          </button>
        </div>
      </div>

      <!-- Order Summary & Customer Info -->
      <div class="row g-4 mb-4">
        <!-- Order Summary -->
        <div class="col-12 col-md-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h5 class="fw-bold mb-4 d-flex align-items-center gap-2">
                <i class="bi bi-receipt text-success"></i> Thông tin đơn hàng
              </h5>
              <div class="d-flex flex-column gap-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted small">Trạng thái</span>
                  <span
                    class="badge bg-success bg-opacity-10 text-success small"
                  >
                    <span
                      class="rounded-circle me-1"
                      style="
                        width: 8px;
                        height: 8px;
                        display: inline-block;
                        background: #198754;
                      "
                    ></span>
                    Đã thanh toán
                  </span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted small">Ngày đặt hàng</span>
                  <span class="fw-medium small">{{ formattedOrderDate }}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="text-muted small">Phương thức thanh toán</span>
                  <span class="fw-medium small">{{
                    order.paymentMethod || "—"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Information -->
        <div class="col-12 col-md-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <h5 class="fw-bold mb-4 d-flex align-items-center gap-2">
                <i class="bi bi-person text-success"></i> Thông tin khách hàng
              </h5>
              <div class="d-flex align-items-start gap-3">
                <div
                  class="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center fw-bold"
                  style="width: 48px; height: 48px; font-size: 1.1rem"
                >
                  {{ customerInitials }}
                </div>
                <div class="flex-grow-1">
                  <div class="fw-bold">
                    {{ order.customerName || "Khách vãng lai" }}
                  </div>
                  <small class="text-muted">{{
                    order.customerPhone || "Không có số điện thoại"
                  }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product List -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-transparent border-bottom">
          <h5 class="fw-bold mb-0 d-flex align-items-center gap-2">
            <i class="bi bi-cart text-success"></i> Danh sách sản phẩm
          </h5>
        </div>
        <div class="table-responsive">
          <table class="table table-hover mb-0 align-middle small">
            <thead class="bg-light">
              <tr>
                <th class="text-uppercase text-muted small">Sản phẩm</th>
                <th class="text-uppercase text-muted small">SKU</th>
                <th class="text-uppercase text-muted small text-center">
                  Số lượng
                </th>
                <th class="text-uppercase text-muted small text-end">
                  Đơn giá
                </th>
                <th class="text-uppercase text-muted small text-end">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in orderDetails" :key="item.orderDetailId">
                <td class="py-3">
                  <div class="d-flex align-items-center gap-3">
                    <img
                      :src="getImageUrl(item.product.imageUrl)"
                      class="rounded"
                      width="48"
                      height="48"
                      alt="product"
                      @error="handleImageError"
                    />
                    <div>
                      <div class="fw-bold">{{ item.product.productName }}</div>
                      <small class="text-muted">{{
                        item.product.category?.categoryName || "—"
                      }}</small>
                    </div>
                  </div>
                </td>
                <td class="py-3">
                  <code class="bg-light px-2 py-1 rounded">{{
                    item.product.sku
                  }}</code>
                </td>
                <td class="py-3 text-center fw-medium">{{ item.quantity }}</td>
                <td class="py-3 text-end">
                  {{ formatCurrency(item.unitPrice) }}
                </td>
                <td class="py-3 text-end fw-bold">
                  {{ formatCurrency(item.totalPrice) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Total Summary -->
      <div class="card border-0 shadow-sm">
        <div class="card-body">
          <div class="row justify-content-end">
            <div class="col-12 col-md-6 col-lg-4">
              <div class="d-flex flex-column gap-2">
                <div class="d-flex justify-content-between small text-muted">
                  <span>Tổng tiền hàng</span>
                  <span class="fw-medium">{{
                    formatCurrency(order.subtotal)
                  }}</span>
                </div>
                <div class="d-flex justify-content-between small text-muted">
                  <span>Thuế (VAT)</span>
                  <span class="fw-medium">{{ formatCurrency(order.tax) }}</span>
                </div>
                <div class="d-flex justify-content-between small text-danger">
                  <span>Giảm giá</span>
                  <span>-{{ formatCurrency(order.discountAmount) }}</span>
                </div>
                <hr class="my-2" />
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold">Tổng cộng</span>
                  <h4 class="fw-black mb-0 text-success">
                    {{ formatCurrency(order.totalAmount) }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const order = ref({});

const orderId = computed(() => route.params.id || 4); // fallback 4 khi test
const orderIdFormatted = computed(
  () => `ORD-${orderId.value.toString().padStart(4, "0")}`
);

const formattedOrderDate = computed(() => {
  if (!order.value.orderDate) return "—";
  return new Date(order.value.orderDate).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

const customerInitials = computed(() => {
  if (!order.value.customerName) return "??";
  const names = order.value.customerName.trim().split(" ");
  return (names[0]?.[0] || "") + (names[names.length - 1]?.[0] || "");
});

const orderDetails = computed(() => order.value.orderDetails || []);

// Format tiền Việt Nam (không thập phân nếu là số nguyên)
const formatCurrency = (value) => {
  if (value == null) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Xử lý đường dẫn ảnh (tùy backend của bạn)
const getImageUrl = (path) => {
  if (!path) return "https://placehold.co/48x48?text=No+Image";
  // Nếu backend trả về đường dẫn tương đối → thêm base URL
  if (path.startsWith("/")) {
    return `https://localhost:7189${path}`; // thay đổi nếu production
  }
  return path;
};

const handleImageError = (e) => {
  e.target.src = "https://placehold.co/48x48?text=Error";
};

const fetchOrder = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await axios.get(
      `https://localhost:7189/api/Orders/${orderId.value}`
    );
    order.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrder();
});
</script>

<style scoped>
.card {
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
