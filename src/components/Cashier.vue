<!-- src/views/POSCashier.vue -->
<template>
  <div class="d-flex h-100">
    <!-- Phần grid sản phẩm -->
    <div class="flex-grow-1 overflow-auto p-3">
      <!-- Search & Filter -->
      <div class="mb-3">
        <div class="d-flex gap-2 mb-2">
          <div class="position-relative flex-grow-1">
            <i
              class="bi bi-upc-scan position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            ></i>
            <input
              type="text"
              class="form-control ps-5 py-2 rounded-3 shadow-sm small"
              placeholder="Scan hoặc tìm sản phẩm (⌘K)..."
            />
            <small
              class="position-absolute top-50 end-0 translate-middle-y me-3 badge bg-light text-muted border small"
              >⌘K</small
            >
          </div>
          <button class="btn btn-outline-secondary px-3">
            <i class="bi bi-funnel"></i>
          </button>
        </div>

        <div class="d-flex gap-2 overflow-x-auto pb-1">
          <!-- Nút All Items - luôn hiển thị đầu tiên -->
          <button
            class="btn px-3 py-1 small fw-bold"
            :class="{
              'btn-dark': selectedCategory === 'All Items',
              'btn-outline-secondary': selectedCategory !== 'All Items',
            }"
            @click="selectCategory('All Items')"
          >
            All Items
          </button>

          <!-- Các category lấy từ API -->
          <button
            v-for="cat in categories"
            :key="cat"
            class="btn px-3 py-1 small"
            :class="{
              'btn-dark fw-bold': selectedCategory === cat,
              'btn-outline-secondary': selectedCategory !== cat,
            }"
            @click="selectCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="row g-2">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-6 col-md-4 col-lg-3 col-xl-2"
        >
          <div
            class="card h-100 border-0 shadow-sm hover-shadow transition-all cursor-pointer"
            @click="addToCart(product)"
          >
            <div class="position-relative">
              <img
                :src="product.image"
                class="card-img-top rounded-top"
                style="height: 120px; object-fit: cover"
                :alt="product.name"
              />
              <span
                class="position-absolute top-0 end-0 m-1 badge bg-dark bg-opacity-75 small"
                >{{ product.stock }}</span
              >
              <span
                v-if="product.discount"
                class="position-absolute top-0 start-0 m-1 badge bg-warning text-dark small"
                >-{{ product.discount }}%</span
              >
            </div>
            <div class="card-body p-2 d-flex flex-column">
              <h6 class="card-title fw-bold mb-1 small line-clamp-2">
                {{ product.name }}
              </h6>
              <small class="text-muted mb-1">{{ product.category }}</small>
              <div
                class="mt-auto d-flex justify-content-between align-items-center"
              >
                <div class="fw-bold text-success">{{ product.price }}</div>
                <button
                  class="btn btn-outline-dark rounded-circle p-1"
                  style="width: 28px; height: 28px"
                >
                  <i class="bi bi-plus-lg small"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Giỏ hàng bên phải -->
    <aside
      class="bg-white border-start shadow d-flex flex-column"
      style="width: 360px"
    >
      <!-- Customer Info -->
      <div class="p-3 border-bottom">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <small class="text-uppercase fw-bold text-muted">Khách hàng</small>
          <button class="btn btn-link text-success small p-0">
            <i class="bi bi-person-plus"></i> Thêm
          </button>
        </div>
        <div class="d-flex align-items-center gap-2 bg-light rounded-3 p-2">
          <div
            class="bg-warning bg-opacity-20 text-warning rounded-circle d-flex align-items-center justify-content-center fw-bold small"
            style="width: 36px; height: 36px"
          >
            JD
          </div>
          <div class="flex-grow-1">
            <div class="fw-bold small">Jane Doe</div>
            <small class="text-muted">Thành viên từ 2021</small>
          </div>
          <div
            class="badge bg-warning bg-opacity-10 text-warning small px-2 py-1"
          >
            <i class="bi bi-stars me-1"></i> 450 Pts
          </div>
        </div>
      </div>

      <!-- Cart Items -->
      <div class="flex-grow-1 overflow-auto p-3">
        <div class="small text-muted d-flex mb-1 px-1">
          <div class="flex-grow-1">Sản phẩm</div>
          <div class="text-center" style="width: 70px">SL</div>
          <div class="text-end" style="width: 60px">Giá</div>
        </div>

        <div
          v-for="item in cartItems"
          :key="item.id"
          class="d-flex align-items-center gap-2 p-2 rounded hover-bg-light transition-all small"
        >
          <img
            :src="item.thumb"
            class="rounded"
            width="40"
            height="40"
            alt=""
          />
          <div class="flex-grow-1 text-truncate-container">
            <!-- Tên sản phẩm: cắt ngắn + tooltip khi hover -->
            <div class="fw-bold small text-truncate-line" :title="item.name">
              {{ item.name }}
            </div>
            <small class="text-muted">{{ item.unitPrice }} / cái</small>
          </div>
          <div class="input-group input-group-sm" style="width: 80px">
            <button
              class="btn btn-outline-secondary btn-sm"
              @click.stop="updateQty(item, item.qty - 1)"
            >
              −
            </button>
            <input
              type="text"
              class="form-control text-center fw-bold small"
              :value="item.qty"
              min="1"
              style="width: 27px"
              @input="updateQtyFromInput(item, $event.target.value)"
              @keyup.enter="$event.target.blur()"
              @blur="updateQtyFromInput(item, $event.target.value)"
            />
            <button
              class="btn btn-outline-secondary btn-sm"
              @click.stop="updateQty(item, item.qty + 1)"
            >
              +
            </button>
          </div>
          <div class="fw-bold text-end small" style="width: 60px">
            {{ item.total }}
          </div>
          <button
            class="btn btn-link text-danger p-0 small"
            @click.stop="removeItem(item)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>

      <!-- Checkout -->
      <div class="border-top bg-white p-3">
        <div class="mb-2">
          <div class="d-flex justify-content-between small text-muted">
            <span>Tạm tính</span>
            <span class="fw-bold">{{ formatVND(subtotal) }}</span>
          </div>
          <div class="d-flex justify-content-between small text-muted">
            <span>Thuế ({{ formatPercent(taxRate) }})</span>
            <span class="fw-bold">{{ formatVND(tax) }}</span>
          </div>
          <div
            class="d-flex justify-content-between align-items-center small mt-2"
          >
            <div class="d-flex align-items-center gap-2">
              <button
                class="btn btn-link p-0 small text-warning"
                @click="showDiscountModal = true"
              >
                <i class="bi bi-tag"></i> Giảm giá
              </button>

              <!-- Hiển thị giảm giá đang áp dụng -->
              <span class="text-danger fw-bold" v-if="discountAmount > 0">
                -{{ formatVND(discountAmount) }}
              </span>
              <span class="text-muted" v-else>-0 ₫</span>
            </div>
          </div>
          <hr class="my-2" />
          <div class="d-flex justify-content-between align-items-end">
            <span class="fw-bold small">Tổng cộng</span>
            <h4 class="fw-black mb-0 text-success">
              {{ formatVND(finalTotal) }}
            </h4>
          </div>
        </div>

        <div class="mb-3">
          <small class="text-uppercase fw-bold text-muted d-block mb-2">
            Thanh toán
          </small>
          <div class="row g-2">
            <!-- TIỀN MẶT -->
            <div class="col-6">
              <input
                type="radio"
                class="btn-check"
                name="payment"
                id="pay-cash"
                value="cash"
                v-model="selectedPaymentMethod"
                autocomplete="off"
              />
              <label
                class="btn btn-outline-success w-100 py-3 small position-relative"
                for="pay-cash"
              >
                <i class="bi bi-cash fs-4 d-block mb-1"></i>
                <small>Tiền mặt</small>
              </label>
            </div>

            <!-- QR -->
            <div class="col-6">
              <input
                type="radio"
                class="btn-check"
                name="payment"
                id="pay-qr"
                value="qr"
                v-model="selectedPaymentMethod"
                autocomplete="off"
              />
              <label
                class="btn btn-outline-success w-100 py-3 small position-relative"
                for="pay-qr"
              >
                <i class="bi bi-qr-code-scan fs-4 d-block mb-1"></i>
                <small>QR Code</small>
              </label>
            </div>
          </div>
        </div>

        <!-- <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary flex-grow-1 py-2 small">
            <i class="bi bi-printer"></i> In hóa đơn
          </button>
          <button
            class="btn btn-success flex-grow-2 py-2 small fw-bold shadow"
            :disabled="cartItems.length === 0 || isProcessing"
            @click="completeOrder"
          >
            <span
              v-if="isProcessing"
              class="spinner-border spinner-border-sm me-2"
              role="status"
            ></span>
            Hoàn tất <i class="bi bi-check-circle ms-1"></i>
          </button>
        </div> -->
        <button
          class="btn btn-success w-100 py-3 fw-bold shadow-lg"
          :disabled="cartItems.length === 0 || isProcessing"
          @click="openPaymentModal"
        >
          <span
            v-if="isProcessing"
            class="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>
          {{ isProcessing ? "Đang xử lý..." : "Tiến hành thanh toán" }}
          <i class="bi bi-arrow-right ms-2"></i>
        </button>
      </div>
    </aside>

    <!-- ==================== MODAL THANH TOÁN TIỀN MẶT ==================== -->
    <div
      class="modal fade"
      :class="{ show: showCashModal }"
      :style="{ display: showCashModal ? 'block' : 'none' }"
      tabindex="-1"
      @click.self="showCashModal = false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">Thanh toán tiền mặt</h5>
            <button
              type="button"
              class="btn-close"
              @click="showCashModal = false"
            ></button>
          </div>
          <div class="modal-body pt-0">
            <div class="text-center mb-4">
              <h3 class="text-success fw-black">
                Tổng tiền: {{ formatVND(finalTotal) }}
              </h3>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-bold">Số tiền khách đưa</label>
              <input
                type="number"
                class="form-control form-control-lg text-center"
                v-model.number="cashReceived"
                placeholder="0"
                min="0"
                @input="calculateChange"
                ref="cashInput"
              />
            </div>

            <div class="alert alert-info text-center py-3" v-if="change >= 0">
              <h4 class="mb-0 fw-bold text-primary">
                Tiền thối: {{ formatVND(change) }}
              </h4>
            </div>
            <div class="alert alert-warning text-center py-3" v-else>
              <small>Chưa đủ tiền!</small>
            </div>
          </div>
          <div class="modal-footer border-0 flex-column gap-2">
            <button
              class="btn btn-outline-secondary w-100"
              @click="printReceipt"
              :disabled="change < 0"
            >
              <i class="bi bi-printer me-2"></i>In hóa đơn (sau khi hoàn tất)
            </button>
            <button
              class="btn btn-success w-100 py-3 fw-bold"
              @click="completeOrder"
              :disabled="change < 0 || isProcessing"
            >
              <span
                v-if="isProcessing"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Hoàn tất thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== MODAL THANH TOÁN QR ==================== -->
    <div
      class="modal fade"
      :class="{ show: showQRModal }"
      :style="{ display: showQRModal ? 'block' : 'none' }"
      tabindex="-1"
      @click.self="showQRModal = false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title fw-bold">Quét mã QR để thanh toán</h5>
            <button
              type="button"
              class="btn-close"
              @click="showQRModal = false"
            ></button>
          </div>
          <div class="modal-body text-center py-3">
            <h4 class="text-success mb-4">
              Tổng tiền: {{ formatVND(finalTotal) }}
            </h4>

            <!-- Mã QR giả (bạn có thể thay bằng QR thật từ ngân hàng sau) -->
            <img
              :src="`https://qr.sepay.vn/img?acc=VQRQAGFYT0046&bank=MBBank&amount=${finalTotal}&des=HD${Date.now()}`"
              alt="QR Code Thanh Toán"
              class="img-fluid rounded shadow"
            />
            <div class="mt-4">
              <small class="text-muted"
                >Hướng dẫn khách quét mã bằng ứng dụng ngân hàng</small
              >
            </div>
          </div>
          <div class="modal-footer border-0 flex-column gap-2">
            <button
              class="btn btn-outline-secondary w-100"
              @click="printReceipt"
            >
              <i class="bi bi-printer me-2"></i>In hóa đơn (sau khi hoàn tất)
            </button>
            <button
              class="btn btn-success w-100 py-3 fw-bold"
              @click="completeOrder"
              :disabled="isProcessing"
            >
              <span
                v-if="isProcessing"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Xác nhận đã nhận tiền
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay chung cho cả 2 modal -->
    <div
      class="modal-backdrop fade"
      :class="{ show: showCashModal || showQRModal }"
      v-if="showCashModal || showQRModal"
    ></div>
    <!-- Modal Giảm giá -->
    <div
      class="modal fade"
      :class="{ show: showDiscountModal }"
      :style="{ display: showDiscountModal ? 'block' : 'none' }"
      tabindex="-1"
      @click.self="showDiscountModal = false"
    >
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <h6 class="modal-title fw-bold">Áp dụng giảm giá</h6>
            <button
              type="button"
              class="btn-close"
              @click="showDiscountModal = false"
            ></button>
          </div>
          <div class="modal-body pt-2">
            <div class="btn-group w-100 mb-3" role="group">
              <button
                class="btn btn-outline-primary"
                :class="{ 'active btn-primary': discountType === 'amount' }"
                @click="discountType = 'amount'"
              >
                Theo tiền
              </button>
              <button
                class="btn btn-outline-primary"
                :class="{ 'active btn-primary': discountType === 'percent' }"
                @click="discountType = 'percent'"
              >
                Theo %
              </button>
            </div>

            <div class="input-group">
              <input
                type="number"
                class="form-control text-center"
                v-model.number="discountValue"
                :placeholder="
                  discountType === 'percent' ? 'Nhập %' : 'Nhập số tiền'
                "
                min="0"
              />
              <span class="input-group-text">
                {{ discountType === "percent" ? "%" : "₫" }}
              </span>
            </div>

            <small class="text-muted d-block text-center mt-2">
              Tạm tính: {{ formatVND(subtotal) }} → Giảm:
              {{ formatVND(discountAmount) }}
            </small>
          </div>
          <div class="modal-footer border-0 pt-0">
            <button class="btn btn-secondary btn-sm" @click="clearDiscount">
              Xóa giảm giá
            </button>
            <button
              class="btn btn-success btn-sm"
              @click="showDiscountModal = false"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay khi modal mở -->
    <div
      class="modal-backdrop fade"
      :class="{ show: showDiscountModal }"
      v-if="showDiscountModal"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import axios from "axios";

// Base URL của backend

// Danh sách sản phẩm gốc từ API
const allProducts = ref([]);

const discountType = ref("none");
const discountValue = ref(0);
const showDiscountModal = ref(false);
const isProcessing = ref(false);
const selectedPaymentMethod = ref("cash");
// Thêm các ref mới
const showCashModal = ref(false);
const showQRModal = ref(false);
const cashReceived = ref(0);
const change = ref(0);
const cashInput = ref(null);

// Sản phẩm hiển thị sau khi filter theo category
const products = computed(() => {
  if (selectedCategory.value === "All Items") {
    return allProducts.value;
  }
  return allProducts.value.filter((p) => p.category === selectedCategory.value);
});

// Danh sách category lấy từ sản phẩm
const categories = ref([]);
const selectedCategory = ref("All Items");

// Giỏ hàng
const cartItems = ref([]);

// Hàm lấy tất cả sản phẩm từ API
const fetchProducts = async () => {
  try {
    const response = await axios.get(`https://localhost:7189/api/Products`);
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Dữ liệu không hợp lệ");
    }

    // Map dữ liệu API sang định dạng phù hợp với giao diện
    allProducts.value = data.map((product) => ({
      id: product.productId,
      name: product.productName,
      category: product.category?.categoryName || "Uncategorized",
      price: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(product.sellingPrice),
      priceRaw: product.sellingPrice, // giữ giá gốc để tính toán
      stock: product.quantity,
      image: product.imageUrl?.startsWith("http")
        ? product.imageUrl
        : product.imageUrl
        ? `https://localhost:7189` + product.imageUrl
        : "https://via.placeholder.com/150?text=No+Image", // fallback nếu không có ảnh
      discount: null, // có thể thêm sau nếu có khuyến mãi
    }));

    // Tự động lấy danh sách category duy nhất từ sản phẩm
    const uniqueCats = [
      ...new Set(data.map((p) => p.category?.categoryName).filter(Boolean)),
    ];
    categories.value = uniqueCats.sort(); // sắp xếp A-Z
  } catch (error) {
    console.error("Lỗi khi tải sản phẩm:", error);
    alert("Không thể kết nối đến máy chủ. Vui lòng kiểm tra API đang chạy.");

    // Fallback dữ liệu mẫu (tùy chọn, có thể bỏ nếu không muốn)
    allProducts.value = [];
    categories.value = ["Beverages", "Snacks"];
  }
};

// Chọn category → filter sản phẩm
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = (product) => {
  const existingItem = cartItems.value.find((item) => item.id === product.id);

  if (existingItem) {
    // Nếu đã có → tăng số lượng
    existingItem.qty += 1;
    existingItem.total = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(existingItem.priceRaw * existingItem.qty);
  } else {
    // Thêm mới
    cartItems.value.push({
      id: product.id,
      name: product.name,
      thumb: product.image,
      unitPrice: product.price,
      priceRaw: product.priceRaw,
      qty: 1,
      total: product.price,
    });
  }
};

// Cập nhật số lượng
const updateQty = (item, newQty) => {
  if (newQty <= 0) {
    removeItem(item);
    return;
  }
  item.qty = newQty;
  item.total = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.priceRaw * newQty);
};

// Cập nhật số lượng từ input nhập tay
const updateQtyFromInput = (item, value) => {
  let newQty = parseInt(value) || 1; // Nếu nhập sai → mặc định 1

  if (newQty < 1) newQty = 1;
  if (newQty > item.stock) {
    alert(`Chỉ còn ${item.stock} sản phẩm trong kho!`);
    newQty = item.stock;
  }

  item.qty = newQty;
  item.total = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.priceRaw * newQty);
};
// Xóa sản phẩm khỏi giỏ
const removeItem = (item) => {
  const index = cartItems.value.indexOf(item);
  if (index > -1) {
    cartItems.value.splice(index, 1);
  }
};
// Tính tạm tính (subtotal) = tổng tiền các sản phẩm (priceRaw * qty)
const subtotal = computed(() => {
  return cartItems.value.reduce(
    (sum, item) => sum + item.priceRaw * item.qty,
    0
  );
});

const formatPercent = (rate) => {
  return `${Math.round(rate * 100)}%`;
};
// Tính thuế (8% của tạm tính)
const taxRate = 0.08; // 8%
const tax = computed(() => {
  return subtotal.value * taxRate;
});

// Định dạng tiền tệ VND đẹp
const formatVND = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const discountAmount = computed(() => {
  if (discountType.value === "amount") {
    return Math.max(0, discountValue.value); // không âm
  }
  if (discountType.value === "percent") {
    const percent = Math.max(0, Math.min(100, discountValue.value)); // giới hạn 0-100%
    return (subtotal.value * percent) / 100;
  }
  return 0;
});

// Tổng cộng sau giảm giá + thuế
const finalTotal = computed(() => {
  return subtotal.value + tax.value - discountAmount.value;
});
// Xóa giảm giá
const clearDiscount = () => {
  discountType.value = "none";
  discountValue.value = 0;
  showDiscountModal.value = false;
};

const openPaymentModal = () => {
  if (cartItems.value.length === 0) return;

  if (selectedPaymentMethod.value === "cash") {
    showCashModal.value = true;
    showQRModal.value = false;
    // Focus vào ô nhập tiền ngay khi mở
    nextTick(() => {
      cashInput.value?.focus();
    });
  } else if (selectedPaymentMethod.value === "qr") {
    showQRModal.value = true;
    showCashModal.value = false;
  }
};

// Tính tiền thối
const calculateChange = () => {
  change.value = cashReceived.value - finalTotal.value;
};

// Hàm in hóa đơn (tạm thời alert, sau bạn có thể dùng thư viện in thermal)
const printReceipt = () => {
  alert("Đang gửi lệnh in hóa đơn tới máy in nhiệt...");
  // Có thể tích hợp với qz-tray, electron, hoặc web print sau
};

// Tự động gọi khi component được mount
onMounted(() => {
  fetchProducts();
});

// Hàm hoàn tất đơn hàng
const completeOrder = async () => {
  isProcessing.value = true;

  try {
    const orderData = {
      customerName: "Jane Doe",
      customerPhone: null,
      paymentMethod: selectedPaymentMethod.value === "cash" ? "Cash" : "QR",
      subtotal: subtotal.value,
      tax: tax.value,
      discountAmount: discountAmount.value,
      discountType:
        discountType.value === "percent"
          ? "Percent"
          : discountType.value === "amount"
          ? "Amount"
          : "None",
      discountValue: discountValue.value,
      totalAmount: finalTotal.value,
      cashReceived:
        selectedPaymentMethod.value === "cash" ? cashReceived.value : null,
      change: selectedPaymentMethod.value === "cash" ? change.value : null,
      orderDate: new Date().toISOString(),
      orderDetails: cartItems.value.map((item) => ({
        productId: item.id,
        quantity: item.qty,
        unitPrice: item.priceRaw,
        totalPrice: item.priceRaw * item.qty,
      })),
    };

    const response = await axios.post(
      "https://localhost:7189/api/Orders",
      orderData
    );

    if (response.status === 201 || response.status === 200) {
      alert("Thanh toán thành công! Đơn hàng đã được lưu.");

      // Reset tất cả
      cartItems.value = [];
      clearDiscount();
      cashReceived.value = 0;
      change.value = 0;

      // Đóng modal
      showCashModal.value = false;
      showQRModal.value = false;
    }
  } catch (error) {
    console.error("Lỗi khi hoàn tất đơn hàng:", error);
    alert("Thanh toán thất bại. Vui lòng thử lại.");
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}
.hover-bg-light:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.transition-all {
  transition: all 0.2s ease;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* Container để giới hạn chiều rộng tên sản phẩm */
.text-truncate-container {
  min-width: 0; /* Rất quan trọng: cho phép flex child bị truncate */
  flex: 1;
}

/* Cắt tên sản phẩm nếu quá dài, chỉ hiển thị 1 dòng */
.text-truncate-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

/* Khi hover vào tên → con trỏ chuột thành pointer (tùy chọn, cho biết có tooltip) */
.text-truncate-line:hover {
  cursor: pointer;
}
</style>
